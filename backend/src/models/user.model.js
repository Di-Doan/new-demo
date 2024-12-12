import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    name: {
        type: String,
        require: true,
        unique: true
    },
    hashedPassword: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    point: {
        type: Number,
        require: true,
    }
})

export default model("user", UserSchema)