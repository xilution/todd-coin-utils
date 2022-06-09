import { calculateTransactionHash } from "../src/hash-utils";
import {
  BlockTransaction,
  Organization,
  Participant,
  SignedTransaction,
  TransactionDetails,
  TransactionType,
} from "@xilution/todd-coin-types";
import { Currencies } from "ts-money";

describe("Hash Utils Tests", () => {
  describe("when calculating a transaction hash", () => {
    let actual: string;
    let transaction:
      | Omit<
          Omit<SignedTransaction<TransactionDetails>, "signature">,
          "participantKey"
        >
      | Omit<
          Omit<BlockTransaction<TransactionDetails>, "signature">,
          "participantKey"
        >;

    describe("when transaction type is TIME", () => {
      describe("when minimum amount of data is set", () => {
        beforeEach(() => {
          transaction = {
            description: "The quick red fox jumped over the lazy brown dog.",
            details: {
              dateRanges: [
                {
                  from: "2022-06-06T10:57:28.055Z",
                  to: "2022-06-06T11:57:28.055Z",
                },
                {
                  from: "2022-06-06T11:57:28.055Z",
                  to: "2022-06-06T12:57:28.055Z",
                },
              ],
            },
            goodPoints: 1234,
            type: TransactionType.TIME,
          };

          actual = calculateTransactionHash(transaction);
        });

        it("should return the correct response", () => {
          expect(actual).toEqual(
            "30fe75f211bfea7a4051c4f19fc6897c7380b5790f31da88b9c1c801a66e0543"
          );
        });
      });

      describe("when id is present", () => {
        beforeEach(() => {
          transaction = {
            id: "852a592a-ed11-4082-9f3e-57559227351a",
            description: "The quick red fox jumped over the lazy brown dog.",
            details: {
              dateRanges: [
                {
                  from: "2022-06-06T10:57:28.055Z",
                  to: "2022-06-06T11:57:28.055Z",
                },
                {
                  from: "2022-06-06T11:57:28.055Z",
                  to: "2022-06-06T12:57:28.055Z",
                },
              ],
            },
            goodPoints: 1234,
            type: TransactionType.TIME,
          };

          actual = calculateTransactionHash(transaction);
        });

        it("should return the correct response", () => {
          expect(actual).toEqual(
            "e1d23ac22e54ce05dd3d78a5f834f707a0bd55ab85a83bc0cbd224a8c5af5444"
          );
        });
      });

      describe("when participants and organizations are present", () => {
        beforeEach(() => {
          transaction = {
            id: "852a592a-ed11-4082-9f3e-57559227351a",
            fromParticipant: {
              id: "09cbccd1-b974-4b95-9929-8af02833d584",
            } as Participant,
            toParticipant: {
              id: "b871e4af-5329-47be-8922-47638de3bddd",
            } as Participant,
            fromOrganization: {
              id: "ea75c11a-2a16-4ff6-b81a-e4721ca265c1",
            } as Organization,
            toOrganization: {
              id: "28631269-144f-4d11-83fe-92875b742e5d",
            } as Organization,
            description: "The quick red fox jumped over the lazy brown dog.",
            details: {
              dateRanges: [
                {
                  from: "2022-06-06T10:57:28.055Z",
                  to: "2022-06-06T11:57:28.055Z",
                },
                {
                  from: "2022-06-06T11:57:28.055Z",
                  to: "2022-06-06T12:57:28.055Z",
                },
              ],
            },
            goodPoints: 1234,
            type: TransactionType.TIME,
          };

          actual = calculateTransactionHash(transaction);
        });

        it("should return the correct response", () => {
          expect(actual).toEqual(
            "bb7a7710e689f2ccb16d6bc00279a49d8226dd4c78e20fb6fdd2d8ed69863f17"
          );
        });
      });
    });

    describe("when transaction type is TREASURE", () => {
      describe("when minimum amount of data is set", () => {
        beforeEach(() => {
          transaction = {
            description:
              "You will face many defeats in life, but never let yourself be defeated.",
            details: {
              amount: 4321,
              currency: Currencies.USD,
            },
            goodPoints: 1234,
            type: TransactionType.TREASURE,
          };

          actual = calculateTransactionHash(transaction);
        });

        it("should return the correct response", () => {
          expect(actual).toEqual(
            "6a7af40b238053bca6cfddcf4390c9fbbae33d08837e7228c4858d6e67854d83"
          );
        });
      });

      describe("when id is present", () => {
        beforeEach(() => {
          transaction = {
            id: "852a592a-ed11-4082-9f3e-57559227351a",
            description:
              "You will face many defeats in life, but never let yourself be defeated.",
            details: {
              amount: 4321,
              currency: Currencies.USD,
            },
            goodPoints: 1234,
            type: TransactionType.TREASURE,
          };

          actual = calculateTransactionHash(transaction);
        });

        it("should return the correct response", () => {
          expect(actual).toEqual(
            "80cd1b06737943a5c4c84d3ad57ae70153a11bb5e0719770841692536afcc083"
          );
        });
      });

      describe("when participants and organizations are present", () => {
        beforeEach(() => {
          transaction = {
            id: "852a592a-ed11-4082-9f3e-57559227351a",
            fromParticipant: {
              id: "09cbccd1-b974-4b95-9929-8af02833d584",
            } as Participant,
            toParticipant: {
              id: "b871e4af-5329-47be-8922-47638de3bddd",
            } as Participant,
            fromOrganization: {
              id: "ea75c11a-2a16-4ff6-b81a-e4721ca265c1",
            } as Organization,
            toOrganization: {
              id: "28631269-144f-4d11-83fe-92875b742e5d",
            } as Organization,
            description:
              "You will face many defeats in life, but never let yourself be defeated.",
            details: {
              amount: 4321,
              currency: Currencies.USD,
            },
            goodPoints: 1234,
            type: TransactionType.TREASURE,
          };

          actual = calculateTransactionHash(transaction);
        });

        it("should return the correct response", () => {
          expect(actual).toEqual(
            "a44a8f5d615c4407b928535844a77dd9fe9d3fa67b30f27bde71038129e0f276"
          );
        });
      });
    });
  });
});
