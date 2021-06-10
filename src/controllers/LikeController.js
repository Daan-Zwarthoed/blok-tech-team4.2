/**
 * Match Controller
 */

const Game = require('../models/Game');
const User = require('../models/User');

const getSimilarUsers = (req, res) => {
    const myUserId = req.user._id;
    Game.find({ likedBy: myUserId }, (err, games) => {
        if (err) throw err;

        games.forEach((game) => {
            // Hoe kan ik hier bij de query meegeven dat het id niet gelijk moet zijn aan myUserId en OOK moet zoeken naar game.likedBy?
            // Ik weet al dat een not equal query { $ne: myUserId } moet zijn
            User.find({ _id: game.likedBy }, (err, similarUsers) => {
                if (err) throw err;

                res.render('pages/like/like.njk', { similarUsers });
            });
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
};

module.exports = { getSimilarUsers };
