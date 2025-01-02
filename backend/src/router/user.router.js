import { Router } from "express";
import UserController from "../controller/user.controller.js";
import jwtVerifyMiddleware from "../middleware/jwtVerify.middleware.js";

const router = Router();
const {
  getAllUser,
  createUser,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  deleteMultipleUser
} = UserController;

const {verifyToken, verifyAdmin } = jwtVerifyMiddleware

router.route("/get-all-user").get(verifyToken, verifyAdmin, getAllUser);
router.route("/create-user").post(verifyToken, verifyAdmin, createUser);
router.route("/get-user-by-id").get(getUserById);
router.route("/get-user-by-email").post(getUserByEmail);
router.route("/update-user-by-id").post(verifyToken, verifyAdmin, updateUserById);
router.route("/delete-user-by-id/:userId").delete(verifyToken, verifyAdmin, deleteUserById);
router.route("/delete-multiple-users").post(verifyToken, verifyAdmin, deleteMultipleUser)

export default router;
