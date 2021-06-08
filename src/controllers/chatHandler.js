const sortAlphabets = function (text) {
<<<<<<< HEAD
=======
    return text.sort();
};

const sortAlphabetsString = function (text) {
>>>>>>> edacfea8cd600aad18db6cade70528f818b61310
    return text.split('').sort().join('');
};

const Conversation = require('../models/Conversation');

module.exports = {
    joinRoom(socket, message) {
<<<<<<< HEAD
        socket.join(sortAlphabets(`${message.userSelf}${message.userOther}`));
=======
        socket.join(sortAlphabetsString(`${message.userSelf}${message.userOther}`));
>>>>>>> edacfea8cd600aad18db6cade70528f818b61310
    },

    messagesSend(io, message) {
        Conversation.findOneAndUpdate(
            {
<<<<<<< HEAD
                conversationName: sortAlphabets(`${message.userSelf}${message.userOther}`),
=======
                users: sortAlphabets([message.userOther, message.userSelf]),
>>>>>>> edacfea8cd600aad18db6cade70528f818b61310
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
<<<<<<< HEAD
            io.to(sortAlphabets(`${message.userSelf}${message.userOther}`)).emit('chat message', {
=======
            io.to(sortAlphabetsString(`${message.userSelf}${message.userOther}`)).emit('chat message', {
>>>>>>> edacfea8cd600aad18db6cade70528f818b61310
                message: message.message,
                userSender: message.userSelf,
            });
        });
    },
};
