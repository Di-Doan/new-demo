import { Router } from "express";
import SubscriptionController from "../controller/subscription.controller.js";
import jwtVerifyMiddleware from "../middleware/jwtVerify.middleware.js";

const {verifyToken, verifyAdmin} = jwtVerifyMiddleware

const router = Router();

const { getAllSubscription, deleteSubscriptionById, deleteMultipleSubscription } = SubscriptionController;

router.route("/get-all-subscription").get(getAllSubscription);
router.route("/delete-subscription-by-id/:subscriptionId").delete(verifyToken, verifyAdmin, deleteSubscriptionById);
router.route("/delete-multiple-subscription").post(verifyToken, verifyAdmin, deleteMultipleSubscription);

export default router;