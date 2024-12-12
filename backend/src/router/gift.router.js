import { Router } from "express";
import GiftController from "../controller/gift.controller.js";
import jwtVerifyMiddleware from "../middleware/jwtVerify.middleware.js";
const router = Router();

const { createGift, getAllGift, getGiftById, updateGiftById, deleteGiftById, deleteMultipleGift } =
  GiftController;

  const {verifyToken, verifyAdmin} = jwtVerifyMiddleware

router.route("/getAllGift").get(getAllGift);
router.route("/createGift").post(verifyToken, verifyAdmin, createGift);
router.route("/getGiftById/:giftId").get(getGiftById);
router.route("/updateGiftById").post(verifyToken, verifyAdmin, updateGiftById);
router.route("/deleteGiftById/:giftId").delete(verifyToken, verifyAdmin, deleteGiftById);
router.route("/deleteMultipleGift").post(verifyToken, verifyAdmin, deleteMultipleGift)

export default router;
