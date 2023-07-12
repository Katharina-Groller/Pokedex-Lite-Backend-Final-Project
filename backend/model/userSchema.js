//Imports
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//File Imports
const UserRoles = require("../lib/security/roles");

//User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: Object.values(UserRoles),
        default: UserRoles.USER,
    },
});

module.exports = { userSchema };
