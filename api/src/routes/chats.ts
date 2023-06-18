import { Router } from "express";
import { createChat, getChatHistory } from "../controllers/chats.js";

const router = Router();

router.post("/chat/:userId", createChat);
router.get("/chat/:chatId", getChatHistory);

export default router;
