import { Router } from "express";
import AuthController from "../controller/auth.controller.js";
import jwtVerifyMiddleware from "../middleware/jwtVerify.middleware.js";

const router = Router();

const {resetPasswordEmail, sendSubscriptionEmail, signin, logout, resetPassword } = AuthController

const {verifyToken, verifyAdmin} = jwtVerifyMiddleware

router.route("/reset-password-email").post(resetPasswordEmail);
router.route("/send-subscription").post(sendSubscriptionEmail);
router.route("/signin").post(verifyToken, signin);
router.route("/logout").get(logout);
router.route("/reset-password").post(resetPassword);

export default router