import express from "express";
import { AuthController } from "../controller/auth.controller";

const router = express.Router();

router.post("/register", AuthController.Register);
router.post("/login", AuthController.Login);
router.delete("/logout", AuthController.Logout);

export default router;