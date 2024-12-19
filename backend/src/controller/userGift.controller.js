import userGiftService from "../services/function/userGift.service.js";
import giftService from "../services/function/gift.service.js";
import userService from "../services/function/user.service.js";
import Error from "../config/Error.js";
import responseService from "../services/response/response.service.js";
import catchAsync from "../utils/catchAsync.js";
import UpdateToken from "../utils/updateTokenInfo.js";
import cookie from "cookie";
import updateTokenInfo from "../utils/updateTokenInfo.js";

const {
  getAllUserGift: _getAllUserGift,
  createUserGiftList: _createUserGiftList,
  exchangeGift: _exchangeGift,
} = userGiftService;

const { getGiftById: _getGiftById } = giftService;

const { newSuccess: _newSuccess, newError: _newError } = responseService;

const { updateUserById: _updateUserById } = userService;

const { updateInfoToken: _updateInfoToken, updateJwtToken: _updateJwtToken } =
  UpdateToken;

const getAllUserGift = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const userGiftList = await _getAllUserGift(userId);
  if (!userGiftList) {
    await _createUserGiftList(userId);
    return res.status(400).json({
      errCode: Error.GiftListEmpty.errCode,
      errMessage: Error.GiftListEmpty.errMessage,
    });
  }

  const giftList = userGiftList.giftList;
  let list = [];
  if (giftList.length == 0 || !giftList) {
    return res.status(400).json({
      errCode: Error.GiftListEmpty.errCode,
      errMessage: Error.GiftListEmpty.errMessage,
    });
  }

  for (const gift of giftList) {
    const detail = await _getGiftById(gift);
    if (detail) {
      list.push(detail);
    } else {
      return res.status(400).json({
        errCode: Error.GiftNotFound.errCode,
        errMessage: Error.GiftNotFound.errMessage,
      });
    }
  }

  res.status(200).json(_newSuccess({ list }));
});

const exchangeGift = catchAsync(async (req, res) => {
  const { userId, point } = req.user;
  const { giftId } = req.body;

  const cookies = cookie.parse(req.headers.cookie || "");
  const jt = cookies["user_jwt"];
  const it = cookies["user_data"];

  try {
    const gift = await _getGiftById(giftId);

    if (gift.point > point) {
      return res.status(400).json({
        errCode: Error.InsufficientPoint.errCode,
        errMessage: Error.InsufficientPoint.errMessage,
      });
    }

    const result = await _exchangeGift(userId, giftId);

    if (result.modifiedCount == 0) {
      return res.status(400).json({
        errCode: Error.AlreadyExchangeGift.errCode,
        errMessage: Error.AlreadyExchangeGift.errMessage,
      });
    }

    const remainingPoint = point - gift.point;
    await _updateUserById(userId, { point: remainingPoint });

    const newJwtToken = _updateJwtToken(jt, { point: remainingPoint });
    const newInfoToken = _updateInfoToken(JSON.parse(it), {
      point: remainingPoint,
    });

    // Set the JWT token as an HttpOnly and Secure cookie
    res.cookie("user_jwt", newJwtToken, {
      httpOnly: true,
      sameSite: "Strict", // Helps mitigate CSRF attacks
      maxAge: process.env.TOKEN_AGE,
    });

    // Optionally, set user-related data (non-HTTPOnly)
    res.cookie("user_data", JSON.stringify(newInfoToken), {
      sameSite: "Strict",
      maxAge: process.env.TOKEN_AGE,
    });

    return res.status(200).json(_newSuccess);
  } catch (error) {
    return res.status(400).json({
      errCode: Error.ExchangeGiftError.errCode,
      errMessage: Error.ExchangeGiftError.errMessage,
    });
  }
});

export default {
  getAllUserGift,
  exchangeGift,
};
