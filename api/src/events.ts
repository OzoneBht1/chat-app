import { Socket } from "socket.io"

const something: any[] = []

const socketEvents = (socket: Socket) => {
  socket.on("RECEIEVE", (message: string) => {
    something.push(message);
    // db store
    //
    socket.emit("EVENT", message)
    socket.broadcast.to("abcd").emit("", () => console.log("hi"))
  })
}
export default socketEvents
