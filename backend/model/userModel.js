const mongoosee = require("mongoose");
const { userSchema } = require("./userSchema");
const { UserRoles } = require("../lib/security/roles");
// const {userNotFound}= require("")

//Model
const User = mongoose.model("User", userSchema);

//async functions

async function createUser(userData) {
    return await User.create(userData);
}

module.exports = { createUser };
