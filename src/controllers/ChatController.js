const users = ["Henk", "Sam", "Daan"];

const chatHome = (req, res) => {
  res.render("pages/chat/chatList.njk", { users: users });
};

const chatSelf = (req, res) => {
  res.render("pages/chat/chatSelf/chatSelf.njk", {
    userSelf: req.body.userSelf,
    userOther: req.body.user,
  });
};

module.exports = { chatHome, chatSelf };
