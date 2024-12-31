import mongoose from "mongoose";

const overSchema = new mongoose.Schema(
  {
    overNumber: {
      type: Number,
      required: true,
    },
    result: [
      {
        ballNumber: {
          type: String,
          enum: ["1", "2", "3", "4", "5", "6"],
          required: true,
        },
        outcome: {
          type: String,
          enum: ["0", "1", "2", "3", "4", "6", "-1"],
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Over = mongoose.model("Over", overSchema);

export default Over;
