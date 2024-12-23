import userService from "../services/function/user.service.js";
import Error from "../config/Error.js";
import responseService from "../services/response/response.service.js";
import catchAsync from "../utils/catchAsync.js";
import emailService from "../services/email/email.service.js";
import authService from "../services/function/auth.service.js"
import dotenv from "dotenv"
dotenv.config()

const {
  createUser: _createUser,
  getAllUser: _getAllUser,
  getUserById: _getUserById,
  getUserByEmail: _getUserByEmai,
  updateUserById: _updateUserById,
  deleteUserById: _deleteUserById,
} = userService;

const { sendOTPEmail: _sendOTPEmail, generateOTP: _generateOTP, sendSubscriptionEmail: _sendSubscriptionEmail } = emailService;

const { newSuccess: _newSuccess, newError: _newError } = responseService;

const {createRole: _createRole, updateRoleByEmail:_updateRoleByEmail, deleteRoleByEmail: _deleteRoleByEmail} = authService

// create new user
const createUser = catchAsync(async (req, res) => {
  const { username, name, password, email, point, role } = req.body.newUser;
  const existUser = await _getUserByEmai(email);
  if (existUser) {
    return res.status(400).json({
      errCode: Error.EmailDuplicate.errCode,
      errMessage: Error.EmailDuplicate.errMessage,
    });
  }

  const result = await _createUser(username, name, password, email, point);
  await _createRole(email, role)
  return res.status(200).json(_newSuccess(result));
});

// get all user
const getAllUser = catchAsync(async (req, res) => {
  const result = await _getAllUser();
  return res.status(200).json(_newSuccess(result));
});

// get user by id
const getUserById = catchAsync(async (req, res) => {
  const { userId } = req.query;
  const result = await _getUserById(userId);
  if (!result) {
    return res.status(400).json({
      errCode: Error.UserNotFound.errCode,
      errMessage: Error.UserNotFound.errMessage,
    });
  }
  return res.status(200).json(_newSuccess({ result }));
});

// get user by email
const getUserByEmail = catchAsync(async (req, res) => {
  const { userEmail } = req.body;
  const result = await _getUserByEmai(userEmail);
  if (!result) {
    return res.status(400).json({
      errCode: Error.UserNotFound.errCode,
      errMessage: Error.UserNotFound.errMessage,
    });
  }
  return res.status(200).json(_newSuccess({ result }));
});

//update user by id
const updateUserById = catchAsync(async (req, res) => {
  const { userId, updatedInfo } = req.body;
  const { role, password, ...rest} = updatedInfo
  const result = await _updateUserById(userId, rest);
  if (!result) {
    return res.status(400).json({
      errCode: Error.UserNotFound.errCode,
      errMessage: Error.UserNotFound.errMessage,
    });
  }
  await _updateRoleByEmail({email: updatedInfo.email}, {email: updatedInfo.email, role: role})
  return res.status(200).json(_newSuccess({ result }));
});

//delete user by id
const deleteUserById = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await _deleteUserById(userId);
  if (!result) {
    return res.status(400).json({
      errCode: Error.UserNotFound.errCode,
      errMessage: Error.UserNotFound.errMessage,
    });
  }
  return res.status(200).json(_newSuccess({ result }));
});

// delete multiple user
const deleteMultipleUser = catchAsync(async (req, res) => {
  const userList = req.body

  for (const user of userList) {
    await _deleteUserById(user._id)
    await _deleteRoleByEmail(user.email)
  }
  return res.status(200).json(_newSuccess());
})



export default {
  createUser,
  getAllUser,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  deleteMultipleUser
};
