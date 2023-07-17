const express = require("express");
const {
    httpCreatePokemon,
    httpAddPokemon,
} = require("../controller/pokemonController");
const router = express.Router();

router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});

// /pokemon/createPokemon
router.post("/createPokemon", httpCreatePokemon);

router.post("/addPokemon", httpAddPokemon);

module.exports = router;
