import Contact from "../models/Model.js"




export const getContacts =  () =>  Contact.find();

export const getContactsById = (_id) => Contact.findById(_id);

export const deleteItem = (id) => Contact.findByIdAndDelete(id);

export const addContact = data => Contact.create(data);

export const updateItem =  (id, data) => Contact.findByIdAndUpdate(id, data);

export const updateStatusContact = (id, data) => Contact.findByIdAndUpdate(id, data);