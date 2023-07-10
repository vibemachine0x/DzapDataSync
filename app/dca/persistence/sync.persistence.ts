import db from "../models";

const DCA = db.dca;

export const apiCreatePosition = async (request: number) => {
  const dca = new DCA(request);
  const res = await dca.save(dca);
  return res;
};

export const apiGetPositionDetails = async (
  account: string,
  contract: string,
  positionId: number
) => {
  const condition = {
    account: { $regex: new RegExp(account) },
    contract: { $regex: new RegExp(contract) },
    id: positionId,
  };
  return await DCA.findOne(condition);
};

export const apiGetUserDCAPositions = async (account: string) => {
  const condition = account
    ? { account: { $regex: new RegExp(account), $options: "i" } }
    : {};
  const res = await DCA.find(condition);
  return res;
};
