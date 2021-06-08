// Conversation Schema
const mongoose = require('mongoose');

const ConversationSchema = mongoose.Schema({
    users: {
        type: Array,
        required: true,
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
