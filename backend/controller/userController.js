const { createUser, findAllUser } = require("../model/userModel");
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
async function httpFindAllUser(req, res) {
    const users = await findAllUser();
    res.json(users);
}
module.exports = { httpCreateUser, httpFindAllUser };
