import { Schema, model } from "mongoose";

const ContactModel = new Schema({
    name: {
        type: String,
        require:true
    },
    email: {
        type: String,
        require:true
    },
    title: {
        type: String,
        require:true
    },
    note: {
        type: String
    }
})

export default model('contact', ContactModel)