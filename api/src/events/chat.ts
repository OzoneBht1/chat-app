import { Server, Socket } from "socket.io";
import { MessageType } from "../types/enums/message.js";
import Message from "../models/Message.js";

export const chatEvents = (io: Server, socket: Socket) => {
  const handleJoinRoom = (data: string[]) => {
    data.map((room) => {
      console.log(`${socket.id} is joining room ${room}`);
    });
    socket.join(data);
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
  const handleGetConnectedUsers = (data: string[]) => {
    console.log("Socket ID of the logged in User", socket.id);
    let clients: string[] = [];
    data.map(async (room, i) => {
      const clients = await io.in(room).fetchSockets();
      const socketIds = clients.map((socket) => socket.id);
      console.log(socketIds);
    });
  };
  socket.on("join-room", handleJoinRoom);
  socket.on("get-connected-users", handleGetConnectedUsers);
  socket.on("send-message", handleSendMessage);
};
