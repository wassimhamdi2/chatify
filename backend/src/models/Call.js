import mongoose from "mongoose";

const callSchema = new mongoose.Schema(
  {
    callerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    calleeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["answered", "missed"],
      required: true,
    },
    duration: {
      type: Number, // in seconds
      default: 0,
    },
  },
  { timestamps: true }
);

const Call = mongoose.model("Call", callSchema);

export default Call;
