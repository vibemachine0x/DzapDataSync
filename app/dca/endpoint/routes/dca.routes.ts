import { celebrate } from "celebrate";
import express from "express";
import Joi from "joi";
import DCAController from "../controller/dca";
const dcaRoutes = express.Router();

const dcaController = new DCAController();

dcaRoutes.get(
  "/positions/get-all",
  celebrate({
    query: Joi.object({
      account: Joi.string().max(42).required(),
    }),
  }),
  dcaController.getUserDCAPositions
);

export default dcaRoutes;
