import { RequestHandler } from "express";
import Chat from "../models/Chat.js";
import Message from "../models/Message.js";
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

export const createMessage: RequestHandler = async (req, res, next) => {
  const { userId } = req.params;

  const { msgType, data, receiverId } = req.body;

  try {
    const message = new Message({
      msgType: msgType,
      data: data,
      sender: userId,
      receiver: receiverId,
    });

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
        populate: { path: "sender", model: "User", select: "username -_id" },
        options: { sort: { createdAt: -1 } },
      });
    if (!userChats) {
      console.log("YAHA AIPUGO");
      const error: IError = new Error("No Chats Exist.");
      error.statusCode = 404;
      throw error;
    }
    return res.status(200).json({ history: userChats });
  } catch (err) {
    next(err);
  }
};

export const getChatHistory: RequestHandler = async (req, res, next) => {
  const { userId, userId2 } = req.params;
  if (!userId || !userId2) {
    throw new Error("The user ids are required");
  }
  try {
    const chat = await Chat.findOne({
      $or: [
        { user1: userId, user2: userId2 },
        { user1: userId2, user2: userId },
      ],
    })
      .skip(0)
      .limit(4)
      .sort({ updatedAt: -1 })
      .populate({
        path: "messages",
        select: "msgType sender data",
        populate: { path: "sender", model: "User", select: "username -_id" },
      });
    if (!chat) {
      const error: IError = new Error("No Chats Exist.");
      error.statusCode = 404;
      next(error);
    }
  } catch (err) {
    console.log(err);
  }
};
