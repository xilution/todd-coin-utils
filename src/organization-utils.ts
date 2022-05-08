import {
  Block,
  BlockTransaction,
  Organization,
  TransactionDetails,
} from "@xilution/todd-coin-types";

export const calculateAccumulatedGoodPoints = (
  organization: Organization,
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
          if (transaction.toOrganization?.id === organization.id) {
            return transactionBalance + Number(transaction.goodPoints);
          }

          return transactionBalance;
        },
        0
      )
    );
  }, startingBalance);
};
