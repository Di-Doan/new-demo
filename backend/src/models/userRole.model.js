import { Schema, model } from "mongoose";

const UserRoleSchema = new Schema({
    email: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true
    }
})

export default model('user_role', UserRoleSchema)