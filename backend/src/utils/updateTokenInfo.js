import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const updateJwtToken = (oldToken, newPayload) => {
  try {
    const decoded = jwt.decode(oldToken);

    const updatedPayload = { ...decoded, ...newPayload };

    const newToken = jwt.sign(
      updatedPayload,
      process.env.JWT_SECRET, 
    );

    return newToken;
  } catch (error) {
    throw error;
  }
};

const updateInfoToken = (oldToken, newPayload) => {
  try {
    const updatedPayload = { ...oldToken, ...newPayload };
    return updatedPayload;
  } catch (error) {
    throw error;
  }
};

export default {
  updateJwtToken,
  updateInfoToken
};
