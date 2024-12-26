import { Router } from "express";
import SubscriptionController from "../controller/subscription.controller.js";
import jwtVerifyMiddleware from "../middleware/jwtVerify.middleware.js";

const {verifyToken, verifyAdmin} = jwtVerifyMiddleware

const router = Router();

const { getAllSubscription, deleteSubscriptionById, deleteMultipleSubscription } = SubscriptionController;

router.route("/getAllSubscription").get(getAllSubscription);
router.route("/deleteSubscriptionById/:subscriptionId").delete(verifyToken, verifyAdmin, deleteSubscriptionById);
router.route("/deleteMultipleSubscription").post(verifyToken, verifyAdmin, deleteMultipleSubscription);

export default router;