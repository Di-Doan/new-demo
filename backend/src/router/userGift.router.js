import { Router } from "express";
import userGiftController from "../controller/userGift.controller.js";
import jwtVerifyMiddleware from "../middleware/jwtVerify.middleware.js";

const router = Router();

const {getAllUserGift, exchangeGift, getUserGiftList} = userGiftController

const {verifyToken, verifyUser } = jwtVerifyMiddleware

router.route("/get-all-user-gift").get(verifyToken, verifyUser, getAllUserGift)
router.route("/exchange-gift").post(verifyToken, verifyUser, exchangeGift)
router.route("/get-user-gift-list").get(verifyToken, verifyUser, getUserGiftList)

export default router;