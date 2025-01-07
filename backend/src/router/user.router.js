import { Router } from "express";
import UserController from "../controller/user.controller.js";
import jwtVerifyMiddleware from "../middleware/jwtVerify.middleware.js";
import superAdminGuardMiddleware from "../middleware/superAdminGuard.middleware.js";

const router = Router();
const {
  getAllUser,
  createUser,
  updateUserById,
  deleteUserById,
  deleteMultipleUser
} = UserController;

const {verifyToken, verifySuperAdmin } = jwtVerifyMiddleware

const {superAdminGuard} = superAdminGuardMiddleware

router.route("/get-all-user").get(verifyToken, verifySuperAdmin, getAllUser);
router.route("/create-user").post(verifyToken, verifySuperAdmin, createUser);
router.route("/update-user-by-id").post(verifyToken, verifySuperAdmin, superAdminGuard, updateUserById);
router.route("/delete-user-by-id/:userId").delete(verifyToken, verifySuperAdmin, superAdminGuard,deleteUserById);
router.route("/delete-multiple-users").post(verifyToken, verifySuperAdmin, deleteMultipleUser)

export default router;
