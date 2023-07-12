const mongoose = require("mongoose");


const pokemonSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    kp: {
        type: Number,
        require: true
    },
    mp: {
        type: Number,
        require: true
    },
    attacks: {
        light: {
            type: Array,
        },
        medium: {
            type: Array
        },
        strong: {
            type: Array
        },
        require: true
    },
});


module.exports = { pokemonSchema }

