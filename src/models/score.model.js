import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema(
  {
    totalRuns: {
      type: Number,
      default: 0,
    },
    totalWickets: {
      type: Number,
      default: 0,
    },
    currentOver: {
      type: Number,
      default: 0,
    },
    overs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Over",
      },
    ],
  },
  { timestamps: true }
);

const Score = mongoose.model("Score", scoreSchema);

export default Score;
