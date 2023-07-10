interface JsonRpcProvide {
  [key: number]: string;
}
export const JSON_RPC_PROVIDER: JsonRpcProvide = {
  1: "https://eth-mainnet.alchemyapi.io/v2/nfrnWAqN2Frs4UJ_hVhF3xiz_eo9fkKd",
  4: "https://eth-rinkeby.alchemyapi.io/v2/6Abto5co0LubIKUWva-uq2xpGdUKUc66",
  97: "https://data-seed-prebsc-1-s1.binance.org:8545",
  56: "https://bsc-dataseed.binance.org",
  42161:
    "https://arb-mainnet.g.alchemy.com/v2/8dwTIBtZDQhc_5nZhBwlegxx2EpEkZN8",
  80001:
    "https://polygon-mumbai.g.alchemy.com/v2/xOgHYlzhaxkYwc3BUv_ut5J4JoOsldhN",
  137: "https://polygon-mainnet.g.alchemy.com/v2/aoOZJKHgcr-qQjBZ-TZyvZXBv4E38Jr7",
  //   324: "https://polygonzkevm-mainnet.g.alchemy.com/v2/Cf7gTDAuvh7DjjAGOGG5wL1sYhwHy7aY",
  324: "https://mainnet.era.zksync.io",
};

interface ChainInfoInterface {
  [key: number]: {
    [key: string]: string | number;
  };
}
interface NativeCurrency {
  [key: number]: string;
}
export const eFormatNativeCurrency1 =
  "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
export const eFormatNativeCurrency =
  "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
export const zeroFormatNativeCurrency =
  "0x0000000000000000000000000000000000000000";
export const unmarshalFormatNativeCurrency: NativeCurrency = {
  42161: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  137: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  56: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  1: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
};
export const unmarshalFormatNativeCurrency1 =
  "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
export const nativeCurrencyAddresses: string[] = [
  "0x0000000000000000000000000000000000001010",
  eFormatNativeCurrency,
  eFormatNativeCurrency1,
  zeroFormatNativeCurrency,
];
export const CHAIN_INFO: ChainInfoInterface = {
  56: {
    symbol: "BNB",
    chain: "bsc",
    decimals: 18,
    name: "BSC Mainnet",
    // icon: binanceIcon,
    hexChainId: "0x38",
  },
  97: {
    symbol: "BNB",
    chain: "bsc",
    decimals: 18,
    name: "BSC Testnet",
    // icon: binanceIcon,
    hexChainId: "0x61",
  },
  4: {
    symbol: "ETH",
    chain: "rinkeby",
    decimals: 18,
    name: "Rinkeby",
    // icon: ethIcon,
    hexChainId: "0x4",
  },
  1: {
    symbol: "ETH",
    chain: "ethereum",
    decimals: 18,
    name: "ETH Mainnet",
    // icon: ethIcon,
    hexChainId: "0x1",
  },
  80001: {
    chain: "matic",
    symbol: "Matic",
    decimals: 18,
    name: "Matic-Testnet",
    // icon: polygonIcon,
    hexChainId: "0x13881",
  },
  137: {
    chain: "matic",
    symbol: "Matic",
    decimals: 18,
    name: "Matic Mainnet",
    // icon: polygonIcon,
    hexChainId: "0x89",
  },
  42161: {
    chain: "arbitrum",
    symbol: "ETH",
    decimals: 18,
    name: "Arbitrum",
    // icon: polygonIcon,
    hexChainId: "0xa4b1",
  },
};
