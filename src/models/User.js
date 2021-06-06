// User Schema
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
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
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
