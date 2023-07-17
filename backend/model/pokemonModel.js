const mongoose = require("mongoose");
const { pokemonSchema, availablePokemonSchema } = require("./pokemonSchema");
const { User } = require("./userModel");
const UserRoles = require("../lib/security/roles")

//Model
const Pokemon = mongoose.model("Pokemon", pokemonSchema);
const availablePokemon = mongoose.model(
    "AvailablePokemon",
    availablePokemonSchema
);

//async functions

//Create Pokemon
async function createPokemon(pokemonData) {
    return await Pokemon.create(pokemonData);
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
        { pokemonList: user.pokemonList }
    );
}

// async function deletePokemon(name) {
//     const user = await User.findById(id);
//     if (user.role !== UserRoles.ADMIN) {
//         const error = new Error("Unzureichende Berechtigungen");
//         error.statusCode = 403;
//         throw error
//     }

// }

//exports
module.exports = { createPokemon, addPokemon };
