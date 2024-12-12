import { Router } from "express";
import AuthController from "../controller/auth.controller.js";
import jwtVerifyMiddleware from "../middleware/jwtVerify.middleware.js";

const router = Router();

const {resetPasswordEmail, sendSubscriptionEmail, signin, logout, resetPassword } = AuthController

const {verifyToken, verifyAdmin} = jwtVerifyMiddleware

router.route("/resetPasswordEmail").post(resetPasswordEmail);
router.route("/sendSubscription").post(sendSubscriptionEmail)
router.route("/signin").post(verifyToken, signin)
router.route("/logout").get(logout)
router.route("/resetPassword").post(resetPassword)

export default router