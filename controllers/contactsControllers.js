
import HttpError from "../helpers/HttpError.js";
import { createContactSchema, updateContactSchema, updateContactStatusSchema } from "../schemas/contactsSchemas.js";
import { addContact, deleteItem, getContacts, getContactsById, updateItem, updateStatusContact } from "../services/contactsServices.js";


export const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await getContacts();
    
        res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
};

export const getOneContact = async(req, res, next) => {
    try {
        const {id} = req.params;
        const contact = await getContactsById(id);
        if(!contact) {
          throw  HttpError(404, `Contact with this id=${id} not found`);
        }
        res.status(200).json(contact);

    } catch (error) {
        next(error);
    }
};

export const deleteContact = async (req, res, next) => {
    try {
        const {id} = req.params;
        const contact = await deleteItem(id);
        if(!contact) {
           throw HttpError(404, `Contact with this id=${id} Not found`);
        }
        res.status(200).json(contact);
    } catch (error) {
        next(error);
    }
};

export const createContact = async (req, res, next) => {
    try {
        const {error} = createContactSchema.validate(req.body);
        if(error) {
            throw HttpError(404, error.message);
        }
        const newContact = await addContact(req.body);
        res.status(201).json(newContact);
    } catch (error) {
        next(error);
    }
};

export const updateContact = async (req, res, next) => {
    try {
        const {id} = req.params;
        const {error} = updateContactSchema.validate(req.body);
        if(error) {
            throw HttpError(404, error.message);
        }
        const contactUpdate = await updateItem(id, req.body);
        if(!contactUpdate) {
        throw HttpError(404, `Contact with this id=${id} not exist`)
        }
        res.status(200).json(contactUpdate);
    } catch (error) {
        next(error);
    }
};

export const updateFavorite = async (req, res, next) => {
    try {
        
        const {id} = req.params;
        const {error} =  updateContactStatusSchema.validate(req.body);
        if(error) {
            throw HttpError(400, "Type data is not correct, use only boolean")
        }
        const statusUpdate = await updateStatusContact(id, req.body);
        if(!statusUpdate) {
throw HttpError(404, `Contact with this id=${id} not exist`)
        }
        res.status(200).json(statusUpdate);
    } catch (error) {
        next(error);
    }
}