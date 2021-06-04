const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const getRegister = (req, res) => {
    res.render("pages/home/register.njk");
};

const registerUser = (req, res) => {
    // Look if the email is already registered
    const { username, email, password } = req.body;
    User.findOne({ username: username }).then((result) => {
        // If username is already registered
        if (result) {
            res.render("pages/home/register.njk");
        } else {
            const addUser = new User({
                username,
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
};

module.exports = { getRegister, registerUser };
