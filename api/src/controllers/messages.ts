import { RequestHandler } from "express";
import { IError } from "../types/interfaces/error.js";
import { getIO } from "../socket.js";
import { prisma } from "../index.js";
import { MsgType } from "@prisma/client";

export const createMessage: RequestHandler = async (req, res, next) => {
  const { userId } = req.params;

  const {
    msgType,
    data,
    receiverId,
  }: { msgType: MsgType; data: string; receiverId: string } = req.body;

  try {
    const messageData = {
      msgType: msgType,
      data: data,
      sender: userId,
      receiver: receiverId,
    };

    const chat = await prisma.chat.findFirst({
      where: {
        users: {
          every: {
            id: {
              in: [Number(userId), Number(receiverId)],
            },
          },
        },
      },
    });

    if (!chat) {
      const error: { message?: string; statusCode?: number; data?: any } =
        new Error("Chat not found");
      error.statusCode = 404;
      throw error;
    }

    // res.status(200).json({ blabla: chat });
    else {
      await prisma.message.create({
        data: {
          msgType: msgType,
          data: data,
          chat: {
            connect: {
              id: chat.id,
            },
          },
          sender: {
            connect: {
              id: Number(userId),
            },
          },
          receiver: {
            connect: {
              id: Number(receiverId),
            },
          },
        },
      });

      const room = chat.id.toString();
      getIO().to(room).emit("message", {
        message: messageData,
      });
      res.status(201).json({ message: "Message created!" });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// export const getLatestMessage: RequestHandler = async (req, res, next) => {
//   const { userId } = req.params;
//   if (!userId) {
//     const error: IError = new Error("Invalid user Id");
//     error.statusCode = 401;
//     throw error;
//   }
//   try {
//     const userChats = await Chat.find({
//       $or: [{ user1: userId }, { user2: userId }],
//     })
//       .skip(0)
//       .limit(4)
//       .sort({ updatedAt: "desc" })
//       .populate({
//         path: "messages",
//         select: "msgType sender data",
//         perDocumentLimit: 1,
//         populate: { path: "sender", model: "User", select: "username" },
//         options: { sort: { createdAt: -1 } },
//       });
//     if (!userChats) {
//       const error: IError = new Error("No Chats Exist.");
//       error.statusCode = 404;
//       throw error;
//     }
//     return res.status(200).json({ history: userChats });
//   } catch (err) {
//     next(err);
//   }
// };
