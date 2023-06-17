import { Router } from "express";
import {
  createChat,
  createMessage,
  getMessageHistory,
} from "../controllers/messages.js";

const router = Router();

router.post("/chat/:userId", createChat);
router.post("/message/:userId", createMessage);
router.get("/message/history/:userId", getMessageHistory);

export default router;
