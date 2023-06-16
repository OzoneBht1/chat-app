import { Schema, model } from "mongoose";
import { MessageType } from "../types/enums/message.js";

const Message = new Schema(
  {
    msgType: {
      type: String,
      enum: MessageType,
    },
    data: {
      type: String,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default model("Message", Message);
