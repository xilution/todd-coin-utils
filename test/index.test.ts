import {
  blockUtils,
  blockchainUtils,
  keyUtils,
  transactionUtils,
} from "../src";

describe("Index Tests", () => {
  it("should export utils", () => {
    expect(blockUtils).toBeTruthy();
    expect(blockchainUtils).toBeTruthy();
    expect(keyUtils).toBeTruthy();
    expect(transactionUtils).toBeTruthy();
  });
});
