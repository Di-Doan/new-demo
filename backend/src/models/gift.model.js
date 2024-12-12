import { Schema, model } from "mongoose";

const GiftSchema = new Schema({
    img: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    start_date: {
        type: String,
        require: true
    },
    end_date: {
        type: String,
        require: true
    },
    point: {
        type: Number,
        require: true
    },
    isHot: {
        type: Boolean,
        require: true
    }

})
export default model("gift", GiftSchema)