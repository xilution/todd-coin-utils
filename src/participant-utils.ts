import {
  Block,
  BlockTransaction,
  Participant,
  TransactionDetails,
} from "@xilution/todd-coin-types";
import { calculateStringHash } from "./hash-utils";

export const authenticate = (
  participant: Participant,
  providedPassword: string
): boolean => {
  return participant.password === calculateStringHash(providedPassword);
};

export const calculateAccumulatedGoodPoints = (
  participant: Participant,
  blocks: Block[],
  startingBalance = 0
): number => {
  return blocks.reduce((chainBalance: number, block: Block) => {
    return (
      chainBalance +
      block.transactions.reduce(
        (
          transactionBalance: number,
          transaction: BlockTransaction<TransactionDetails>
        ) => {
          if (transaction.toParticipant?.id === participant.id) {
            return transactionBalance + Number(transaction.goodPoints);
          }

          return transactionBalance;
        },
        0
      )
    );
  }, startingBalance);
};
