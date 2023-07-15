export type TokenInfo = {
  id: string;
};

export type PositionHistory = {
  returnedToAmount?: string;
  action: string;
  transactionHash: string;
  createdAtTimestamp: number;
  recipient?: string;
  fromAmount?: string;
  toAmount?: string;
  rate?: string;
  prevRate?: string;
  remainingSwaps?: string;
  prevRemainingSwaps?: string;
  swapped?: string;
};

export type DCAPositionInfo = {
  _id?: string;
  id: string;
  account: string;
  chainId: number;
  contract: string;
  createdAtTimestamp: number;
  lastUpdatedAt: number;
  status: string;
  from: TokenInfo;
  to: TokenInfo;
  swapInterval: {
    id: string;
  };
  rate: string;
  remainingSwaps: string;
  toWithdraw: string;
  totalDeposited: string;
  totalAmountReturned: string;
  totalAmountSwapped: string;
  nativeFlag: boolean;
  totalWithdrawn: string;
  totalSwaps: string;
  totalExecutedSwaps: string;
  history: PositionHistory[];
};
