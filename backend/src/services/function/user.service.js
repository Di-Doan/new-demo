import UserModel from '../../models/user.model.js'
import { genSaltSync, hash } from 'bcrypt'

// create user
const createUser = async(username, name, password, email, point) => {
    const salt = genSaltSync(10)  
    const hashedPassword = await hash(password, salt)
    const newUser = new UserModel({
        username,
        name,
        hashedPassword,
        email,
        point
    })
    const result = newUser.save()
    return result
}

// get all user
const getAllUser = async() => {
    const result = await UserModel.aggregate([
        {
            $lookup: {
                from: 'user_roles',
                localField: 'email',
                foreignField: 'email',
                as: 'role_info'
            }
        },
        {
            $unwind: {
                path: '$role_info',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                _id: 1,
                name: 1,
                password: '$email', 
                username: 1,
                email: 1,
                point: 1,
                role: '$role_info.role'
            }
        }
    ])
    return result
}

// get user by id
const getUserById = async(userId) => {
    const result = await UserModel.findById(userId)
    return result
}

// get user by email
const getUserByEmail = async(userEmail) => {
    const result = await UserModel.findOne({email: userEmail})
    return result
}

// update user by id
const updateUserById = async(userId, updatedInfo) => {
    const result = await UserModel.findOneAndUpdate( {_id: userId}, updatedInfo)
    return result
}

// update user by email
const updateUserByEmail = async(userEmail, updatedInfo) => {
    const result = await UserModel.findOneAndUpdate({email: userEmail}, updatedInfo)
    return result
}

// delete user by id
const deleteUserById = async(userId) => {
    const result = await UserModel.findByIdAndDelete(userId)
    return result
}

export default {
    createUser,
    getAllUser,
    getUserById,
    getUserByEmail,
    updateUserById,
    updateUserByEmail,
    deleteUserById
}