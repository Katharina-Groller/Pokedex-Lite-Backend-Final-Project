const express = require("express");
const {
    httpCreateUser,
    httpFindAllUser,
} = require("../controller/userController");
const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});

/* GET all User */
//ToDo: token implement and admin rights implement
router.get("/allUser", httpFindAllUser);

/* GET all Pokemon */

/* SIGNUP (CreateUser) */
//ToDO: InputValidation implement
router.post("/signup", httpCreateUser);

/* Login */

/* GET Single User (by ID) */

module.exports = router;
