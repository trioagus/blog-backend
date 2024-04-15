import express from "express";
import { UserController } from "../controller/user.controler";
import { validateToken } from "../middleware/auth.validate";
import { isAdmin } from "../middleware/isAdmin.validate";

const router = express.Router();

router.get("/:id", UserController.getUserById);
router.get("/", validateToken, isAdmin, UserController.getUsers);
router.put("/:id", validateToken, UserController.updateUser);
router.delete("/:id", validateToken, UserController.deleteUser);

export default router;
