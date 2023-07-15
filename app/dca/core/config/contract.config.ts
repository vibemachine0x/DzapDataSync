import dcaOldABI from "../artifacts/v1/DZapDCA.json";

interface ContractHistory {
  [key: number]: string;
  abi: any;
}
export const DCA_CONTRACTS: ContractHistory = {
  324: "0x3d2A3e5F13B7204cA39530D27e87184030e1F2Df",
  80001: "0x49E91d2e7F8d2751f982aFF6446D7Fd15E1E3b9C",
  137: "0x603B31bBE692aDCD522E280019F72b7919d6167c",
  abi: dcaOldABI.abi,
  //   abi: dcaABI.abi,
};
