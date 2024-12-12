import UserRoleSchema from "../../models/userRole.model.js";

const getRoleByEmail = async (userEmail) => {
  const result = await UserRoleSchema.findOne({ email: userEmail });
  return result;
};

const createRole = async (email, role) => {
  const newRole = new UserRoleSchema({
    email,
    role,
  });
  const result = newRole.save();
  return result;
};

const updateRoleByEmail = async (email, updatedInfo) => {
    const result = await UserRoleSchema.findOneAndUpdate(email, updatedInfo)
    return result
};

const deleteRoleByEmail = async (email) => {
    const result = await UserRoleSchema.findOneAndDelete({email: email})
    return result
}

export default {
  getRoleByEmail,
  createRole,
  updateRoleByEmail,
  deleteRoleByEmail
};
