import SubscriptionModel from "../../models/subscription.model.js";

const createNewSubscription = async(userEmail) => {
    const newSubcription = new SubscriptionModel({
      userEmail,
    });
    const result = newSubcription.save();
    return result
}

const getAllSubscription = async()=> {
    const result = await SubscriptionModel.find({}) 
    return result
}

const deleteSubscriptionById = async(subscriptionId) => {
    const result = await SubscriptionModel.findByIdAndDelete(subscriptionId);
    return result
}

const getSubscriptionByEmail = async(userEmail) => {
    const result = await SubscriptionModel.findOne({userEmail: userEmail})
    return result
}

export default {
    createNewSubscription,
    getAllSubscription,
    deleteSubscriptionById,
    getSubscriptionByEmail
}
 
