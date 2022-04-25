import {
  Block,
  Participant,
  ParticipantKey,
  ParticipantRole,
  TransactionType,
} from "@xilution/todd-coin-types";
import dayjs from "dayjs";
import { calculateBlockHash, calculateStringHash } from "./hash-utils";
import { generateParticipantKey } from "./key-utils";
import { v4 } from "uuid";

const GENESIS_REWARD = 50;
const GENESIS_HASH =
  "0000000000000000000000000000000000000000000000000000000000000000";
const GENESIS_NONCE = 0;
const DEFAULT_GENESIS_PARTICIPANT_KEY_TIME_TO_LIVE_IN_DAYS = 1;

export const createGenesisBlock = (genesisParticipant: Participant): Block => {
  const now = dayjs();
  const genesisBlockNetHash: Omit<Block, "hash"> = {
    id: v4(),
    sequenceId: 0,
    transactions: [
      {
        id: v4(),
        to: genesisParticipant,
        goodPoints: GENESIS_REWARD,
        description: "Initial set up reward",
        type: TransactionType.TIME,
        details: {
          dateRanges: [
            {
              from: now.toISOString(),
              to: now.toISOString(),
            },
          ],
        },
      },
    ],
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
  const participantKey: ParticipantKey = generateParticipantKey(
    DEFAULT_GENESIS_PARTICIPANT_KEY_TIME_TO_LIVE_IN_DAYS
  );

  return {
    id: v4(),
    firstName,
    lastName,
    email,
    password: calculateStringHash(password),
    keys: [
      {
        id: v4(),
        public: participantKey.public,
        private: participantKey.private,
        effective: participantKey.effective,
      },
    ],
    roles: [ParticipantRole.VOLUNTEER],
  };
};
