import Contact from "../models/Model.js"




export const getContacts =  (search = {}) => {
    const {filter = {}, fields = "", settings = {}} = search;
    return Contact.find(filter, fields, settings);
};

export const getContactsById = (_id) => Contact.findById(_id);

export const deleteItem = (id) => Contact.findByIdAndDelete(id);

export const addContact = data => Contact.create(data);

export const updateItem =  (id, data) => Contact.findByIdAndUpdate(id, data);

export const updateStatusContact = (id, data) => Contact.findByIdAndUpdate(id, data);