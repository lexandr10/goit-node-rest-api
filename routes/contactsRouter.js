import express from "express";
import { createContact, deleteContact, getAllContacts, getOneContact, updateContact } from "../controllers/contactsControllers.js";

import emptyMiddleware from "../middlewares/isEmptyMiddleware.js";



const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);
contactsRouter.get("/:id", getOneContact);
contactsRouter.delete("/:id", deleteContact);
contactsRouter.post("/", createContact);
contactsRouter.put("/:id", emptyMiddleware, updateContact);


export default contactsRouter;