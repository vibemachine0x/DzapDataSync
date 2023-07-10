import { BigNumber } from "ethers";
import { PositionStatus } from "../enums";
import { apiGetPositionDetails } from "../persistence/sync.persistence";
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

    const currentTimestamp = Date.now();

    const positionInfo: DCAPositionInfo = {
      account,
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
  const finalSwap = data[4].toString();
  const position = await apiGetPositionDetails(
    account,
    contractAddress,
    positionId
  );

  console.log(JSON.stringify(data));

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
  position.lastUpdatedAt = Date.now();

  // Remove position from active position
  if (BigNumber.from(position.remainingSwaps).eq("0")) {
    position.status = PositionStatus.completed;
    // pairLibrary.removeActivePosition(position);
  } else if (position.status != PositionStatus.active) {
    position.status = PositionStatus.active;
    // pairLibrary.addActivePosition(position);
  }

  // history
  const modifiedData: PositionHistory = {
    action: PositionStatus.modified,
    createdAtTimestamp: Date.now(),
    transactionHash: eventData.transactionHash,
    rate: position.rate,
    prevRate: previousPositionRate,
    remainingSwaps: position.remainingSwaps,
    prevRemainingSwaps: previousRemainingSwaps,
  };
  position.history.push(modifiedData);
  position.save();
};

export const handleSwapEventData = (data: any) => {
  const swappedData = data[2];
  const eventData = data[3];
  const hash = eventData.transactionHash;
  const timestamp = Date.now();
  swappedData.forEach((swapInfo: any) => {
    console.log(swapInfo);
  });
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
  position.totalWithdrawn = BigNumber.from(position.totalWithdrawn).add(
    swapped
  );
  const claimData: PositionHistory = {
    action: PositionStatus.claim,
    createdAtTimestamp: Date.now(),
    transactionHash: eventData.transactionHash,
    recipient,
    swapped: swapped.toString(),
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
  const terminationData: PositionHistory = {
    action: PositionStatus.terminated,
    createdAtTimestamp: Date.now(),
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
  position.totalWithdrawn = BigNumber.from(position.totalWithdrawn).add(
    swapped
  );
  position.lastUpdatedAt = Date.now();
  position.save();
};
