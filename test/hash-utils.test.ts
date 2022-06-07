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
            "ceeabad27d33ba2506533d001cf50963a3d3d022130346e890376abc3038db7a"
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
            "386d23a4902bcfa8b1f5dead869eac8e613fafce44e77199e5c263d1db55f2f0"
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
            "4f6b31cd73687f5d9a1d23ca0749ed111f5bab853395376a451498745c44e20c"
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
            "2cbac7f4e3d5c61dbb1bdd448cfbcb7bb2dbc4c72ad5b7bf701e7f82a3ea52d2"
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
            "bec117c10a22a0453980c2859e9498ae9cb9bca176488250fe1875ce017eb939"
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
            "b25d6bfb58e107f34d3b45b3a277e48b4705b9a3c2468d5d39b598cf3dbffb81"
          );
        });
      });
    });
  });
});
