import responseService from "../services/response/response.service.js";
import catchAsync from "../utils/catchAsync.js";
import contactService from "../services/function/contact.service.js"
import Error from "../config/Error.js";

const {createContact: _createContact, findContactByEmail: _findContactByEmail} = contactService

const {
    newSuccess: _newSuccess,
    newError: _newError
  } = responseService

const createContact = catchAsync(async (req, res)=> {
    const { name, email, title, note} = req.body
    const contact = await _findContactByEmail(email)
    if (contact) {
        res.status(400).json({
            errCode: Error.EmailDuplicate.errCode,
            errMessage: Error.EmailDuplicate.errMessage,
          });
          throw _newError(
            Error.EmailDuplicate.errCode,
            Error.EmailDuplicate.errMessage
          );
    }
    const result = await _createContact(name, email, title, note)
    res.status(200).json(_newSuccess({ result }))
})

export default {
    createContact
}