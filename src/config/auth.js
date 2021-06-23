// Source: https://www.youtube.com/watch?v=W5Tb1MIeg-I

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
};

const isLoggedOut = (req, res, next) => {
    if (!req.isAuthenticated()) return next();
    res.redirect('/');
};

module.exports = { isLoggedIn, isLoggedOut };
