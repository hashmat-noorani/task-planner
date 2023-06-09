import express from "express";
import { mailController } from "../controllers/index.js";
import { authenticate } from "../middlewares/index.js";

const router = express.Router();

router.post(
  "/sendemailverificationotp",
  authenticate,
  mailController.sendEmailVerificationOtp
);

router.post(
  "/verifyemailverificationotp",
  authenticate,
  mailController.verifyEmailVerificationOtp
);

router.post("/sendresetpasswordlink", mailController.sendResetPasswordLink);

router.get(
  "/verifyresetpasswordlink/:token",
  mailController.verifyResetPasswordLink
);

router.get("/verifyticket/:ticket", mailController.verifyTicket);

export default router;
