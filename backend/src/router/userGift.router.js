import { Router } from "express";
import userGiftController from "../controller/userGift.controller.js";
import jwtVerifyMiddleware from "../middleware/jwtVerify.middleware.js";

const router = Router();

const {getAllUserGift, exchangeGift, getUserGiftList} = userGiftController

const {verifyToken } = jwtVerifyMiddleware

router.route("/get-all-user-gift").get(verifyToken, getAllUserGift)
router.route("/exchange-gift").post(verifyToken, exchangeGift)
router.route("/get-user-gift-list").get(verifyToken, getUserGiftList)

export default router;