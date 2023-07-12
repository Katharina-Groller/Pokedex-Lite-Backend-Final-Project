const mongoose = require("mongoose");
const { userSchema } = require("./userSchema");
const { UserRoles } = require("../lib/security/roles");
// const {userNotFound}= require("")

//Model
const User = mongoose.model("User", userSchema);

//async functions

//Create User
async function createUser(userData) {
    return await User.create(userData);
}
//Find all User
async function findAllUser() {
    return await User.find({});
}

module.exports = { createUser, findAllUser };
