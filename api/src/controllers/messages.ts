import { RequestHandler } from "express";
import Chat from "../models/Chat.js";
import Message from "../models/Message.js";

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

export const getMessageHistory: RequestHandler = async (req, res, next) => {
  console.log("CALLED");
  const { userId } = req.params;
  if (!userId) {
    const error: { message?: string; statusCode?: number; data?: any } =
      new Error("Invalid user Id");
    error.statusCode = 401;
    throw error;
  }
  try {
    const userChats = await Chat.find({
      $or: [{ user1: userId }, { user2: userId }],
    })
      .skip(0)
      .limit(4)
      .sort({ updatedAt: -1 })
      .populate({
        path: "messages",
        select: "msgType sender data",
        populate: { path: "sender", model: "User", select: "username -_id" },
      });

    if (!userChats) {
      const error: { message?: string; statusCode?: number; data?: any } =
        new Error("No Chats Exist.");
      error.statusCode = 404;
      throw error;
    }
    return res.status(200).json({ history: userChats });
  } catch (err) {
    next(err);
  }
};
