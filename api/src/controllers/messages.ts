import { RequestHandler } from "express";
import Chat from "../models/Chat.js";
import Message from "../models/Message.js";
import { IError } from "../types/interfaces/error.js";
import { getIO } from "../socket.js";

export const createMessage: RequestHandler = async (req, res, next) => {
  const { userId } = req.params;

  const { msgType, data, receiverId } = req.body;

  try {
    const messageData = {
      msgType: msgType,
      data: data,
      sender: userId,
      receiver: receiverId,
    };
    const message = new Message(messageData);

    const chat = await Chat.findOne({
      $or: [
        { user1: userId, user2: receiverId },
        { user1: receiverId, user2: userId },
      ],
    });
    console.log(chat);

    if (!chat) {
      const error: { message?: string; statusCode?: number; data?: any } =
        new Error("Chat not found");
      error.statusCode = 404;
      next(error);
    } else {
      const room = chat._id.toString();
      getIO().to(room).emit("message", {
        message: messageData,
      });
      const newMessage = await message.save();
      chat.messages.push(newMessage._id);
      await chat.save();
      res.status(201).json({ message: "Message created!" });
    }
  } catch (err) {
    console.log(err);
  }
};

export const getLatestMessage: RequestHandler = async (req, res, next) => {
  const { userId } = req.params;
  if (!userId) {
    const error: IError = new Error("Invalid user Id");
    error.statusCode = 401;
    throw error;
  }
  try {
    const userChats = await Chat.find({
      $or: [{ user1: userId }, { user2: userId }],
    })
      .skip(0)
      .limit(4)
      .sort({ updatedAt: "desc" })
      .populate({
        path: "messages",
        select: "msgType sender data",
        perDocumentLimit: 1,
        populate: { path: "sender", model: "User", select: "username" },
        options: { sort: { createdAt: -1 } },
      });
    if (!userChats) {
      const error: IError = new Error("No Chats Exist.");
      error.statusCode = 404;
      throw error;
    }
    return res.status(200).json({ history: userChats });
  } catch (err) {
    next(err);
  }
};
