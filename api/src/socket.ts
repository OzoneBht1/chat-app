import { Server as HttpServer } from "http";
import { Server } from "socket.io"


let io: Server | undefined;
export default function ServerConfig() {
  const init = (httpServer: HttpServer) => {
    io = new Server(httpServer, {
      cors: {
        origin: "*"
      }
    })
    return io;
  }

  const getIO = () => {
    if (!io) {
      throw new Error("Socket.io not initialized!")
    }
    return io;
  }
  return { init, getIO }

}


