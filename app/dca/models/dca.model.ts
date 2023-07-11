import { Schema } from "mongoose";
import { DCAPositionInfo } from "../types";

export const dcaSchema = (mongoose: any) => {
  // Schema
  const schema = new Schema<DCAPositionInfo>({
    id: { type: String, required: true },
    account: { type: String, required: true },
    contract: { type: String, required: true },
    chainId: { type: Number },
    createdAtTimestamp: { type: Number, required: true },
    lastUpdatedAt: { type: Number, required: true },
    status: { type: String, required: true },
    toWithdraw: { type: String, required: true },
    from: { type: { id: String }, required: true },
    to: { type: { id: String }, required: true },
    swapInterval: { type: { id: Number }, required: true },
    rate: { type: String, required: true },
    remainingSwaps: { type: String, required: true },
    totalDeposited: { type: String, required: true },
    totalAmountReturned: { type: String, required: true },
    totalAmountSwapped: { type: String, required: true },
    totalWithdrawn: { type: String, required: true },
    totalSwaps: { type: String, required: true },
    totalExecutedSwaps: { type: String, required: true },
    nativeFlag: { type: Boolean, required: true },
    history: [
      {
        type: {
          returnedToAmount: String,
          action: String,
          transactionHash: String,
          createdAtTimestamp: Number,
          recipient: String,
          fromAmount: String,
          toAmount: String,
          rate: String,
          prevRate: String,
          remainingSwaps: String,
          prevRemainingSwaps: String,
          swapped: String,
        },
        required: true,
      },
    ],
  });
  const DCA = mongoose.model("dca", schema);
  return DCA;
};
