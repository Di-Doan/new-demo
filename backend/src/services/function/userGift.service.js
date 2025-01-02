import UserGiftModel from "../../models/userGift.model.js";

const createUserGiftList = async (userId) => {
  const newUserGiftList = new UserGiftModel({
    userId: userId,
    giftList: [],
  });
  const result = newUserGiftList.save();
  return result;
};

const getAllUserGift = async (userId) => {
  const result = await UserGiftModel.findOne({ userId: userId });
  return result;
};

const exchangeGift = async (userId, giftId) => {
  try {
    const result = await UserGiftModel.updateOne(
      { userId: userId },
      { $addToSet: { giftList: giftId } }
    );
    return result;
  } catch (error) {
    throw error;
  }
};

const deleteUserGiftByUserId = async (userId) => {
  try {
    const result = await UserGiftModel.findOneAndDelete({ userId: userId });
    return result;
  } catch (error) {
    throw error;
  }
};

export default {
  createUserGiftList,
  getAllUserGift,
  exchangeGift,
  deleteUserGiftByUserId,
};
