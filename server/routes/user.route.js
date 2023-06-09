import express from "express";
import { userController } from "../controllers/index.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = express.Router();

// WHO AM I

router.get("/me", authenticate, userController.me);
router.get("/all", authenticate, userController.getAllUsers);
router.patch("/resetpassword", userController.resetPassword);

export default router;
