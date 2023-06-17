import { Schema, model } from "mongoose";

const Chat = new Schema(
  {
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
      },
    ],

    user1: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    user2: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default model("Chat", Chat);
