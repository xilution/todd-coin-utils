import {
  ParticipantKey,
  PendingTransaction,
  SignedTransaction,
  TransactionDetails,
} from "@xilution/todd-coin-types";
import {
  getEffectiveParticipantKey,
  getParticipantKeyForSignedHash,
  getSignature,
} from "./key-utils";
import { calculateTransactionHash } from "./hash-utils";

export const signTransaction = (
  pendingTransaction: PendingTransaction<TransactionDetails>,
  goodPoints: number,
  privateKey: string
): SignedTransaction<TransactionDetails> => {
  const { from } = pendingTransaction;

  if (from === undefined) {
    throw new Error(
      "unable to sign the pending transaction because the from participant is undefined"
    );
  }

  const effectiveParticipantKey: ParticipantKey | undefined =
    getEffectiveParticipantKey(from, privateKey);

  if (effectiveParticipantKey === undefined) {
    throw new Error(
      "unable to sign the pending transaction because the private key is invalid"
    );
  }

  const transactionHash = calculateTransactionHash({
    ...pendingTransaction,
    goodPoints,
  });

  const signature = getSignature(transactionHash, privateKey);

  return {
    ...pendingTransaction,
    goodPoints,
    signature: signature,
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
