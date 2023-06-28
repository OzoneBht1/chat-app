import { RequestHandler } from "express";
import Chat from "../models/Chat.js";
import { IError } from "../types/interfaces/error.js";

export const createChat: RequestHandler = async (req, res, next) => {
  const { userId } = req.params;
  const { newUserId } = req.body;

  try {
    const chat = new Chat({
      user1: userId,
      user2: newUserId,
      messages: [],
    });
    await chat.save();
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
    const chat = await Chat.findOne({
      _id: chatId,
    })
      .sort({ updatedAt: -1 })
      .populate({
        path: "messages",
        select: "msgType sender receiver data",
        populate: {
          path: "sender receiver",
          model: "User",
          select: "username _id",
        },
      });
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
