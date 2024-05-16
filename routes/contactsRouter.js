import express from "express";
import { createContact, deleteContact, getAllContacts, getOneContact, updateContact, updateFavorite } from "../controllers/contactsControllers.js";

import emptyMiddleware from "../middlewares/isEmptyMiddleware.js";
import isValidateId from "../middlewares/isValidateId.js";



const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);
contactsRouter.get("/:id",isValidateId, getOneContact);
contactsRouter.delete("/:id",isValidateId,  deleteContact);
contactsRouter.post("/", createContact);
contactsRouter.put("/:id",isValidateId, emptyMiddleware, updateContact);
contactsRouter.patch("/:id", isValidateId, emptyMiddleware, updateFavorite)

export default contactsRouter;