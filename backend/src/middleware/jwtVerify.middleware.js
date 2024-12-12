import jwt from "jsonwebtoken";
import Error from "../config/Error.js";
import responseService from "../services/response/response.service.js";
import cookie from "cookie";
import dotenv from "dotenv";
dotenv.config();

const { newSuccess: _newSuccess, newError: _newError } = responseService;

const verifyToken = async (req, res, next) => {
  const cookies = cookie.parse(req.headers.cookie || "");
  const token = cookies["user_jwt"];
  try {
    // Verify the token using the secret key (or public key for RSA)
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); 
      // Attach the decoded payload to req.user (or req.body)

      req.user = {
        userEmail: decoded.email, // Assuming the token has `useremail`
        role: decoded.role, // Assuming the token has `role`
      };
    }

    // Continue to the next middleware/route handler
    next();
  } catch (err) {
    console.log(err);
  }
};

const verifyAdmin = async (req, res, next) => {
  let role = "";
  if (req.user) {
    role = req.user.role;
  }

  if (role == "admin") {
    next();
  } else {
    res.status(400).json({
      errCode: Error.RoleInvalid.errCode,
      errMessage: Error.RoleInvalid.errMessage,
    });
  }
};

export default {
  verifyToken,
  verifyAdmin,
};
