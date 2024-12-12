import httpStatus from "http-status";

const Error = {
  // 100++ Error from info of the client
  UrlNotFound: {
    errCode: 100,
    errMessage: "Request URL not found",
  },

  UserNameInvalid: {
    errCode: 101,
    errMessage: "Username is invalid", 
  },
  PasswordInvalid: {
    errCode: 102,
    errMessage: "Mật khẩu hoặc email không đúng",
  },
  UserNotFound: {
    errCode: 103,
    errMessage: "Người dùng không tồn tại",
  },

  EmailInvalid: {
    errCode: 105,
    errMessage: "Email not valid",
  },

  EmailEmpty: {
    errCode: 106,
    errMessage: "Email is empty",
  },

  EmailDuplicate: {
    errCode: 107,
    errMessage: "Email đã được sử dụng",
  },

  UserIdInvalid: {
    errCode: 108,
    errMessage: "User id invalid",
  },

  AuthHeaderMissing: {
    errCode: 109,
    errMessage: "Auth header missing",
  },

  PasswordEmpty: {
    errCode: 110,
    errMessage: "Password is empty",
  },
  UserAlreadyExists: {
    errCode: 111,
    errMessage: "User already existed",
  },
  SessionExpired: {
    errCode: 112,
    errMessage: "Session expired",
  },
  GiftAlreadyExists: {
    errCode: 113,
    errMessage: "Gift already existed",
  },
  EmailNotExist: {
    errCode: 114,
    errMessage: "Email không tồn tại",
  },
  OtpInvalid: {
    errCode: 115,
    errMessage: "Otp không khớp",
  },
  OtpExisted: {
    errCode: 116,
    errMessage: "Otp đã được gửi",
  },
  RoleInvalid: {
    errCode: 117,
    errMessage: "Không được cấp quyền",
  },

  // 200++ Error from Db
  CastError: {
    errCode: 201,
    errMessage: "Cast field error",
  },
  DuplicateFieldError: {
    errCode: 202,
    errMessage: "Duplicate field error",
  },

  // 300++ Error from Third Party
  JwtInvalid: {
    errCode: 300,
    errMessage: "Jwt token không hợp lệ",
  },
  JwtMissing: {
    errCode: 301,
    errMessage: "Không tìm thấy jwt token",
  },

  // 400++ Error from Internal Server
  GenericError: {
    errCode: 400,
    errMessage: "Something wrong happened.",
  },

};

export default Error;