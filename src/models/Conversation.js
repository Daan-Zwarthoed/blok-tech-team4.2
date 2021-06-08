// Conversation Schema
const mongoose = require('mongoose');

const ConversationSchema = mongoose.Schema({
<<<<<<< HEAD
    conversationName: {
        type: String,
    },
    user1: {
        type: String,
    },
    user2: {
        type: String,
=======
    users: {
        type: Array,
        required: true,
>>>>>>> edacfea8cd600aad18db6cade70528f818b61310
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

const Conversation = mongoose.model('Conversation', ConversationSchema);

module.exports = Conversation;
