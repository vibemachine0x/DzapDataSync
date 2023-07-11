import _ from "lodash";
import {
  apiCreatePosition,
  apiGetActivePositionInfo,
  apiGetUserDCAPositions,
} from "../persistence/sync.persistence";
import { DCAPositionInfo } from "../types";

export const createPositionService = async (request: any) => {
  return await apiCreatePosition(request);
};

export const getUserDCAPositionsService = async (account: string) => {
  return await apiGetUserDCAPositions(account);
};

export const getActivePositionInfoService = async () => {
  const activePositions = await apiGetActivePositionInfo();
  const requiredPositionInfo = activePositions.map(
    (position: DCAPositionInfo) => {
      return {
        id: position.id,
        fromToken: position.from.id,
        toToken: position.to.id,
        status: position.status,
        pair: `${position.from.id}-${position.to.id}`,
        swapInterval: position.swapInterval.id,
      };
    }
  );
  const positionGroupedByInterval = _.groupBy(
    requiredPositionInfo,
    function (position) {
      return position.swapInterval;
    }
  );
  return positionGroupedByInterval;
};
