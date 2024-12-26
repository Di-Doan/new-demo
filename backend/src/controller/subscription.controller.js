import responseService from "../services/response/response.service.js";
import catchAsync from "../utils/catchAsync.js";
import subscriptionService from "../services/function/subscription.service.js";
import Error from "../config/Error.js";

const {
    newSuccess: _newSuccess,
    newError: _newError
  } = responseService

const {
  getAllSubscription: _getAllSubscription,
  deleteSubscriptionById: _deleteSubscriptionById,
} = subscriptionService;

const getAllSubscription = catchAsync(async (req, res) => {
  const result = await _getAllSubscription();
  return res.status(200).json(_newSuccess({ result }));
});

const deleteSubscriptionById = catchAsync(async (req, res) => {
  const { subscriptionId } = req.params;
  const result = await _deleteSubscriptionById(subscriptionId);
  return res.status(200).json(_newSuccess({ result }));
});

const deleteMultipleSubscription = catchAsync(async (req, res) => {
  const subscriptionList = req.body;

  for (const subscription of subscriptionList) {
    await _deleteSubscriptionById(subscription._id);
  }
  return res.status(200).json(_newSuccess());
});

export default {
    getAllSubscription,
    deleteSubscriptionById,
    deleteMultipleSubscription,
}