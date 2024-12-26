import { Schema, model } from "mongoose";

const SubcriptionModel = new Schema({
    userEmail: {
        type: String,
        require: true
    }
})

export default model("subcription", SubcriptionModel)