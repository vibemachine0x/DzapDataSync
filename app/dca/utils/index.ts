import { Contract } from "zksync-web3";

import { ethers } from "ethers";
import { DCA_CONTRACTS } from "../core/config/contract.config";
import { JSON_RPC_PROVIDER } from "../core/config/chain.config";
import { INTERVALS } from "../core/constants";
export const getChecksumAddress = (address: string) =>
  ethers.utils.getAddress(address);

export const getProvider = (chainId: number) =>
  new ethers.providers.JsonRpcProvider(JSON_RPC_PROVIDER[chainId]);

export const getContract = (chainId: number) => {
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

export const getUnixTimestamp = () => Math.floor(Date.now() / 1000);

export function hexToBinary(hex: string, padStart = 8) {
  return parseInt(hex, 16).toString(2).padStart(padStart, "0");
}

export const intervalsFromBytes = (intervalsBytes: string) => {
  const result = [];
  let intervalsInBinary = +hexToBinary(intervalsBytes);
  let cycle = 0;
  while (intervalsInBinary > 0) {
    if (intervalsInBinary % 2 == 1) {
      result.push(INTERVALS[cycle]);
    }
    cycle += 1;
    intervalsInBinary = intervalsInBinary >> 1;
  }
  return result;
};
