import { RequestHandler } from "express";
import { IError } from "../types/interfaces/error.js";
import { prisma } from "../index.js";

export const createChat: RequestHandler = async (req, res, next) => {
  const { userId } = req.params;
  const { newUserId } = req.body;

  try {
    await prisma.chat.create({
      data: {
        users: {
          connect: [{ id: Number(userId) }, { id: Number(newUserId) }],
        },
      },
    });

    res.status(201).json({ message: "Chat created!" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getChatHistory: RequestHandler = async (req, res, next) => {
  const { chatId } = req.params;
  if (!chatId) {
    const error = new Error("The user ids are required");
    next(error);
  }
  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: parseInt(chatId),
      },
      select: {
        users: {
          select: {
            id: true,
            username: true,
            image: true,
            name: true,
          },
        },
        messages: {
          orderBy: {
            updatedAt: "desc",
          },
        },
      },
    });
    // .sort({ updatedAt: -1 })
    // .populate({
    //   path: "messages",
    //   select: "msgType sender receiver data",
    //   populate: {
    //     path: "sender receiver",
    //     model: "User",
    //     select: "username _id",
    //   },
    // });
    if (!chat) {
      const error: IError = new Error("No Chats Exist.");
      error.statusCode = 404;
      next(error);
    }

    res.status(200).json({ chat: chat });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
