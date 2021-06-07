let users = ["milan", "akshay"];
let userSelf = "";
let userOther = "";
let message = "";
let sortAlphabets = function (text) {
  return text.split("").sort().join("");
};

const Conversation = require("../models/Conversation");
const User = require("../models/User");

const chatHome = (req, res) => {
  User.findById(req.params.userId, (err, results) => {
    if (err) throw err;
    let filteredUsers = users.filter((user) => user !== results.username);
    res.render("pages/chat/chatList.njk", {
      userId: req.params.userId,
      users: filteredUsers,
    });
  });
};

const chatSelf = async (req, res) => {
  User.findById(req.params.userId, (err, user) => {
    if (err) throw err;
    userSelf = user.username;
  }).then(() => {
    if (req.body.userOther) userOther = req.body.userOther;

    if (!userOther || userOther === userSelf)
      return res.redirect("/chat/" + req.params.userId);
    Conversation.find({
      conversationName: sortAlphabets(`${userSelf}${userOther}`),
    })
      .then(async (results) => {
        if (results.length === 0) {
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
            userId: req.params.userId,
            userSelf: userSelf,
            userOther: userOther,
            messages: messages,
          });
        });
      });
  });
};

const chatMessageReceived = (req, res) => {
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
    res.redirect("/chat/chatSelf/" + req.params.userId);
  });
};

module.exports = { chatHome, chatSelf, chatMessageReceived };
