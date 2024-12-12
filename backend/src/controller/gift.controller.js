import giftService from "../services/function/gift.service.js";
import responseService from "../services/response/response.service.js";
import catchAsync from "../utils/catchAsync.js";

const {
  createGift: _createGift,
  getAllGift: _getAllGift,
  getGiftById: _getGiftById,
  updateGiftById: _updateGiftById,
  deleteGiftById: _deleteGiftById,
} = giftService;

const {
  newSuccess: _newSuccess,
  newError: _newError
} = responseService

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
  res.status(200).json(_newSuccess({ result }));
});

// get all gift
const getAllGift = catchAsync(async (req, res) => {
  const result = await _getAllGift();
  res.status(200).json(_newSuccess({ result }));
});

// get gift by id
const getGiftById = catchAsync(async (req, res) => {
  const { giftId } = req.params;
  const result = await _getGiftById(giftId);
  res.status(200).json(_newSuccess({ result }));
});

// update gift
const updateGiftById = catchAsync(async (req, res) => {
  const { giftId, updatedInfo } = req.body;
  const result = await _updateGiftById(giftId, updatedInfo);
  res.status(200).json(_newSuccess({ result }));
});

// delete gift by id
const deleteGiftById = catchAsync(async (req, res) => {
  const {giftId} = req.params
  const result = await _deleteGiftById(giftId);
  res.status(200).json(_newSuccess({ result }));
});

// delete multiple gift
const deleteMultipleGift = catchAsync(async(req, res)=> {
  const giftList  = req.body

  for (const gift of giftList) {
    await _deleteGiftById(gift._id)
  }
  res.status(200).json(_newSuccess());
})

export default {
  createGift,
  getAllGift,
  getGiftById,
  updateGiftById,
  deleteGiftById,
  deleteMultipleGift
};
  