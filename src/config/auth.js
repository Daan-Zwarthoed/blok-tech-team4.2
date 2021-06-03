const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
};

const isLoggedOut = (req, res, next) => {
    if (!req.isAuthenticated()) return next();
    res.redirect("/");
};

const isntSameUser = (req, res ) => {
    console.log("Current login: " + req.user._id);
    console.log("Visting user profile: " + req.params.userId);

    if (req.user._id === req.params.userId) {
		console.log("equal")
	} else if (req.user._id !== req.params.userId) {
		console.log("not equal")
	}
};

module.exports = { isLoggedIn, isLoggedOut, isntSameUser };
