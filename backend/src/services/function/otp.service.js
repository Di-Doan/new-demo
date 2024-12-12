import OtpModel from "../../models/otp.model.js"

const createOtp = async(email, otp) => {
    const newOtp = new OtpModel({
        email,
        otp
    })
    const result = newOtp.save()
    return result
}

const getOtpByEmail = async(email) => {
    const result = await OtpModel.findOne({email})
    return result
}

const deleteOtpByEmail = async(email) => {
    const result = await OtpModel.findOneAndDelete({email: email})
    return result
}

export default {
    createOtp,
    getOtpByEmail,
    deleteOtpByEmail
}