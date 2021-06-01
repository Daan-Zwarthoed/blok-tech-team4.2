<<<<<<< HEAD
const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const getRegister = (req, res) => {
    console.log("test");
    res.render("register.njk");
};

const registerUser = (req, res) => {
    // Look if the email is already registered
    const { name, email, password } = req.body;
    User.findOne({ name: name }).then((result) => {
        // If name is already registered
        if (result) {
            res.render("register.njk");
        } else {
            const addUser = new User({
                name,
                email,
                password,
            });

            bcrypt.hash(addUser.password, saltRounds, (err, hash) => {
                if (err) throw err;
                addUser.password = hash;
                addUser.save();
                res.redirect("/");
            });
        }
    });
    console.log(req.body);
};
=======
const User = require('../models/User');

const getRegister = (req, res) => {
    res.render("register.njk");
}

const registerUser = (req, res) => {
    res.render("register.njk")
}
>>>>>>> 6d660cfb92befd0c70b99049ef3ae0acfe71f845

module.exports = { getRegister, registerUser };
