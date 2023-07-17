const mongoose = require("mongoose");
const { pokemonSchema } = require("./pokemonSchema");
const { User } = require("./userModel");
const { pokemonNotFound } = require("../middleware/errorHandler");

//Model
const Pokemon = mongoose.model("Pokemon", pokemonSchema);

//async functions

//Create Pokemon
async function createPokemon(pokemonData) {
    return await Pokemon.create(pokemonData);
}

//Find all Pokemon
async function findAllPokemon() {
    return await Pokemon.find({});
}

//Find Single User
async function findSinglePokemon(name) {
    const pokemon = await Pokemon.findOne({ name });
    if (pokemon === null) {
        const error = new Error("Pokemon existiert nicht");
        error.statusCode = 404;
        throw error;
    }
    return await Pokemon.findOne({ name });
}

//User add Pokemon
async function addPokemon(name, id) {
    //nutzer aus der datenbank holen über id
    const user = await User.findById(id);

    // basis werte aus der datenbank holen(das pokemon) über name
    const includePokemon = await Pokemon.findOne({ name });

    //schreib die basiswerte in das array vom nutzer
    user.pokemonList.push({
        name,
        kp: includePokemon.kp,
        mp: includePokemon.mp,
        attacks: includePokemon.attacks,
    });

    if (user.pokemonList === null) {
        return "Es gibt noch keine Pokemons in einer Sammlung";
    }

    //nutzer wieder in die datenbank speichern
    return await User.findOneAndUpdate(
        { _id: id },
        { pokemonList: user.pokemonList },
        { new: true } /* hinzugefügtes Pokemon wird auch angezeigt*/
    );
}

//exports
module.exports = {
    createPokemon,
    findAllPokemon,
    findSinglePokemon,
    addPokemon,
};
