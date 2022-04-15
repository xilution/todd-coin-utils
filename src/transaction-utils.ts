import { Transaction } from "@xilution/todd-coin-types";
import { ec } from "elliptic";
import { getKeyPairFromPrivateKey, getKeyPairFromPublicKey } from "./key-utils";
import SHA256 from "crypto-js/sha256";

export const calculateTransactionHash = (transaction: Transaction): string => {
  const { id, from, to, amount, description } = transaction;
  const parts = id || "" + from || "" + to + amount + description;

  return SHA256(parts).toString();
};

export const signTransaction = (
  pendingTransaction: Transaction,
  privateKey: string
): Transaction => {
  const signingKey: ec.KeyPair = getKeyPairFromPrivateKey(privateKey);
  const publicKey = signingKey.getPublic("hex");
  if (publicKey !== pendingTransaction.from) {
    throw new Error(
      "unable to sign the pending transaction because the private key is invalid"
    );
  }

  const transactionHash = calculateTransactionHash(pendingTransaction);
  const signature = signingKey.sign(transactionHash, "base64");

  return {
    id: pendingTransaction.id,
    createdAt: pendingTransaction.createdAt,
    from: pendingTransaction.from,
    to: pendingTransaction.to,
    amount: pendingTransaction.amount,
    description: pendingTransaction.description,
    signature: signature.toDER("hex"),
  };
};

export const isSignedTransactionValid = (signedTransaction: Transaction) => {
  if (signedTransaction.from === undefined) {
    return true;
  }

  if (
    signedTransaction.signature === undefined ||
    signedTransaction.signature.length === 0
  ) {
    return false;
  }

  const publicKey: string = signedTransaction.from;
  const signingKey: ec.KeyPair = getKeyPairFromPublicKey(publicKey);

  return signingKey.verify(
    calculateTransactionHash(signedTransaction),
    signedTransaction.signature
  );
};
