import {
  Block,
  BlockTransaction,
  SignedTransaction,
  TransactionDetails,
} from "@xilution/todd-coin-types";
import SHA256 from "crypto-js/sha256";

export const calculateStringHash = (str: string): string => {
  return SHA256(str).toString();
};

export const calculateBlockHash = (block: Omit<Block, "hash">): string => {
  const { id, transactions, nonce, previousHash } = block;
  const transactionsPart = JSON.stringify(
    transactions.map((transaction: BlockTransaction<TransactionDetails>) =>
      calculateTransactionHash(transaction)
    )
  );
  const nonceAsStr = nonce.toString();

  const parts = id + transactionsPart + nonceAsStr + previousHash;

  return calculateStringHash(parts);
};

export const calculateTransactionHash = (
  transaction:
    | SignedTransaction<TransactionDetails>
    | BlockTransaction<TransactionDetails>
): string => {
  const { id, from, to, goodPoints, description } = transaction;
  const parts = id || "" + from || "" + to + goodPoints + description;

  return calculateStringHash(parts);
};