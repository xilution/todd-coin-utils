import {
  Block,
  BlockTransaction,
  DateRange,
  SignedTransaction,
  TimeTransactionDetails,
  TransactionDetails,
  TransactionType,
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
    calculateTransactionDetailsHash(type, details);

  return calculateStringHash(parts);
};

const calculateTransactionDetailsHash = (
  type: TransactionType,
  details: TransactionDetails
): string => {
  if (type === TransactionType.TIME) {
    return calculateTimeTransactionDetailsHash(
      details as TimeTransactionDetails
    );
  }

  return calculateStringHash(JSON.stringify(details)); // todo - implement this for treasure transactions
};

const calculateTimeTransactionDetailsHash = (
  details: TimeTransactionDetails
): string => {
  const sortedDateRanges: DateRange[] = details.dateRanges.sort(
    (dateRange1: DateRange, dateRange2: DateRange) => {
      const fromDiff: number =
        (dateRange1.from != undefined
          ? new Date(dateRange1.from).getTime()
          : 0) -
        (dateRange2.from != undefined
          ? new Date(dateRange2.from).getTime()
          : 0);

      if (fromDiff != 0) {
        return fromDiff;
      }

      return (
        (dateRange1.to != undefined ? new Date(dateRange1.to).getTime() : 0) -
        (dateRange2.to != undefined ? new Date(dateRange2.to).getTime() : 0)
      );
    }
  );

  const parts: string = sortedDateRanges
    .map((dateRange: DateRange) => calculateDateRangeHash(dateRange))
    .join("");

  return calculateStringHash(parts);
};

const calculateDateRangeHash = (dateRange: DateRange): string => {
  const parts = (dateRange.from || "") + (dateRange.to || "");

  return calculateStringHash(parts);
};
