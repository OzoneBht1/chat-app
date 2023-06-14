import { Schema, model } from "mongoose";
import { MessageType } from "../types/enums/message.js";
import { dataSchema } from "../types/variables/messageData.js"


const Message = new Schema({
  msgType: {
    type: MessageType,
  },
  data: {
    type: dataSchema,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
})

export default model("Message", Message)

