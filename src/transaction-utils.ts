import {
  ParticipantKey,
  PendingTransaction,
  SignedTransaction,
  TransactionDetails,
} from "@xilution/todd-coin-types";
import { getParticipantKeyForSignedHash, getSignature } from "./key-utils";
import { calculateTransactionHash } from "./hash-utils";

export const signTransaction = (
  pendingTransaction: PendingTransaction<TransactionDetails>,
  goodPoints: number,
  privateKey: string
): SignedTransaction<TransactionDetails> => {
  const transactionHash = calculateTransactionHash({
    ...pendingTransaction,
    goodPoints,
  });

  const signature = getSignature(transactionHash, privateKey);

  return {
    ...pendingTransaction,
    goodPoints,
    signature,
  };
};

export const isSignedTransactionValid = (
  signedTransaction: SignedTransaction<TransactionDetails>
): boolean => {
  const { from, signature } = signedTransaction;

  if (from === undefined) {
    return true;
  }

  if (signature === undefined || signature.length === 0) {
    return false;
  }

  const hash = calculateTransactionHash(signedTransaction);

  const participantKey: ParticipantKey | undefined =
    getParticipantKeyForSignedHash(from, hash, signature);

  return participantKey !== undefined;
};
