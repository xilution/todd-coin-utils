import {
  ParticipantKey,
  PendingTransaction,
  SignedTransaction,
  TransactionDetails,
} from "@xilution/todd-coin-types";
import { getSignature, isSignatureValid } from "./key-utils";
import { calculateTransactionHash } from "./hash-utils";

export const signTransaction = (
  pendingTransaction: PendingTransaction<TransactionDetails>,
  goodPoints: number,
  participantKey: ParticipantKey,
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
    participantKey,
    signature,
  };
};

export const isSignedTransactionValid = (
  signedTransaction: SignedTransaction<TransactionDetails>
): boolean => {
  const { signature } = signedTransaction;

  if (signature === undefined || signature.length === 0) {
    return false;
  }

  const hash = calculateTransactionHash(signedTransaction);

  return isSignatureValid(signedTransaction.participantKey, hash, signature);
};
