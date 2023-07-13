const express = require("express");
const router = express.Router();

/* GET home page. */
// res.render -> sendet den inhalt der index.html (weil wegen res,render "index")
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
});

module.exports = router;
