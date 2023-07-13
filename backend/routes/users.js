const express = require("express");
const {
    httpCreateUser,
    httpFindAllUser,
    httpFindSingleUser,
    httpUpdateUser,
    httpDeleteUser,
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
//todo: authenticate token with .use(auth.token)
router
    .route("/:id")
    .get(httpFindSingleUser)
    .put(httpUpdateUser)
    .delete(httpDeleteUser);

module.exports = router;
