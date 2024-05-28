import Contact from "../models/Model.js"




export const getContacts =  (search = {}) => {
    const {filter = {}, fields = "", settings = {}} = search;
    return Contact.find(filter, fields, settings);
};

export const getContactsById = (search = {}) => 
    {
        const {filter} = search;
        return Contact.findOne(filter);
    }

export const deleteItem = (filter) => Contact.findOneAndDelete(filter);

export const addContact = data => Contact.create(data);

export const updateItem =  (filter, data) => Contact.findOneAndUpdate(filter, data);

export const updateStatusContact = (filter, data) => Contact.findOneAndUpdate(filter, data);