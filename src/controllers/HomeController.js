// Home Controller
const getHome = (req, res) => {
  res.render("pages/home/index.njk");
};

module.exports = { getHome };
