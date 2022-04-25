import {
  Block,
  SignedTransaction,
  TransactionDetails,
} from "@xilution/todd-coin-types";
import { DIFFICULTY } from "@xilution/todd-coin-constants";
import { isSignedTransactionValid } from "./transaction-utils";
import { v4 } from "uuid";
import { calculateBlockHash } from "./hash-utils";

export const mineNewBlock = (
  latestBlock: Block,
  signedTransactions: SignedTransaction<TransactionDetails>[]
): Block => {
  const now = Date.now();
  const createdAt = new Date(now).toISOString();
  const { sequenceId } = latestBlock;
  const nextSequenceId = sequenceId + 1;

  let newBlockNetHash: Omit<Block, "hash"> = {
    id: v4(),
    sequenceId: nextSequenceId,
    createdAt,
    updatedAt: createdAt,
    transactions: signedTransactions,
    nonce: 0,
    previousHash: latestBlock.hash,
  };
  let hash = calculateBlockHash(newBlockNetHash);

  const leadingZeros = Array(DIFFICULTY + 1).join("0");

  while (hash.substring(0, DIFFICULTY) !== leadingZeros) {
    newBlockNetHash = {
      ...newBlockNetHash,
      nonce: newBlockNetHash.nonce + 1,
    };
    hash = calculateBlockHash(newBlockNetHash);
  }

  return { ...newBlockNetHash, hash };
};

export const hasValidTransactions = (block: Block): boolean => {
  for (const transaction of block.transactions) {
    if (!isSignedTransactionValid(transaction)) {
      return false;
    }
  }

  return true;
};
