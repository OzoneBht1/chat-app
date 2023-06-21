import { Server, Socket } from "socket.io";
import { MessageType } from "../types/enums/message.js";
import Message from "../models/Message.js";

export const chatEvents = (io: Server, socket: Socket) => {
  const handleJoinRoom = (data: string[]) => {
    socket.join(data);
    console.log(data);
  };

  const handleSendMessage = async ({
    to,
    msgType,
    data,
    sender,
  }: {
    to: string;
    msgType: MessageType;
    data: any;
    sender: { _id: string };
  }) => {
    // const message = new Message({
    // })

    io.to(to).emit("receive-message", {
      msgType,
      data,
      sender,
    });
  };
  socket.on("join-room", handleJoinRoom);
  socket.on("send-message", handleSendMessage);
};
