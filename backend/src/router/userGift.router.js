import { Router } from "express";
import userGiftController from "../controller/userGift.controller.js";
import jwtVerifyMiddleware from "../middleware/jwtVerify.middleware.js";

const router = Router();

const {getAllUserGift, exchangeGift} = userGiftController

const {verifyToken, verifyUser } = jwtVerifyMiddleware

router.route("/getAllUserGift").get(verifyToken, verifyUser, getAllUserGift)
router.route("/exchangeGift").post(verifyToken, verifyUser, exchangeGift)

export default router;