import jwt from "jsonwebtoken";
import Error from "../config/Error.js";
import responseService from "../services/response/response.service.js";
import userService from "../services/function/user.service.js";
import cookie from "cookie";
import dotenv from "dotenv";
dotenv.config();

const { newSuccess: _newSuccess, newError: _newError } = responseService;

const { getUserById: _getUserById } = userService;

const verifyToken = async (req, res, next) => {
  const cookies = cookie.parse(req.headers.cookie || "");
  const token = cookies["user_jwt"];
  try {
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const verifiedUser = await _getUserById(decoded.userId);

      if (!verifiedUser) {
        return res.status(400).json({
          errCode: Error.UserNotFound.errCode,
          errMessage: Error.UserNotFound.errMessage,
        });
      }

      req.user = {
        userId: decoded.userId,
        role: decoded.role,
        point: decoded.point,
      };
    }
    next();
  } catch (err) {
    throw err;
  }
};

const verifyAdmin = async (req, res, next) => {
  let role = "";
  let userId = "";
  if (req.user) {
    role = req.user.role;
    userId = req.user.userId;
  }

  if (role == "admin" ) {
    next();
  } else {
    return res.status(400).json({
      errCode: Error.RoleInvalid.errCode,
      errMessage: Error.RoleInvalid.errMessage,
    });
  }
};



const verifySuperAdmin = async (req, res, next) => {
  let role = "";
  let userId = "";
  if (req.user) {
    role = req.user.role;
    userId = req.user.userId;
  }


  if (role == "superAdmin" ) {
    next();
  } else {
    return res.status(400).json({
      errCode: Error.RoleInvalid.errCode,
      errMessage: Error.RoleInvalid.errMessage,
    });
  }
};

export default {
  verifyToken,
  verifyAdmin,
  verifySuperAdmin,
};
