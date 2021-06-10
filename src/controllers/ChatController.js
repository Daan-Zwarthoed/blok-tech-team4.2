let userSelf = '';
let userOther = '';
let filteredUsers = [];
let userObject = {};
let messages = [];

const sortAlphabets = function (text) {
    return text.sort();
};

const Conversation = require('../models/Conversation');
const User = require('../models/User');
const chatHandler = require('./chatHandler');

function updateUsers(req) {
    return User.findById(req.params.userId, (err, user) => {
        if (err) throw err;
        userObject = user;
        userSelf = user.username;
        if (req.body.userOther) userOther = req.body.userOther;
    });
}

const chatHome = async (req, res) => {
    await updateUsers(req);
    User.find().then((results) => {
        filteredUsers = results.filter((user) => user.id !== req.params.userId);
        res.render('pages/chat/chatList.njk', {
            user: userObject,
            userId: req.params.userId,
            users: filteredUsers,
        });
    });
};

const chatSelf = async (req, res) => {
    await updateUsers(req);
    if (!userOther || userOther === userSelf) return res.redirect(`/chat/${req.params.userId}`);
    Conversation.findOne({
        users: sortAlphabets([userOther, userSelf]),
    })
        .then((result) => {
            messages = [];
            if (!result) {
                const conversationData = new Conversation({
                    users: sortAlphabets([userOther, userSelf]),
                });
                conversationData.save();
            } else {
                messages = result.messages;
            }
        })
        .then(() => {
            res.render('pages/chat/chatSelf/chatSelf.njk', {
                user: userObject,
                userId: req.params.userId,
                userSelf,
                userOther,
                messages,
            });
        });
};

const chatMessageReceived = async (req, res) => {
    await updateUsers(req);
    chatHandler.messagesSend({ userSelf, userOther, message: req.body.message });
    res.redirect(`/chat/chatSelf/${req.params.userId}`);
};

module.exports = { chatHome, chatSelf, chatMessageReceived };
