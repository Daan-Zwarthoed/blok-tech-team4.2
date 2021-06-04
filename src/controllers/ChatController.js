const users = ["Henk", "Sam", "Daan"];

const Conversation = require("../models/Conversation");

let sortAlphabets = function (text) {
  return text.split("").sort().join("");
};

const chatHome = (req, res) => {
  res.render("pages/chat/chatList.njk", { users: users });
};

let userSelf = "";
let userOther = "";
let message = "";

const chatSelf = async (req, res) => {
  if (req.body.userSelf) userSelf = req.body.userSelf;
  if (req.body.userOther) userOther = req.body.userOther;
  if (req.body.message) message = req.body.message;

  Conversation.find({
    conversationName: sortAlphabets(`${userSelf}${userOther}`),
  })
    .then(async (results) => {
      if (!results.length) {
        const conversationData = new Conversation({
          conversationName: sortAlphabets(`${userSelf}${userOther}`),
          user1: userOther,
          user2: userSelf,
        });
        conversationData.save();
      }
    })
    .then(() => {
      Conversation.find({
        conversationName: sortAlphabets(`${userSelf}${userOther}`),
      }).then((results) => {
        let messages = [];
        if (results[0]) messages = results[0].messages;

        res.render("pages/chat/chatSelf/chatSelf.njk", {
          userSelf: userSelf,
          userOther: userOther,
          messages: messages,
        });
      });
    });
};

const chatMessageReceived = (req, res) => {
  userSelf = req.body.userSelf;
  userOther = req.body.userOther;
  message = req.body.message;
  Conversation.findOneAndUpdate(
    {
      conversationName: sortAlphabets(`${userSelf}${userOther}`),
    },
    {
      $push: {
        messages: {
          userSender: userSelf,
          message: message,
        },
      },
    },
    {
      upsert: true,
    }
  ).then(() => {
    res.redirect("/chat/chatSelf");
  });
};

module.exports = { chatHome, chatSelf, chatMessageReceived };
