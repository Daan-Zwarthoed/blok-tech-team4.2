const sortAlphabets = function (text) {
    return text.sort();
};

const sortAlphabetsString = function (text) {
    return text.split('').sort().join('');
};

const Conversation = require('../models/Conversation');

let ioCopy;

module.exports = {
    defineIo(io) {
        ioCopy = io;
    },

    joinRoom(message, socket) {
        if (socket) {
            socket.join(sortAlphabetsString(`${message.userSelf}${message.userOther}`));
        }
    },

    messagesSend(message, io) {
        Conversation.findOneAndUpdate(
            {
                users: sortAlphabets([message.userOther, message.userSelf]),
            },
            {
                $push: {
                    messages: {
                        userSender: message.userSelf,
                        message: message.message,
                    },
                },
            },
            {
                upsert: true,
            }
        ).then(() => {
            if (io) ioCopy = io;
            if (ioCopy) {
                ioCopy.to(sortAlphabetsString(`${message.userSelf}${message.userOther}`)).emit('chat message', {
                    message: message.message,
                    userSender: message.userSelf,
                });
            }
        });
    },
};
