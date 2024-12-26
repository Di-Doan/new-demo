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

const getAllContact = async()=> {
    const result = await ContactModel.find({}) 
    return result
}

// update contact
const updateContactById = async(contactId, updatedInfo) => {
    const result = await ContactModel.findOneAndUpdate({_id: contactId}, updatedInfo)
    return result
}

// delete contact
const deleteContactById = async(contactId) => {
    const result = await ContactModel.findByIdAndDelete(contactId)
    return result
}

export default {
  createContact,
  findContactByEmail,
  getAllContact,
  updateContactById,
  deleteContactById,
};