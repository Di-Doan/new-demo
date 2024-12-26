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

router.route("/createNewContact").post(createContact)
router.route("/getAllContact").get(verifyToken, verifyAdmin, getAllContact);
router.route("/updateContactById").post(verifyToken, verifyAdmin, updateContactById);
router
  .route("/deleteContactById/:contactId")
  .delete(verifyToken, verifyAdmin, deleteContactById);
router
  .route("/deleteMultipleContact")
  .post(verifyToken, verifyAdmin, deleteMultipleContact);

export default router