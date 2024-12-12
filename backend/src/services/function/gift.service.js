import GiftModel from '../../models/gift.model.js'

// create gift
const createGift = async(img, name, start_date, end_date, point, isHot) => {
    const newGift = new GiftModel({
        img,
        name,
        start_date,
        end_date,
        point,
        isHot
    })

    const result = newGift.save()
    return result
}

// get all gift
const getAllGift = async() => {
    const result = await GiftModel.find({})
    return result
}

// get gift by id
const getGiftById = async(giftId) => {
    const result = await GiftModel.findById(giftId)
    return result
}

// update gift
const updateGiftById = async(giftId, updatedInfo) => {
    const result = await GiftModel.findOneAndUpdate({_id: giftId}, updatedInfo)
    return result
}

// delete gift
const deleteGiftById = async(giftId) => {
    const result = await GiftModel.findByIdAndDelete(giftId)
    return result
}

export default {
    createGift,
    getAllGift,
    getGiftById,
    updateGiftById,
    deleteGiftById,
}


