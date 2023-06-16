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

  const user = await User.findOne({ username: username });
  if (!user) {
    const error: IError = new Error("Invalid Username Or Password");
    error.statusCode = 403;
    next(error);
  }

  const isCorrectPassword = await compare(password, user?.password as string);
  if (!isCorrectPassword) {
    const error: IError = new Error("Invalid Username Or Password");
    error.statusCode = 403;
    return next(error);
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
};
