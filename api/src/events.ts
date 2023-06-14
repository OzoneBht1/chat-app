import { Socket } from "socket.io"

const something: any[] = []

const socketEvents = (socket: Socket) => {
  socket.on("send-message", (message: string, id: string) => {
    console.log(`Socket sent by client ${id}`)
  })
}
export default socketEvents
