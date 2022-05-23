import { useState, useEffect, useCallback } from "react";
import { utils, BigNumber } from "ethers";
import {
  useContract,
  useSigner,
  useContractRead,
  useContractWrite,
} from "wagmi";
import SeedsABI from "./SeedsABI.json";
import type { SeedsABI as SeedContractType } from "./SeedsABI";

export const SEEDS_CONTRACT_ADDRESS =
  "0xbcdf4823fc65e6aa243963f955fd5ce885066306";
export const useSeedsContract = (): {
  seedsContract: SeedContractType;
  seedPrice: string;
} => {
  const { data: signer } = useSigner();
  const { data: seedPrice } = useContractRead(
    {
      addressOrName: SEEDS_CONTRACT_ADDRESS,
      contractInterface: SeedsABI,
    },
    "unitPrice"
  );

  const seedsContract = useContract<SeedContractType>({
    addressOrName: SEEDS_CONTRACT_ADDRESS,
    contractInterface: SeedsABI,
    signerOrProvider: signer,
  });

  return {
    seedsContract,
    seedPrice: utils.formatEther(BigNumber.from(seedPrice)),
  };
};
