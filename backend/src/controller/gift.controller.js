import giftService from "../services/function/gift.service.js";
import responseService from "../services/response/response.service.js";
import catchAsync from "../utils/catchAsync.js";
import Error from "../config/Error.js";

const {
  createGift: _createGift,
  getAllGift: _getAllGift,
  getGiftById: _getGiftById,
  updateGiftById: _updateGiftById,
  deleteGiftById: _deleteGiftById,
} = giftService;

const { newSuccess: _newSuccess, newError: _newError } = responseService;

// create gift
const createGift = catchAsync(async (req, res) => {
  const { img, name, start_date, end_date, point, isHot } = req.body;
  const result = await _createGift(
    img,
    name,
    start_date,
    end_date,
    point,
    isHot
  );
  return res.status(200).json(_newSuccess({ result }));
});

// get all gift
const getAllGift = catchAsync(async (req, res) => {
  try {
    const result = await _getAllGift();
    return res.status(200).json(_newSuccess({ result }));
  } catch (error) {
    return res.status(400).json({
      errCode: Error.FetchAllGiftUnsuccessful.errCode,
      errMessage: Error.FetchAllGiftUnsuccessful.errMessage,
    });
  }
});

// get gift by id
const getGiftById = catchAsync(async (req, res) => {
  const { giftId } = req.params;
  const result = await _getGiftById(giftId);
  return res.status(200).json(_newSuccess({ result }));
});

// update gift
const updateGiftById = catchAsync(async (req, res) => {
  const { giftId, updatedInfo } = req.body;
  const result = await _updateGiftById(giftId, updatedInfo);
  return res.status(200).json(_newSuccess({ result }));
});

// delete gift by id
const deleteGiftById = catchAsync(async (req, res) => {
  const { giftId } = req.params;
  const result = await _deleteGiftById(giftId);
  return res.status(200).json(_newSuccess({ result }));
});

// delete multiple gift
const deleteMultipleGift = catchAsync(async (req, res) => {
  const giftList = req.body;

  for (const gift of giftList) {
    await _deleteGiftById(gift._id);
  }
  return res.status(200).json(_newSuccess());
});

export default {
  createGift,
  getAllGift,
  getGiftById,
  updateGiftById,
  deleteGiftById,
  deleteMultipleGift,
};
