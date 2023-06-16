import { RequestHandler } from "express";
import Chat from "../models/Chat.js";
import Message from "../models/Message.js";
import { MessageType } from "../types/enums/message.js";
import { Types } from "mongoose";

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

    const newMessage = await message.save();
    const chat = await Chat.findOne({ user1: userId, user2: receiverId });
    console.log(chat);

    if (!chat) {
      const error: { message?: string; statusCode?: number; data?: any } =
        new Error("Chat not found");
      error.statusCode = 404;
      next(error);
    } else {
      console.log(chat.messages);
      chat.messages.push(newMessage._id);
      await chat.save();
      res.status(201).json({ message: "Message created!" });
    }
  } catch (err) {
    console.log(err);
  }
};
