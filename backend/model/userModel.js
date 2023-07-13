const mongoose = require("mongoose");
const { userSchema } = require("./userSchema");
const { UserRoles } = require("../lib/security/roles");
const { userNotFound } = require("../middleware/errorHandler");

//Model
//(Schnittstelle zur Datenbank)
//vorlage die definiert wie die daten deiner mongodb datenbank organisiert sein sollen.
//beschreibt die Eig. (Felder) der Daten und gibt an, wie sie gespeichert, abgerufen und aktualisiert werden können.
//Modell erlaubt mit der Datenbank auf eine einfachere und strukturiertere Weise zu interagieren.
//schema muss definiert werden um ein model zu erstellen
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

//Find Single User
async function findSingleUser(id) {
    await userNotFound(User, id);
    return await User.findById(id);
}

//Update User
async function updateUser(id, data) {
    await userNotFound(User, id);
    return await User.findOneAndUpdate({ _id: id }, data, { new: true });
}

//Delete User
async function deleteUser(User, id) {
    const user = await userNotFound(User, id);
    if (user.role !== UserRoles.ADMIN) {
        const error = new Error("Keine Berechtigung");
        error.statusCode = 403;
        throw error;
    }
    await User.findOneAndDelete({ _id: id });
}

async function authenticateUser(username, password) {
    console.log("ander", username, password);
    const user = await User.findOne({ username });
    console.log("User:", user);
    if (!user) {
        return null;
    }
    const passwortValid = await user.authenticate(password);
    console.log("password:", passwortValid);
    if (!passwortValid) {
        return null;
    }
    return user;
}
module.exports = {
    User,
    createUser,
    findAllUser,
    findSingleUser,
    updateUser,
    deleteUser,
    authenticateUser,
};
