import { Server, Socket } from "socket.io";

export const chatEvents = (io: Server, socket: Socket) => {
  const handleBall = (data: string) => {
    console.log(data);
  };
  socket.on("balls", handleBall);
};
