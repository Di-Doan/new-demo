import { Schema, model } from "mongoose";

const OtpSchema = new Schema({
    email: {
        type: String,
        require: true
    },
    otp: {
        type: Number,
        require: true
    }
})

export default model('otp',OtpSchema)