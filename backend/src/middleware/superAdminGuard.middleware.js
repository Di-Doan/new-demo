import Error from "../config/Error.js";
import responseService from "../services/response/response.service.js";
import userService from "../services/function/user.service.js";
import authService from "../services/function/auth.service.js";
import dotenv from "dotenv";
dotenv.config();

const { newSuccess: _newSuccess, newError: _newError } = responseService;

const { getUserById: _getUserById } = userService;

const { getRoleByEmail: _getRoleByEmail } = authService;

const superAdminGuard = async (req, res, next) => {
  let userId;
  let role = "user"
  if (req.params) {
    userId = req.params.userId;
  } else if (req.body.userId) {
    userId = req.body.userId;
  }
  const user = await _getUserById(userId);

  if (user) {
    const roleInfo = await _getRoleByEmail(user.email);
    if (roleInfo) {
      role = roleInfo.role;
    }
  }

  if (role != "superAdmin") {
    next();
  } else {
    return res.status(400).json({
      errCode: Error.RoleInvalid.errCode,
      errMessage: Error.RoleInvalid.errMessage,
    });
  }
};

export default {
    superAdminGuard
}
