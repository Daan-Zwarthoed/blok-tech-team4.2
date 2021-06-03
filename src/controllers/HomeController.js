// Home Controller
const getHome = (req, res) => {
  res.render("index.njk");
};

module.exports = { getHome };
