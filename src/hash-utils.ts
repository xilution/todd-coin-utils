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
    | Omit<
        Omit<SignedTransaction<TransactionDetails>, "signature">,
        "participantKey"
      >
    | Omit<
        Omit<BlockTransaction<TransactionDetails>, "signature">,
        "participantKey"
      >
): string => {
  const {
    id,
    fromParticipant,
    toParticipant,
    fromOrganization,
    toOrganization,
    goodPoints,
    description,
    type,
    details,
  } = transaction;
  const parts =
    (id || "") +
    (fromParticipant?.id || "") +
    (toParticipant?.id || "") +
    (fromOrganization?.id || "") +
    (toOrganization?.id || "") +
    goodPoints +
    description +
    type +
    JSON.stringify(details);

  console.log(parts);

  return calculateStringHash(parts);
};
