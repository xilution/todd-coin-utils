import {
  Block,
  Participant,
  ParticipantRole,
  TransactionType,
} from "@xilution/todd-coin-types";
import dayjs from "dayjs";
import {
  GENESIS_BLOCK_ID,
  GENESIS_HASH,
  GENESIS_NONCE,
  GENESIS_PARTICIPANT_ID,
  GENESIS_PARTICIPANT_PUBLIC_KEY,
  GENESIS_REWARD,
  GENESIS_TRANSACTION_ID,
} from "@xilution/todd-coin-constants";
import { calculateBlockHash } from "./hash-utils";

export const createGenesisBlock = (genesisParticipant: Participant): Block => {
  const now = dayjs();
  const genesisBlockNetHash: Omit<Block, "hash"> = {
    id: GENESIS_BLOCK_ID,
    sequenceId: 0,
    transactions: [
      {
        id: GENESIS_TRANSACTION_ID,
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
  const now = dayjs();
  const then = now.add(1000, "years");
  return {
    id: GENESIS_PARTICIPANT_ID,
    firstName,
    lastName,
    email,
    password,
    keys: [
      {
        public: GENESIS_PARTICIPANT_PUBLIC_KEY,
        effective: {
          from: now.toISOString(),
          to: then.toISOString(),
        },
      },
    ],
    roles: [ParticipantRole.VOLUNTEER],
  };
};
