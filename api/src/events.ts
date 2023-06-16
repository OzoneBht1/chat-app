import { Socket } from "socket.io";

const socketEvents = (socket: Socket, io: any) => {
  socket.on(
    "send-message",
    (message: string, roomId: string, userId: string) => {
      console.log(`Message sent by client  ${message}`);

      if (message.trim() !== "") {
        // io.to(roomId).emit("receive-message", message)
        console.log(roomId, message);
        socket.to(roomId).emit("receive-message", message);
        socket.to(userId).emit("notification", "This is a notification");
      }
    }
  );
  socket.on("join-room", (roomId: string) => {
    socket.join(roomId);
    console.log("Client joined room Id : " + roomId);
  });
  socket.on("leave-room", (roomId: string) => {
    socket.leave(roomId);

    console.log("Client left room Id : " + roomId);
  });
};
export default socketEvents;
