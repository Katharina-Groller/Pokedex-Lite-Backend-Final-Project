const mongoose = require("mongoose");

const pokemonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        // unique: true,
    },
    kp: {
        type: Number,
        required: true,
    },
    mp: {
        type: Number,
        required: true,
    },
    attacks: {
        // light: {
        //     type: Array,
        // },
        // medium: {
        //     type: Array,
        // },
        // strong: {
        //     type: Array,
        // },
    },
});

const availablePokemonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        // unique: true,
    },
    kp: {
        type: Number,
        required: true,
    },
    mp: {
        type: Number,
        required: true,
    },
    attacks: {
        // light: {
        //     type: Array,
        // },
        // medium: {
        //     type: Array,
        // },
        // strong: {
        //     type: Array,
        // },
    },
});

module.exports = { pokemonSchema, availablePokemonSchema };
