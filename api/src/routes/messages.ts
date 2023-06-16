import { Router } from "express";
import { createChat, createMessage } from "../controllers/messages.js";

const router = Router();

router.post("/chat/:userId", createChat);
router.post("/message/:userId", createMessage);

export default router;
