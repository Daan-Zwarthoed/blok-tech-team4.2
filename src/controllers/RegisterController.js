const User = require('../models/User');

const getRegister = (req, res) => {
    res.render("register.njk");
}

const registerUser = (req, res) => {
    res.render("register.njk")
}

module.exports = { getRegister, registerUser };
