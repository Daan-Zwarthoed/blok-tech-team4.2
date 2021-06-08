let userSelf = '';
let userOther = '';
let filteredUsers = [];
let userObject = {};

const sortAlphabets = function (text) {
    return text.sort();
};

const Conversation = require('../models/Conversation');
const User = require('../models/User');
const server = require('../../server');

function updateUsers(req, res) {
    return User.findById(req.params.userId, (err, user) => {
        if (err) throw err;
        userObject = user;
        userSelf = user.username;
        if (req.body.userOther) userOther = req.body.userOther;
    });
}

const chatHome = async (req, res) => {
    await updateUsers(req, res);
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
    await updateUsers(req, res);
    if (!userOther || userOther === userSelf) return res.redirect(`/chat/${req.params.userId}`);
    server.socket.joinRoomServer({ userSelf, userOther });
    Conversation.findOne({
        users: sortAlphabets([userOther, userSelf]),
    }).then((result) => {
        if (result.length === 0) {
            const conversationData = new Conversation({
                users: sortAlphabets([userOther, userSelf]),
            });
            conversationData.save();
        }
        const messages = result[0] ? result[0].messages : [];
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
    await updateUsers(req, res);
    server.socket.chatMessageServer({ userSelf, userOther, message: req.body.message });
    res.redirect(`/chat/chatSelf/${req.params.userId}`);
};

module.exports = { chatHome, chatSelf, chatMessageReceived };
