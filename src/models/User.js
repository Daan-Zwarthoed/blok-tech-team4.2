// User Schema
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    displayname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    banner: {
        type: String,
        required: true,
    },
    likedBy: {
        type: [String],
        unique: true,
    },
    dislikedBy: {
        type: [String],
        unique: true,
    },
    description: {
        type: String,
    },
    topGame: {
        type: String,
    },
    time: {
        type: String,
    },
    playstyle: {
        type: String,
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
