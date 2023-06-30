import { Router } from "express";
import { createMessage, getLatestMessage } from "../controllers/messages.js";

const router = Router();

router.post("/message/:userId", createMessage);
router.get("/message/history/:userId", getLatestMessage);

export default router;
