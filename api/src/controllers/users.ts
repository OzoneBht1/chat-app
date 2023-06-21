import { RequestHandler } from "express";
import { IError } from "../types/interfaces/error.js";
import User from "../models/User.js";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";

export const loginUser: RequestHandler = async (req, res, next) => {
  console.log(req.body.username);
  console.log(req.body.password);
  const { username, password } = req.body;

  if (!username || !password) {
    const error: IError = new Error("Validation Failed");
    error.statusCode = 400;
    next(error);
  }
  try {
    const user = await User.findOne({ username: username });
    console.log(user);
    if (!user) {
      const error: IError = new Error("Invalid Username Or Password");
      error.statusCode = 403;
      console.log("calling next");
      throw error;
    }

    const isCorrectPassword = await compare(password, user?.password as string);
    if (!isCorrectPassword) {
      const error: IError = new Error("Invalid Username Or Password");
      error.statusCode = 403;
      throw error;
    }

    const token = jwt.sign(
      {
        userId: user?.id,
      },
      "banana",
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ token: token });
  } catch (err) {
    next(err);
  }
};
