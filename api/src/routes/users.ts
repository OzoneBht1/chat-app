import { Router } from "express";
import { loginUser } from "../controllers/users.js";

const router = Router();
console.log("THis is user routes");

router.post("/login", loginUser);

export default router;
