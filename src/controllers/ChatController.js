let userSelf = '';
let userOther = '';
let message = '';
let users = [];

const sortAlphabets = function(text) {
    return text.sort();
};

const Conversation = require('../models/Conversation');
const User = require('../models/User');

const chatHome = (req, res) => {
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

const chatSelf = async(req, res) => {
    User.findById(req.params.userId, (err, user) => {
        if (err) throw err;
        userSelf = user.username;
    }).then(() => {
        if (req.body.userOther) userOther = req.body.userOther;

        if (!userOther || userOther === userSelf) return res.redirect(`/chat/${req.params.userId}`);
        Conversation.find({
                users: sortAlphabets([userOther, userSelf]),
            })
            .then(async(results) => {
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
    Conversation.findOneAndUpdate({
        users: sortAlphabets([userOther, userSelf]),
    }, {
        $push: {
            messages: {
                userSender: userSelf,
                message,
            },
        },
    }, {
        upsert: true,
    }).then(() => {
        res.redirect(`/chat/chatSelf/${req.params.userId}`);
    });
};

module.exports = { chatHome, chatSelf, chatMessageReceived };