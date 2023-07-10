import { Request, Response } from "express";
import { handleError } from "../../core/exceptions";
import {
  createPositionService,
  getUserDCAPositionsService,
} from "../../services/sync.services";

export default class PurgeController {
  getUserDCAPositions = async (req: Request, res: Response) => {
    try {
      const { account } = req.query;
      const response = await getUserDCAPositionsService(
        account?.toString() || ""
      );
      res.send(response);
    } catch (error) {
      return handleError(res, error);
    }
  };
  createPosition = async (req: Request, res: Response) => {
    try {
      const response = await createPositionService(req.body);
      res.send(response);
    } catch (error) {
      return handleError(res, error);
    }
  };
}
