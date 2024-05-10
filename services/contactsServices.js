import path from "path";
import fs from "fs/promises";
import {nanoid} from "nanoid";

const pathContacts = path.resolve("db", "contacts.json");

const updateContacts = contacts => fs.writeFile(pathContacts, JSON.stringify(contacts, null, 2));


export const getContacts = async () => {
    const data = await fs.readFile(pathContacts);
    return JSON.parse(data);
}

export const getContactsById = async (id) => {
    const data = await getContacts();
const contact = data.find(item => item.id === id);

return contact || null;
}

export const deleteItem = async(id) => {
    const data = await getContacts();
    const index = data.findIndex(item => item.id === id);
    if(index === -1) {
        return null;
    }
    const [result] = data.splice(index, 1);
await updateContacts(data);
return result;
}

export const addContact = async(data) => {
    const contacts = await getContacts();
    const newContact = {
        id: nanoid(),
        ...data
    }
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
}

export const updateItem = async (id, data) => {
    const contacts = await getContacts();
    const index = contacts.findIndex(item => item.id === id);
    if(index === -1) {
        return null;
    }
    contacts[index] = {
        ...contacts[index],
        ...data
    }
    await updateContacts(contacts);
    return contacts[index];
}
