const express = require("express");
const {
    httpCreatePokemon,
    httpAddPokemon,
    httpFindAllPokemon,
} = require("../controller/pokemonController");
const router = express.Router();

// /pokemon
router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});

// GET all Pokemon
// /pokemon/allPokemon
router.get("/allPokemon", httpFindAllPokemon);

// /pokemon/createPokemon
router.post("/createPokemon", httpCreatePokemon);

// Add Pokemon to user
// /pokemon/addPokemon
router.post("/addPokemon", httpAddPokemon);

module.exports = router;
