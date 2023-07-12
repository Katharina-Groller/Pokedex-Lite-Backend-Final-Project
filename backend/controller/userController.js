const { createUser } = require("../model/userModel");
// const{createToken}=require("")

async function httpCreateUser(req, res, next) {
    try {
        const userData = req.body;
        const newUser = await createUser(userData);
        res.json(newUser);
    } catch (error) {
        next(error);
    }
}
module.exports = { httpCreateUser };
