import {
  apiCreatePosition,
  apiGetUserDCAPositions,
} from "../persistence/sync.persistence";

export const createPositionService = async (request: any) => {
  return await apiCreatePosition(request);
};

export const getUserDCAPositionsService = async (account: string) => {
  return await apiGetUserDCAPositions(account);
};
