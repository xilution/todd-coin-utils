import {
  blockUtils,
  blockchainUtils,
  hashUtils,
  genesisUtils,
  keyUtils,
  transactionUtils,
} from "../src";

describe("Index Tests", () => {
  it("should export utils", () => {
    expect(blockUtils).toBeTruthy();
    expect(blockchainUtils).toBeTruthy();
    expect(hashUtils).toBeTruthy();
    expect(genesisUtils).toBeTruthy();
    expect(keyUtils).toBeTruthy();
    expect(transactionUtils).toBeTruthy();
  });
});
