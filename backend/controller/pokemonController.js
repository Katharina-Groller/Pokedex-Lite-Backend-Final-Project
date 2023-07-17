const { userNotFound } = require("../middleware/errorHandler");
const {
    createPokemon,
    findAllPokemon,
    findSinglePokemon,
    addPokemon,
} = require("../model/pokemonModel");

//Create Pokemon
async function httpCreatePokemon(req, res, next) {
    try {
        const pokemonData = req.body;
        const newPokemon = await createPokemon(pokemonData);
        res.json(newPokemon);
    } catch (error) {
        next(error);
    }
}
//find All Pokemon
async function httpFindAllPokemon(req, res) {
    const pokemons = await findAllPokemon();
    res.json(pokemons);
}

//Find Single Pokemon
async function httpFindSinglePokemon(req, res, next) {
    try {
        const { name } = req.params;
        const pokemon = await findSinglePokemon(name);
        res.json(pokemon);
    } catch (error) {
        next(error);
    }
}

// Add Pokemon
async function httpAddPokemon(req, res, next) {
    try {
        const { name, id } = req.body;
        const availablePokemon = await addPokemon(name, id);
        if (!availablePokemon) {
            return res.status(400).send({ message: "Pokemon nicht vorhanden" });
        }
        res.json(availablePokemon);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    httpCreatePokemon,
    httpFindAllPokemon,
    httpFindSinglePokemon,
    httpAddPokemon,
};
