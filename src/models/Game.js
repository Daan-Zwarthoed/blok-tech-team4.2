// User Schema
const { ObjectId } = require("bson");
const mongoose = require("mongoose");

const GameSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    genres: {
        type: [String],
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    likedBy: {
        type: [ObjectId],
    },
});

const Game = mongoose.model("Game", GameSchema);

module.exports = Game;
