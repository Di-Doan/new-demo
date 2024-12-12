import { Router } from "express";
import ContactController from "../controller/contact.controller.js"

const { createContact } = ContactController

const router = Router();

router.route("/createNewContact").post(createContact)

export default router