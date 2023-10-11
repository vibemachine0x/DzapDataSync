import { BigNumber } from "ethers";
import { getUnixTimestamp, intervalsFromBytes } from ".";
import { PositionStatus } from "../enums";
import {
  apiGetActivePositionInfo,
  apiGetPositionDetails,
} from "../persistence/sync.persistence";
import { createPositionService } from "../services/sync.services";
import { DCAPositionInfo, PositionHistory } from "../types";

export const handleCreateEventData = async (data: any, contract: any) => {
  try {
    const eventData = data[3];
    const positionId = data[1].toString();
    const isNative = data[2];
    const {
      owner: account,
      from: fromToken,
      to: toToken,
      swapInterval,
      rate,
      swapsLeft,
    } = await contract.getPositionDetails(positionId);

    const currentTimestamp = getUnixTimestamp();

    const positionInfo: DCAPositionInfo = {
      account,
      chainId: (await contract.provider.getNetwork()).chainId,
      contract: contract.address,
      createdAtTimestamp: currentTimestamp,
      from: {
        id: fromToken,
      },
      to: {
        id: toToken,
      },
      history: [
        {
          action: PositionStatus.created,
          createdAtTimestamp: currentTimestamp,
          transactionHash: eventData.transactionHash,
        },
      ],
      id: positionId,
      lastUpdatedAt: currentTimestamp,
      nativeFlag: isNative,
      rate: rate.toString(),
      status: PositionStatus.active,
      swapInterval: {
        id: swapInterval,
      },
      totalSwaps: swapsLeft.toString(),
      remainingSwaps: swapsLeft.toString(),
      totalDeposited: rate.mul(swapsLeft).toString(),
      totalAmountReturned: "0",
      totalWithdrawn: "0",
      toWithdraw: "0",
      totalAmountSwapped: "0",
      totalExecutedSwaps: "0",
    };

    await createPositionService(positionInfo);
  } catch (error) {
    console.log("create event error", error);
  }
};

export const handleModifyEventData = async (data: any, contract: any) => {
  const contractAddress = contract.address;
  const eventData = data[6];
  const account = data[0];
  const positionId = data[1].toString();
  const rate = data[2].toString();
  const startingSwap = data[3];
  const finalSwap = data[4];
  const currentTimestamp = getUnixTimestamp();

  const position = await apiGetPositionDetails(
    account,
    contractAddress,
    positionId
  );
  // previous position values
  const previousPositionRate = position.rate;
  const previousRemainingSwaps = position.remainingSwaps;
  const previousUnswapped = BigNumber.from(previousPositionRate).mul(
    previousRemainingSwaps
  );
  position.rate = rate;
  position.remainingSwaps = finalSwap.sub(startingSwap).toString();
  const unswapped = BigNumber.from(position.rate).mul(position.remainingSwaps);
  position.totalDeposited = BigNumber.from(position.totalDeposited)
    .sub(previousUnswapped)
    .add(unswapped);
  position.totalSwaps = BigNumber.from(position.totalSwaps)
    .sub(previousRemainingSwaps)
    .add(position.remainingSwaps);
  position.lastUpdatedAt = currentTimestamp;

  if (BigNumber.from(position.remainingSwaps).eq("0")) {
    position.status = PositionStatus.completed;
  } else if (position.status != PositionStatus.active) {
    position.status = PositionStatus.active;
  }

  // history
  const modifiedData: PositionHistory = {
    action: PositionStatus.modified,
    createdAtTimestamp: currentTimestamp,
    transactionHash: eventData.transactionHash,
    rate: position.rate,
    prevRate: previousPositionRate,
    remainingSwaps: position.remainingSwaps,
    prevRemainingSwaps: previousRemainingSwaps,
  };
  position.history.push(modifiedData);
  position.save();
};

const updateSwapInfo = (
  position: any,
  transactionHash: string,
  userReturnAmount: BigNumber,
  toWithdraw: string
) => {
  const currentTimestamp = getUnixTimestamp();
  const remainingSwaps = BigNumber.from(position.remainingSwaps).sub(1);
  if (remainingSwaps.eq(0)) {
    position.status = PositionStatus.completed;
  }
  position.remainingSwaps = remainingSwaps.toString();
  position.totalExecutedSwaps = BigNumber.from(position.totalExecutedSwaps)
    .add(1)
    .toString();
  position.totalAmountSwapped = BigNumber.from(position.rate)
    .add(position.totalAmountSwapped)
    .toString();

  position.totalAmountReturned = BigNumber.from(userReturnAmount)
    .add(position.totalAmountReturned)
    .toString();
  position.toWithdraw = toWithdraw;
  position.history.push({
    createdAtTimestamp: currentTimestamp,
    fromAmount: position.rate,
    toAmount: userReturnAmount.toString(),
    action: PositionStatus.swapped,
    transactionHash,
  });
  return position.save();
};

export const handleSwapEventData = async (data: any, contract: any) => {
  try {
    const swappedData = data[2];
    const transactionHash = data[3].transactionHash;
    const intervals: string[] = [];
    swappedData.forEach((swapInfo: any) => {
      console.log("swapInfo", JSON.stringify(swapInfo));
      intervals.push(...intervalsFromBytes(swapInfo.intervalsInSwap));
    });
    console.log("intervals", intervals.toString());
    const activePositions = await apiGetActivePositionInfo(intervals);
    console.log("activePositions", JSON.stringify(activePositions));

    const positionDetailsFromBC = await Promise.all(
      activePositions.map(
        async (position: DCAPositionInfo) =>
          await contract.getPositionDetails(position.id)
      )
    );
    const response = await Promise.all(
      activePositions.map(
        async (
          {
            account,
            contract: contractAddress,
            id: positionId,
            toWithdraw,
          }: DCAPositionInfo,
          index: number
        ) => {
          const userReturnAmount =
            positionDetailsFromBC[index].swapped.sub(toWithdraw);
          console.log("userReturnAmount", userReturnAmount.toString());
          const claimable = positionDetailsFromBC[index].swapped.toString();
          const position = await apiGetPositionDetails(
            account,
            contractAddress,
            positionId
          );
          return await updateSwapInfo(
            position,
            transactionHash,
            userReturnAmount,
            claimable
          );
        }
      )
    );
    console.log("Swap response", JSON.stringify(response));
  } catch (error) {
    console.log("Swap error", JSON.stringify(error));
  }
};

export const handleClaimEventData = async (data: any, contract: any) => {
  const contractAddress = contract.address;
  const account = data[0];
  const recipient = data[1];
  const positionId = data[2].toString();
  const eventData = data[5];
  const swapped = data[3];
  const position = await apiGetPositionDetails(
    account,
    contractAddress,
    positionId
  );
  position.toWithdraw = "0";
  position.totalWithdrawn = BigNumber.from(position.totalWithdrawn)
    .add(swapped)
    .toString();
  const claimData: PositionHistory = {
    action: PositionStatus.claim,
    createdAtTimestamp: getUnixTimestamp(),
    transactionHash: eventData.transactionHash,
    recipient,
    returnedToAmount: swapped.toString(),
  };
  position.history.push(claimData);
  position.save();
};

export const handleTerminateEventData = async (data: any, contract: any) => {
  const contractAddress = contract.address;
  const account = data[0];
  const recipient = data[1];
  const eventData = data[6];
  const positionId = data[2].toString();
  const swapped = data[4];
  const currentTimestamp = getUnixTimestamp();
  const terminationData: PositionHistory = {
    action: PositionStatus.terminated,
    createdAtTimestamp: currentTimestamp,
    transactionHash: eventData.transactionHash,
    recipient,
  };
  const position = await apiGetPositionDetails(
    account,
    contractAddress,
    positionId
  );
  position.history.push(terminationData);
  position.status = PositionStatus.terminated;
  position.toWithdraw = "0";
  position.totalWithdrawn = BigNumber.from(position.totalWithdrawn)
    .add(swapped)
    .toString();
  position.lastUpdatedAt = currentTimestamp;
  position.save();
};
