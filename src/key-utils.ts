import { ec } from "elliptic";
import { Participant, ParticipantKey } from "@xilution/todd-coin-types";
import dayjs from "dayjs";
import { DEFAULT_PARTICIPANT_KEY_TIME_TO_LIVE_IN_DAYS } from "@xilution/todd-coin-constants";

export const generateParticipantKey = (): ParticipantKey => {
  const client: ec = new ec("secp256k1");
  const key: ec.KeyPair = client.genKeyPair();
  const publicKey: string = key.getPublic("hex");
  const privateKey: string = key.getPrivate("hex");
  const now = dayjs();
  const then = now.add(DEFAULT_PARTICIPANT_KEY_TIME_TO_LIVE_IN_DAYS, "days");

  return {
    public: publicKey,
    private: privateKey,
    effective: {
      from: now.toISOString(),
      to: then.toISOString(),
    },
  };
};

export const getKeyPairFromPrivateKey = (privateKey: string): ec.KeyPair => {
  const client: ec = new ec("secp256k1");

  return client.keyFromPrivate(privateKey);
};

export const getKeyPairFromPublicKey = (publicKey: string): ec.KeyPair => {
  const client: ec = new ec("secp256k1");

  return client.keyFromPublic(publicKey, "hex");
};

export const getEffectiveParticipantKey = (
  participant: Participant,
  privateKey: string
): ParticipantKey | undefined => {
  const signingKey: ec.KeyPair = getKeyPairFromPrivateKey(privateKey);
  const publicKey = signingKey.getPublic("hex");
  const now = dayjs();

  return participant?.keys.find((participantKey: ParticipantKey) => {
    if (
      participantKey.public === publicKey &&
      dayjs(participantKey.effective.from).isBefore(now) &&
      dayjs(participantKey.effective.to).isAfter(now)
    ) {
      return participantKey;
    }
  });
};

export const getParticipantKeyForSignedHash = (
  participant: Participant,
  hash: string,
  signature: string
): ParticipantKey | undefined => {
  return participant.keys.find((participantKey: ParticipantKey) => {
    const signingKey: ec.KeyPair = getKeyPairFromPublicKey(
      participantKey.public
    );

    return signingKey.verify(hash, signature);
  });
};

export const getSignature = (str: string, privateKey: string): string => {
  const signingKey: ec.KeyPair = getKeyPairFromPrivateKey(privateKey);

  const signature = signingKey.sign(str, "base64");

  return signature.toDER("hex");
};
