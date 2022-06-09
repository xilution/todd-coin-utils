import {
  generateParticipantKey,
  getSignature,
  isSignatureValid,
} from "../src/key-utils";
import SHA256 from "crypto-js/sha256";

const testParticipantKey = {
  public:
    "044958ab8c3a4e8c018a574ed99f5bb34b5e95d6a68b8c690308b40de7ed583bb5eb21d554f7ef2b562682678fb136fe799d08eda183da909df7821e4ec9a32f0e",
  private: "8299b123b5eea7032d6183d3bde46be37a9b39a12deee10945263af59d89b2cc",
  effective: {
    from: "2022-06-07T02:52:52.878Z",
    to: "2023-06-07T02:52:52.878Z",
  },
};

describe("Key Utils Tests", () => {
  describe("when validating a signature", () => {
    let actual: boolean;

    beforeEach(() => {
      actual = isSignatureValid(
        testParticipantKey,
        SHA256("Try not. Do or do not. There is no try.").toString(),
        "3045022100d0a4b19024f504e96545ad9a36a41b9911c25d6621828c57eeb12b27abc9ca58022005736785aa455cefa435e6cd9af74650668fc54938e55231741d187908aaef56"
      );
    });

    it("should return true", function () {
      expect(actual).toEqual(true);
    });
  });

  describe("when getting a signature", () => {
    let actual: string;

    beforeEach(() => {
      actual = getSignature(
        SHA256("Try not. Do or do not. There is no try.").toString(),
        testParticipantKey.private
      );
    });

    it("should return the correct signature", () => {
      expect(actual).toEqual(
        "3046022100febf723d943c2040c48cc763ce64249a899145bb72a316c0bf5cd2f3acbc38a6022100ea0c7b337e91de35eee4ec5032b09760d626276fea8c27a388ef8319800a1df3"
      );
    });
  });
});
