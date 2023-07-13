const express = require("express");
const {
    httpCreateUser,
    httpFindAllUser,
    httpFindSingleUser,
    httpUpdateUser,
    httpDeleteUser,
    httpAuthenticateUser,
} = require("../controller/userController");
const {
    authenticateToken,
    protectAdminRoute,
} = require("../middleware/userValidation");
const { validationInputs } = require("../middleware/inputValidation");
const { userValidationRules } = require("../lib/rules/userRules");
const router = express.Router();

/* GET users listing. */
// /users
router.get("/", authenticateToken, function (req, res, next) {
    res.send("respond with a resource");
});

/* GET all User */
// /users/allUser
router.get("/allUser", authenticateToken, protectAdminRoute, httpFindAllUser);

/* SIGNUP (CreateUser) */
router.post(
    "/signup",
    validationInputs(userValidationRules.signup),
    httpCreateUser
);

/* Login */
router.post(
    "/login",
    validationInputs(userValidationRules.login),
    httpAuthenticateUser
);

/* GET Single User (by ID) */
router
    .use(authenticateToken)
    .route("/:id")
    .get(httpFindSingleUser)
    .put(httpUpdateUser)
    .delete(httpDeleteUser);
//------------------------------

/* GET all Pokemon */

module.exports = router;
