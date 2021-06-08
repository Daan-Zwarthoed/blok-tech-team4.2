/**
 * Match Controller
 */

 const Game = require('../models/Game');
 const User = require('../models/User');

const getSimilarUsers = (req, res) => {
    const myUserId = req.user._id;
    Game.find({ likedBy: myUserId }, (err, games) => {
        if (err) throw err;

        games.forEach(game => {
            console.log(game.likedBy)

            User.find({ _id: game.likedBy }, (err, similarUsers) => {
                if (err) throw err;
                similarUsers.filter(similarUser => similarUser != myUserId);
                console.log(similarUsers)
            })
        });

        if (req.user._id) {
            User.findById(req.user._id, (err, user) => {
                if (err) throw err;
                res.render('pages/home/index.njk', { user });
            });
        } else {
            res.render('pages/home/index.njk');
        }
    });
}

module.exports = { getSimilarUsers }