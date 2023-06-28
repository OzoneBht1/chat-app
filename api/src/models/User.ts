import { Schema, model } from "mongoose";

const User = new Schema(
  {
    username: {
      type: String,
      unique: true,
      length: { min: 3 },
    },
    password: {
      type: String,
      length: { min: 5 },
    },
    name: {
      type: String,
    },
    image: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);

export default model("User", User);
