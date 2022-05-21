import { useContract, useSigner } from "wagmi";
import SeedsABI from "./SeedsABI.json";
import type { SeedsABI as SeedContractType } from "./SeedsABI";

const SEEDS_CONTRACT_ADDRESS = "0xbcdf4823fc65e6aa243963f955fd5ce885066306";
export const useSeedsContract = (): SeedContractType => {
  const { data: signer } = useSigner();
  const seedsContract = useContract<SeedContractType>({
    addressOrName: SEEDS_CONTRACT_ADDRESS,
    contractInterface: SeedsABI,
    signerOrProvider: signer,
  });
  return seedsContract;
};
