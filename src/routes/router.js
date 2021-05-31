// Router

module.exports = (function () {
  "use strict";

  var routes = require("express").Router();

  routes.get("/", (req, res) => {
    res.render("index.njk");
  });

  routes.get("/chat", (req, res) => {
    res.render("pages/chat/chat.njk");
  });

  return routes;
})();
