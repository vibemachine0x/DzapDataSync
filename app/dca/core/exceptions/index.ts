import { Response } from "express";

export const getErrorInfo = (error: any) => {
  const errorRes: any = {};
  if (error.response) {
    errorRes.data = error.response.data;
    errorRes.status = error.response.status;
    // errorRes.headers = error.response.headers;
  } else if (error.request) {
    errorRes.request = error.request;
  }
  return errorRes;
};

export const handleError = (res: Response, error: any, params = {}) => {
  return res.status(error?.response?.status || 500).send(error);
};
