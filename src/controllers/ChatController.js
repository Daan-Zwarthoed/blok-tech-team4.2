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
    return User.findById(req.user.id, (err, user) => {
        if (err) throw err;
        userObject = user;
        userSelf = user.username;
        if (req.body.userOther) userOther = req.body.userOther;
    });
}

const chatHome = async (req, res) => {
    await updateUsers(req);
    User.find().then((results) => {
        filteredUsers = results.filter((user) => user.id !== req.user.id);
        filteredUsers = filteredUsers.filter(
            (user) => userObject.likedBy.includes(user.username) && user.likedBy.includes(userSelf)
        );
        res.render('pages/chat/chatList.njk', {
            user: userObject,
            users: filteredUsers,
        });
    });
};

const chatSelf = async (req, res) => {
    await updateUsers(req);
    if (!userOther || userOther === userSelf) return res.redirect('/chat');
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
                userSelf,
                userOther,
                messages,
            });
        });
};

const chatMessageReceived = async (req, res) => {
    await updateUsers(req);
    chatHandler.messagesSend({ userSelf, userOther, message: req.body.message });
    res.redirect('/chat/chatSelf');
};

module.exports = { chatHome, chatSelf, chatMessageReceived };
