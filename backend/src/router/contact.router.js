import { Router } from "express";
import ContactController from "../controller/contact.controller.js"
import jwtVerifyMiddleware from "../middleware/jwtVerify.middleware.js";

const {verifyToken, verifyAdmin} = jwtVerifyMiddleware

const {
  createContact,
  getAllContact,
  updateContactById,
  deleteContactById,
  deleteMultipleContact,
} = ContactController;

const router = Router();

router.route("/create-new-contact").post(createContact);
router.route("/get-all-contact").get(verifyToken, verifyAdmin, getAllContact);
router.route("/update-contact-by-id").post(verifyToken, verifyAdmin, updateContactById);
router.route("/delete-contact-by-id/:contactId").delete(verifyToken, verifyAdmin, deleteContactById);
router.route("/delete-multiple-contact").post(verifyToken, verifyAdmin, deleteMultipleContact);

export default router