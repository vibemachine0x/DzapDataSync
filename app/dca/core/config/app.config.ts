require("dotenv").config();

export const defaultChainId = 137;
export const unmarshalAuthKey = process.env.UNMARSHAL_AUTH_KEY;
export const defaultPage = 1;
export const defaultPageSize = 500;
export const thirdPartyApi = {
  oneInch: "https://api-dzap.1inch.io/v4.0/",
};
export const services = {
  oneInch: "oneInch",
  dZap: "dzap",
  unmarshal: "unmarshal",
};

export const defaultSwapVersion = "v1.2";
export const swapVersionV1point3 = "v1.3";
