import { Schema, model } from "mongoose";

const UserGiftSchema = new Schema({
    userId: {
        type: String,
        require: true
    },

    giftList: [String]

})

export default model('user-gift', UserGiftSchema)