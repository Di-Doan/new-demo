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

router.route("/getAllUser").get(verifyToken, verifyAdmin, getAllUser);
router.route("/createUser").post(verifyToken, verifyAdmin, createUser);
router.route("/getUserById").get(getUserById);
router.route("/getUserByEmail").post(getUserByEmail);
router.route("/updateUserById").post(verifyToken, verifyAdmin, updateUserById);
router.route("/deleteUserById/:userId").delete(verifyToken, verifyAdmin, deleteUserById);
router.route("/deleteMultipleUsers").post(verifyToken, verifyAdmin, deleteMultipleUser)

export default router;
