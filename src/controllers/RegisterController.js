const User = require('../models/User');

const getRegister = (req, res) => {
    console.log('test')
    res.render("register.njk");
}

const registerUser = (req, res) => {
    console.log(req.body);
    res.render("register.njk")
}

module.exports = { getRegister, registerUser };