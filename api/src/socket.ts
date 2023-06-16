import { Server as HttpServer } from "http";
import { Server } from "socket.io";

let io: Server | undefined;
const init = (httpServer: HttpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });
  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};
export { init, getIO };
