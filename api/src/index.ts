import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import "dotenv/config"
import ServerConfig from "./socket.js"
import morgan from "morgan"
import socketEvents from "./events.js";


const app = express();

app.use(express.json());

app.use(morgan("dev"))

app.use((err: { message?: string, statusCode?: number, data?: any }, req: Request, res: Response, next: NextFunction) => {
  const status = err.statusCode || 500;
  const message =
    err.message || "Something went wrong with the server. Try again later";
  const data = err.data;
  res.status(status).json({ message: message, data: data });
});
console.log(process.env.PING)

mongoose.connect(process.env.MONGO!).then(() => {
  const server = app.listen(3001,
    () => {
      const io = ServerConfig().init(server)
      io.on("connect", (socket) => {
        console.log("A client connected")
        socketEvents(socket);
      })
    }
  )
})


