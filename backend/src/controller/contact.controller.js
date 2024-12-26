import responseService from "../services/response/response.service.js";
import catchAsync from "../utils/catchAsync.js";
import contactService from "../services/function/contact.service.js"
import Error from "../config/Error.js";

const {
  createContact: _createContact,
  findContactByEmail: _findContactByEmail,
  getAllContact: _getAllContact,
  updateContactById: _updateContactById,
  deleteContactById: _deleteContactById,
} = contactService;

const {
    newSuccess: _newSuccess,
    newError: _newError
  } = responseService

const createContact = catchAsync(async (req, res)=> {
    const { name, email, title, note} = req.body
    const contact = await _findContactByEmail(email)
    if (contact) {
        return res.status(400).json({
            errCode: Error.EmailDuplicate.errCode,
            errMessage: Error.EmailDuplicate.errMessage,
          });
    }
    const result = await _createContact(name, email, title, note)
    return res.status(200).json(_newSuccess({ result }))
})

const getAllContact = catchAsync(async(req, res) => {
    const result = await _getAllContact()
    return res.status(200).json(_newSuccess({ result }));
})

const updateContactById = catchAsync(async (req, res) => {
  const { contactId, updatedInfo } = req.body;
  const result = await _updateContactById(contactId, updatedInfo);
  return res.status(200).json(_newSuccess({ result }));
});

const deleteContactById = catchAsync(async (req, res) => {
  const {contactId} = req.params
  const result = await _deleteContactById(contactId);
  return res.status(200).json(_newSuccess({ result }));
});

const deleteMultipleContact = catchAsync(async(req, res)=> {
  const contactList  = req.body

  for (const contact of contactList) {
    await _deleteContactById(contact._id)
  }
  return res.status(200).json(_newSuccess());
})
 
export default {
  createContact,
  getAllContact,
  updateContactById,
  deleteContactById,
  deleteMultipleContact
};