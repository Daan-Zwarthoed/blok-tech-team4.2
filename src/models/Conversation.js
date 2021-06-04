// Conversation Schema
const mongoose = require("mongoose");

const ConversationSchema = mongoose.Schema({
  conversationName: {
    type: String,
  },
  user1: {
    type: String,
  },
  user2: {
    type: String,
  },
  messages: [
    {
      message: {
        type: String,
      },
      userSender: {
        type: String,
      },
    },
  ],
});

const Conversation = mongoose.model("Conversation", ConversationSchema);

module.exports = Conversation;
