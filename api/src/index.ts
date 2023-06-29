import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import "dotenv/config";
import { init } from "./socket.js";
import morgan from "morgan";
import { hashSync } from "bcrypt";
import userRoutes from "./routes/users.js";
import messageRoutes from "./routes/messages.js";
import chatRoutes from "./routes/chats.js";
import cors from "cors";
// import multer from "multer";
import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
const app = express();

export const prisma = new PrismaClient();

// app.use("/", async (req, res, next) => {
//   for (let i = 0; i < 20; i++) {
//     await prisma.user.create({
//       data: {
//         username: `User${i}`,
//         password: hashSync("password", 12),
//         name: faker.person.fullName(),
//         image: "",
//       },
//     });
//   }
//   console.log("Created 20 users");
// });

app.use(express.json());
// app.use(multer({}).single("profilePicture"));

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
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);

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
    const io = init(server);
  });
});
