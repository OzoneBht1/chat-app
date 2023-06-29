import { Router } from "express";
import { loginUser, getUser } from "../controllers/users.js";

const router = Router();
console.log("THis is user routes");

router.post("/login", loginUser);
router.get("/user/:userId", getUser);

export default router;
