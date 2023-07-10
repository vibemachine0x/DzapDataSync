import dcaOldABI from "../artifacts/v1/DZapDCA.json";

interface ContractHistory {
  [key: number]: string;
  abi: any;
}
export const DCA_CONTRACTS: ContractHistory = {
  324: "0x3cd8a926f8a967d315768749a38dc7c7d80c47bF",
  80001: "0x49E91d2e7F8d2751f982aFF6446D7Fd15E1E3b9C",
  137: "0x603B31bBE692aDCD522E280019F72b7919d6167c",
  abi: dcaOldABI.abi,
  //   abi: dcaABI.abi,
};
