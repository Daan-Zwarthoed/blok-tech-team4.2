let sortAlphabets = function (text) {
  return text.split("").sort().join("");
};

const Conversation = require("./src/models/Conversation");

module.exports = {
  joinRoom: function (socket, message) {
    socket.join(sortAlphabets(`${message.userSelf}${message.userOther}`));
  },

  messagesSend: function (io, message) {
    Conversation.findOneAndUpdate(
      {
        conversationName: sortAlphabets(
          `${message.userSelf}${message.userOther}`
        ),
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
      io.to(sortAlphabets(`${message.userSelf}${message.userOther}`)).emit(
        "chat message",
        { message: message.message, userSender: message.userSelf }
      );
    });
  },
};
