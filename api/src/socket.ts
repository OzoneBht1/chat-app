import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import { chatEvents as registerChatEvents } from "./events/chat.js";

let io: Server | undefined;
let socket: Socket | undefined;
const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

const getSocket = () => {
  if (!socket) {
    throw new Error("Socket object not available!");
  }
  return socket;
};

const init = (httpServer: HttpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on("connect", (clientSocket) => {
    console.log("A client connected");
    socket = clientSocket;
    registerChatEvents(io, socket);
  });

  return io;
};

export { init, getIO, getSocket };
