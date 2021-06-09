const sortAlphabets = function(text) {
    return text.sort();
};

const sortAlphabetsString = function(text) {
    return text.split('').sort().join('');
};

const Conversation = require('../models/Conversation');

module.exports = {
    joinRoom(socket, message) {
        socket.join(sortAlphabetsString(`${message.userSelf}${message.userOther}`));
    },

    messagesSend(io, message) {
        Conversation.findOneAndUpdate({
            users: sortAlphabets([message.userOther, message.userSelf]),
        }, {
            $push: {
                messages: {
                    userSender: message.userSelf,
                    message: message.message,
                },
            },
        }, {
            upsert: true,
        }).then(() => {
            io.to(sortAlphabetsString(`${message.userSelf}${message.userOther}`)).emit('chat message', {
                message: message.message,
                userSender: message.userSelf,
            });
        });
    },
};