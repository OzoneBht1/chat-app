import { Router } from "express";
import { getUser, loginUser } from "../controllers/users.js";

const router = Router();
console.log("THis is user routes");

router.post("/login", loginUser);
router.get("/user/:userId", getUser);

export default router;
