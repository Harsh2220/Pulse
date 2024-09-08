import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { MyOFTFactoryABI } from "@/constants/OFTFactoryABI";
import { ChainId, getChainInfo, OFTFactoryAddress } from "@/constants/helper";

export const useDeployMyOFT = (chainId: ChainId) => {
  const { lzEndpointId } = getChainInfo(chainId);
  const { data: hash, writeContract, isError, error } = useWriteContract();

  const { isLoading: isWaiting, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const deployMyOFT = async (
    name: string,
    symbol: string,
    lzEndpoint: `0x${string}`,
    delegate: `0x${string}`,
    reserveRatio: bigint,
    salt: bigint,
    imageURI: string
  ) => {
    writeContract({
      address: OFTFactoryAddress as `0x${string}`,
      abi: MyOFTFactoryABI,
      functionName: "deploy",
      args: [name, symbol, lzEndpoint, delegate, reserveRatio, salt, imageURI],
      chainId: lzEndpointId,
    });
  };

  return {
    deployMyOFT,
    isLoading: isWaiting,
    isSuccess,
    isError,
    error,
    hash,
  };
};
