let userSelf = '';
let userOther = '';
let message = '';
let users = [];

const sortAlphabets = function (text) {
<<<<<<< HEAD
    return text.split('').sort().join('');
=======
    return text.sort();
>>>>>>> edacfea8cd600aad18db6cade70528f818b61310
};

const Conversation = require('../models/Conversation');
const User = require('../models/User');

const chatHome = (req, res) => {
<<<<<<< HEAD
    res.render('pages/chat/chatList.njk', { users });
};

const chatSelf = async (req, res) => {
    if (req.body.userSelf) userSelf = req.body.userSelf;
    if (req.body.userOther) userOther = req.body.userOther;
    if (req.body.message) message = req.body.message;

    Conversation.find({
        conversationName: sortAlphabets(`${userSelf}${userOther}`),
    })
        .then(async (results) => {
            if (!results.length) {
                const conversationData = new Conversation({
                    conversationName: sortAlphabets(`${userSelf}${userOther}`),
                    user1: userOther,
                    user2: userSelf,
                });
                conversationData.save();
            }
        })
        .then(() => {
            Conversation.find({
                conversationName: sortAlphabets(`${userSelf}${userOther}`),
            }).then((results) => {
                let messages = [];
                if (results[0]) messages = results[0].messages;

                res.render('pages/chat/chatSelf/chatSelf.njk', {
                    userSelf,
                    userOther,
                    messages,
                });
            });
        });
};

const chatMessageReceived = (req, res) => {
    userSelf = req.body.userSelf;
    userOther = req.body.userOther;
    message = req.body.message;
    Conversation.findOneAndUpdate(
        {
            conversationName: sortAlphabets(`${userSelf}${userOther}`),
=======
    User.find().then((results) => {
        users = results;
    });
    User.findById(req.params.userId, (err, results) => {
        if (err) throw err;
        const filteredUsers = users.filter((user) => user.username !== results.username);
        res.render('pages/chat/chatList.njk', {
            user: results,
            userId: req.params.userId,
            users: filteredUsers,
        });
    });
};

const chatSelf = async (req, res) => {
    User.findById(req.params.userId, (err, user) => {
        if (err) throw err;
        userSelf = user.username;
    }).then(() => {
        if (req.body.userOther) userOther = req.body.userOther;

        if (!userOther || userOther === userSelf) return res.redirect(`/chat/${req.params.userId}`);
        Conversation.find({
            users: sortAlphabets([userOther, userSelf]),
        })
            .then(async (results) => {
                if (results.length === 0) {
                    const conversationData = new Conversation({
                        users: sortAlphabets([userOther, userSelf]),
                    });
                    conversationData.save();
                }
            })
            .then(() => {
                Conversation.find({
                    users: sortAlphabets([userOther, userSelf]),
                }).then((result) => {
                    let messages = [];
                    if (result[0]) messages = result[0].messages;
                    User.findById(req.params.userId, (err, results) => {
                        if (err) throw err;
                        res.render('pages/chat/chatSelf/chatSelf.njk', {
                            user: results,
                            userId: req.params.userId,
                            userSelf,
                            userOther,
                            messages,
                        });
                    });
                });
            });
    });
};

const chatMessageReceived = (req, res) => {
    message = req.body.message;
    Conversation.findOneAndUpdate(
        {
            users: sortAlphabets([userOther, userSelf]),
>>>>>>> edacfea8cd600aad18db6cade70528f818b61310
        },
        {
            $push: {
                messages: {
                    userSender: userSelf,
                    message,
                },
            },
        },
        {
            upsert: true,
        }
    ).then(() => {
<<<<<<< HEAD
        res.redirect('/chat/chatSelf');
=======
        res.redirect(`/chat/chatSelf/${req.params.userId}`);
>>>>>>> edacfea8cd600aad18db6cade70528f818b61310
    });
};

module.exports = { chatHome, chatSelf, chatMessageReceived };
