// Router

module.exports = (function () {
  "use strict";

  var routes = require("express").Router();

  routes.get("/", (req, res) => {
    res.render("index.njk");
  });

  return routes;
})();
