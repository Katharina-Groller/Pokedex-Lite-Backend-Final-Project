const {
    createUser,
    findAllUser,
    findSingleUser,
    updateUser,
} = require("../model/userModel");
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
async function httpFindSingleUser(req, res, next) {
    try {
        const { id } = req.params;
        const user = await findSingleUser(id);
        res.json(user);
    } catch (error) {
        next(error);
    }
}
async function httpUpdateUser(req, res, next) {
    try {
        const { id } = req.params;
        const updatedUser = await updateUser(id, req.body);
        res.json(updatedUser);
    } catch (error) {
        next(error);
    }
}
module.exports = {
    httpCreateUser,
    httpFindAllUser,
    httpFindSingleUser,
    httpUpdateUser,
};
