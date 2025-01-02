import { Router } from "express";
import GiftController from "../controller/gift.controller.js";
import jwtVerifyMiddleware from "../middleware/jwtVerify.middleware.js";
const router = Router();

const { createGift, getAllGift, getGiftById, updateGiftById, deleteGiftById, deleteMultipleGift } =
  GiftController;

  const {verifyToken, verifyAdmin} = jwtVerifyMiddleware

router.route("/get-all-gift").get(getAllGift);
router.route("/create-gift").post(verifyToken, verifyAdmin, createGift);
router.route("/get-gift-by-id/:giftId").get(getGiftById);
router.route("/update-gift-by-id").post(verifyToken, verifyAdmin, updateGiftById);
router.route("/delete-gift-by-id/:giftId").delete(verifyToken, verifyAdmin, deleteGiftById);
router.route("/delete-multiple-gift").post(verifyToken, verifyAdmin, deleteMultipleGift)

export default router;
