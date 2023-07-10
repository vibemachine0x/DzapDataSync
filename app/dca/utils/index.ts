import { Contract } from "zksync-web3";

import { ethers } from "ethers";
import { DCA_CONTRACTS } from "../Core/Config/contract.config";
import { JSON_RPC_PROVIDER } from "../core/config/chain.config";

export const getChecksumAddress = (address: string) =>
  ethers.utils.getAddress(address);

export const getProvider = (chainId: number) =>
  new ethers.providers.JsonRpcProvider(JSON_RPC_PROVIDER[chainId]);

export const getContract = (chainId: number): any => {
  try {
    const abi = DCA_CONTRACTS.abi;
    const address = DCA_CONTRACTS[chainId];
    const provider = getProvider(chainId);
    return chainId === 324
      ? new Contract(getChecksumAddress(address), abi, provider)
      : new ethers.Contract(getChecksumAddress(address), abi, provider);
  } catch (error) {
    throw error;
  }
};

export const getContractAddress = (chainId: number): string =>
  DCA_CONTRACTS[chainId];

export const listenEvents = async (
  contract: Contract,
  event: string,
  callback: Function
) => {
  console.log(event, "subscribed event");
  contract.on(event, (...data) => {
    console.log(event, "event received");
    callback(data, contract);
  });
};

export const getInterface = () => {
  const abi = DCA_CONTRACTS.abi;
  return new ethers.utils.Interface(abi);
};
