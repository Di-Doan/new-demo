import ContactModel from "../../models/contact.model.js";

// create new contact
const createContact = async(name, email, title, note = '') => {
    const newContact = new ContactModel({
        name,
        email,
        title,
        note
    })
    const result = newContact.save()
    return result
}

const findContactByEmail = async(email) => {
    const result = await ContactModel.findOne({email: email})
    return result
}

export default {
    createContact,
    findContactByEmail
}