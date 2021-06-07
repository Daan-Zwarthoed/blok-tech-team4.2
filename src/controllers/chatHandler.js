const sortAlphabets = function (text) {
    return text.split('').sort().join('');
};

const Conversation = require('../models/Conversation');

module.exports = {
    joinRoom(socket, message) {
        socket.join(sortAlphabets(`${message.userSelf}${message.userOther}`));
    },

    messagesSend(io, message) {
        Conversation.findOneAndUpdate(
            {
                conversationName: sortAlphabets(`${message.userSelf}${message.userOther}`),
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
            io.to(sortAlphabets(`${message.userSelf}${message.userOther}`)).emit('chat message', {
                message: message.message,
                userSender: message.userSelf,
            });
        });
    },
};
