const { createPokemon, addPokemon } = require("../model/pokemonModel");

async function httpCreatePokemon(req, res, next) {
    try {
        const pokemonData = req.body;
        const newPokemon = await createPokemon(pokemonData);
        res.json(newPokemon);
    } catch (error) {
        next(error);
    }
}
async function httpAddPokemon(req, res, next) {
    try {
        const { name, id } = req.body;
        const availablePokemon = await addPokemon(name, id);
        console.log("avail:", availablePokemon);
        if (!availablePokemon) {
            return res.status(400).send({ message: "Invalid pokemon" });
        }
        res.json(availablePokemon);
        console.log(availablePokemon);
    } catch (error) {
        next(error);
    }
}

module.exports = { httpCreatePokemon, httpAddPokemon };