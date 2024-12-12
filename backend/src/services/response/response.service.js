import httpStatus from 'http-status'
import AppError from './AppError.js';
import Success from './Success.js';

const newError = (errCode, errorMessage, statusCode = httpStatus.BAD_REQUEST) => {
  return new AppError(errCode, errorMessage, statusCode);
};

const newSuccess = (data = {}, message = 'Successfully', code = 0, statusCode = httpStatus.OK) => {
  return new Success(data, message, code, statusCode);
};

export default { newSuccess, newError }