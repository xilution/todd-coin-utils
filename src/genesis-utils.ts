import {
  Block,
  Participant,
  ParticipantKey,
  ParticipantRole,
  PendingTransaction,
  SignedTransaction,
  TransactionDetails,
  TransactionType,
} from "@xilution/todd-coin-types";
import dayjs from "dayjs";
import { calculateBlockHash, calculateStringHash } from "./hash-utils";
import { generateParticipantKey } from "./key-utils";
import { v4 } from "uuid";
import { transactionUtils } from "./index";

const GENESIS_REWARD = 50;
const GENESIS_HASH =
  "0000000000000000000000000000000000000000000000000000000000000000";
const GENESIS_NONCE = 0;
const DEFAULT_GENESIS_PARTICIPANT_KEY_TIME_TO_LIVE_IN_DAYS = 1;

export const createGenesisBlock = (
  fromParticipant: Participant,
  toParticipant: Participant,
  participantKey: ParticipantKey,
  privateKey: string
): Block => {
  const now = dayjs();
  const fromDate: string = now.toISOString();
  const toDate: string = now.toISOString();
  const pendingTransaction: PendingTransaction<TransactionDetails> = {
    id: v4(),
    fromParticipant,
    toParticipant,
    description: "Initial set up reward",
    type: TransactionType.TIME,
    details: {
      dateRanges: [
        {
          from: fromDate,
          to: toDate,
        },
      ],
    },
  };

  const signedTransaction: SignedTransaction<TransactionDetails> =
    transactionUtils.signTransaction(
      pendingTransaction,
      GENESIS_REWARD,
      participantKey,
      privateKey
    );

  const genesisBlockNetHash: Omit<Block, "hash"> = {
    id: v4(),
    sequenceId: 0,
    transactions: [signedTransaction],
    nonce: GENESIS_NONCE,
    previousHash: GENESIS_HASH,
  };
  const hash: string = calculateBlockHash(genesisBlockNetHash);

  return {
    ...genesisBlockNetHash,
    hash,
  };
};

export const createGenesisParticipant = (
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Participant => {
  return {
    id: v4(),
    firstName,
    lastName,
    email,
    password: calculateStringHash(password),
    roles: [ParticipantRole.VOLUNTEER],
  };
};

export const createGenesisParticipantKey = (): ParticipantKey => {
  return generateParticipantKey(
    DEFAULT_GENESIS_PARTICIPANT_KEY_TIME_TO_LIVE_IN_DAYS
  );
};
