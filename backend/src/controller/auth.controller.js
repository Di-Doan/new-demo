import userService from "../services/function/user.service.js";
import Error from "../config/Error.js";
import responseService from "../services/response/response.service.js";
import catchAsync from "../utils/catchAsync.js";
import emailService from "../services/email/email.service.js";
import otpService from "../services/function/otp.service.js";
import authService from "../services/function/auth.service.js";
import subscriptionService from "../services/function/subscription.service.js";
import { genSaltSync, hash } from "bcrypt";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const {
  createUser: _createUser,
  getAllUser: _getAllUser,
  getUserById: _getUserById,
  getUserByEmail: _getUserByEmai,
  updateUserById: _updateUserById,
  updateUserByEmail: _updateUserByEmail,
  deleteUserById: _deleteUserById,
} = userService;

const {
  sendOTPEmail: _sendOTPEmail,
  generateOTP: _generateOTP,
  sendSubscriptionEmail: _sendSubscriptionEmail,
} = emailService;

const { newSuccess: _newSuccess, newError: _newError } = responseService;

const {
  createOtp: _createOtp,
  getOtpByEmail: _getOtpByEmail,
  deleteOtpByEmail: _deleteOtpByEmail,
} = otpService;

const { getRoleByEmail: _getRoleByEmail } = authService;

const {
  createNewSubscription: _createNewSubscription,
  getSubscriptionByEmail: _getSubscriptionByEmail,
} = subscriptionService;

// send reset password email
const resetPasswordEmail = catchAsync(async (req, res) => {
  const { userEmail } = req.body;
  const user = await _getUserByEmai(userEmail);
  if (!user) {
    return res.status(400).json({
      errCode: Error.UserNotFound.errCode,
      errMessage: Error.UserNotFound.errMessage,
    });
  }
  const userOtp = await _getOtpByEmail(userEmail);
  if (userOtp) {
    return res.status(400).json({
      errCode: Error.OtpExisted.errCode,
      errMessage: Error.OtpExisted.errMessage,
    });
  }
  const otp = _generateOTP();
  await _sendOTPEmail(user.email, user.name, otp);
  await _createOtp(user.email, otp);
  return res.status(200).json(_newSuccess({ userEmail: userEmail }));
});

// send subscription email
const sendSubscriptionEmail = catchAsync(async (req, res) => {
  const { userEmail } = req.body;

  const user = await _getSubscriptionByEmail(userEmail);

  if (user) {
    return res.status(400).json({
      errCode: Error.ExistedSubcription.errCode,
      errMessage: Error.ExistedSubcription.errMessage,
    });
  }

  try {
    await _sendSubscriptionEmail(userEmail);
    await _createNewSubscription(userEmail);
    return res.status(200).json(_newSuccess());
  } catch (error) {
    return res.status(400).json({
      errCode: Error.SubcriptionUnsuccessful.errCode,
      errMessage: Error.SubcriptionUnsuccessful.errMessage,
    });
  }
});

// signin
const signin = catchAsync(async (req, res) => {
  const { userEmail, password } = req.body;
  const user = await _getUserByEmai(userEmail);
  if (!user) {
    return res.status(400).json({
      errCode: Error.UserNotFound.errCode,
      errMessage: Error.UserNotFound.errMessage,
    });
  }

  const isMatch = await bcrypt.compare(password, user.hashedPassword);

  if (!isMatch) {
    return res.status(400).json({
      errCode: Error.PasswordInvalid.errCode,
      errMessage: Error.PasswordInvalid.errMessage,
    });
  }
  const userRole = await _getRoleByEmail(userEmail);

  const token = jwt.sign(
    {
      userId: user._id,
      role: userRole.role,
      point: user.point,
    },
    process.env.JWT_SECRET, // Secret key for signing the token
    { expiresIn: process.env.TOKEN_EXPIRED }
  );

  // Set the JWT token as an HttpOnly and Secure cookie
  res.cookie("user_jwt", token, {
    httpOnly: true,
    sameSite: "Strict", // Helps mitigate CSRF attacks
    maxAge: process.env.TOKEN_AGE,
  });

  // Optionally, set user-related data (non-HTTPOnly)
  res.cookie(
    "user_data",
    JSON.stringify({ name: user.name, point: user.point, role: userRole.role }),
    {
      sameSite: "Strict",
      maxAge: process.env.TOKEN_AGE,
    }
  );

  return res.status(200).json(_newSuccess());
});

// logout by deleting jwt cookie
const logout = catchAsync(async (req, res) => {
  try {
    res.clearCookie("user_jwt", { httpOnly: true, sameSite: "Strict" });
    return res.status(200).json(_newSuccess());
  } catch (error) {
    return res.status(400).json({
      errCode: Error.LogoutUnsuccessful.errCode,
      errMessage: Error.LogoutUnsuccessful.errMessage,
    });
  }
});

// reset password
const resetPassword = catchAsync(async (req, res) => {
  const { userEmail, otp, password } = req.body;
  const userOtp = await _getOtpByEmail(userEmail);
  if (userOtp && userOtp.otp == otp) {
    const salt = genSaltSync(10);
    const hashedPassword = await hash(password, salt);
    await _updateUserByEmail(userEmail, { hashedPassword: hashedPassword });
    await _deleteOtpByEmail(userEmail);
    return res.status(200).json(_newSuccess());
  } else {
    return res.status(400).json({
      errCode: Error.OtpInvalid.errCode,
      errMessage: Error.OtpInvalid.errMessage,
    });
  }
});

const adminAuth = catchAsync(async (req, res) => {
  const { role } = req.user;
  if (role == "admin") {
    return res.status(200).json(_newSuccess());
  } else {
    return res.status(400).json({
      errCode: Error.OtpInvalid.errCode,
      errMessage: Error.OtpInvalid.errMessage,
    });
  }
});

export default {
  resetPasswordEmail,
  sendSubscriptionEmail,
  signin,
  logout,
  resetPassword,
  adminAuth,
};
