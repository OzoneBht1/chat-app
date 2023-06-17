import { Router } from "express";
import {
  createChat,
  createMessage,
  getLatestMessage,
} from "../controllers/messages.js";

const router = Router();

router.post("/chat/:userId", createChat);
router.post("/message/:userId", createMessage);
router.get("/message/history/:userId", getLatestMessage);

export default router;
