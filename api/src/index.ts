import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import "dotenv/config";
import ServerConfig from "./socket.js";
import morgan from "morgan";
import socketEvents from "./events.js";
import User from "./models/User.js";
import { hashSync } from "bcrypt";
import userRoutes from "./routes/users.js";
import messageRoutes from "./routes/messages.js";
import cors from "cors";

const app = express();

// app.use("/", async (req, res, next) => {
//   for (let i = 0; i < 20; i++) {
//     const user = new User({
//       username: `User${i}`,
//       password: hashSync("password", 12),
//     });
//     await user.save();
//   }
//   console.log("Created 20 users");
// });

app.use(express.json());

app.use(cors());

app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log("Middleware is running");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api/users", userRoutes);
app.use("/api/chats", messageRoutes);

app.use(
  (
    err: { message?: string; statusCode?: number; data?: any },
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const status = err.statusCode || 500;
    const message =
      err.message || "Something went wrong with the server. Try again later";
    const data = err.data;
    res.status(status).json({ message: message, data: data });
  }
);
console.log(process.env.PING);

mongoose.connect(process.env.MONGO!).then(() => {
  const server = app.listen(8080, () => {
    const io = ServerConfig().init(server);
    io.on("connect", (socket) => {
      console.log("A client connected");
      socketEvents(socket, io);
    });
  });
});
