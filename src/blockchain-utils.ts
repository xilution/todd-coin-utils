import { Block } from "@xilution/todd-coin-types";
import { isBlockValid } from "./block-utils";
import { calculateBlockHash } from "./hash-utils";

export const isChainValid = (blocks: Block[]): boolean => {
  for (let i = 1; i < blocks.length; i++) {
    const previousBlock = blocks[i - 1];
    const currentBlock = blocks[i];

    if (currentBlock.previousHash !== previousBlock.hash) {
      return false;
    }

    if (!isBlockValid(currentBlock)) {
      return false;
    }

    if (currentBlock.hash !== calculateBlockHash(currentBlock)) {
      return false;
    }
  }

  return true;
};
