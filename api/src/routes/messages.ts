import { Router } from "express";
import { loginUser } from "../controllers/users.js";

const router = Router();

router.post("login/", loginUser);

export default router;
