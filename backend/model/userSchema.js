//Imports
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//File Imports
const { UserRoles } = require("../lib/security/roles");

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

userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 10);
    }

    next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
    const update = this.getUpdate();
    if (update.password) {
        try {
            const hashedPassword = await bcrypt.hash(update.password, 10);
            this.setUpdate({ password: hashedPassword });
        } catch (error) {
            return next(error);
        }
    }

    next();
});

//wird verwendet um das eingegebene Passwort mit dem verschlü. passwort des benutzers zu vergleichen
userSchema.methods.authenticate = async function (password) {
    const user = this;
    return await bcrypt.compare(password, user.password);
};

//wird verwendet um das Passwort aus dem Benutzerobjekt zu entfernen.
//Ohne ist ein sicherheitsrisiko, wenn passwort dann an den client geschickt wird so verhindern wir dies.
//passwort verschwindet (im ThunderClient) beim abrufen/get.
userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    return user;
};

module.exports = { userSchema };
