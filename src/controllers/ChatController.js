const users = ["Henk", "Sam", "Daan"];

let sortAlphabets = function (text) {
  return text.split("").sort().join("");
};

const chatHome = (req, res) => {
  res.render("pages/chat/chatList.njk", { users: users });
};

const chatSelf = (req, res) => {
  res.render("pages/chat/chatSelf/chatSelf.njk", {
    userSelf: req.body.userSelf,
    userOther: req.body.userOther,
    messages: req.body.message,
  });
};

module.exports = { chatHome, chatSelf };
