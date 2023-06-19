import { io } from "socket.io-client";

const socket = io("http://localhost:8080");

let socketId: string;

socket.on("connect", () => {
  socketId = socket.id;
  console.log("Client connected with id ", socketId);

  socket.onAny((event, ...args) => {
    console.log(event, args);
  });
});

export default socket;
