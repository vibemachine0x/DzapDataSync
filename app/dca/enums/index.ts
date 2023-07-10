export enum NetworkIDs {
  "zkSync" = 324,
  "polygon" = 137,
  "polygonTestnet" = 80001,
  "ethereum" = 1,
  "binance" = 56,
  "arbitrum" = 42161,
  "optimism" = 10,
}

export enum DCAEvents {
  "create" = "Created",
  "swap" = "Swapped",
  "terminate" = "Terminated",
  "modify" = "Modified",
  "claim" = "Withdrawn",
}

export enum PositionStatus {
  active = "ACTIVE",
  terminated = "TERMINATED",
  completed = "COMPLETED",
  swapped = "SWAPPED",
  created = "CREATED",
  modified = "MODIFIED",
  claim = "WITHDRAWN",
}
