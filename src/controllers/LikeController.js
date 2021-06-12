/**
 * Match Controller
 */

const Game = require('../models/Game');
const User = require('../models/User');

// functie getSimilarUsers, deze functie zoekt naar gebruikers die dezelfde spelletjes als jou hebben geliked
const getSimilarUsers = (req, res) => {
    const myUser = req.user; // dit is de ingelogd gebruiker
    Game.find({ likedBy: myUser.username }, (err, games) => { // hier zoek je naar de spelletjes die ik zelf heb geliked
        if (err) throw err;

        const likeArr = []; // lege Array voor het pushen van de SimilarUsers

        games.forEach(game => { // haal alle likes op van elke game
            const likes = game.likedBy;

            likes.forEach(like => { // push alle individuele likes naar de likeArray
                likeArr.push(like);
            });
        });

        const uniqueLikeArr = [...new Set(likeArr)].filter((like) => { // zorgt ervoor dat een gebruiker maar één keer voorkomt en filter mijzelf eruit
            return like !== myUser.username;
        });

        User.find({}, (err, users) => {
            if (err) throw err;

            const similarUsers = [];

            users.forEach(user => {
                if (uniqueLikeArr.includes(user.username)) {
                    similarUsers.push(user);
                }
            });

            const unknownUsers = similarUsers.filter((user) => {
                return !user.likedBy.includes(myUser.username) && !user.dislikedBy.includes(myUser.username)
            });

            const displayedUser = unknownUsers[Math.floor(Math.random() * unknownUsers.length)];

            User.findById(req.user._id, (err, user) => {
                if (err) throw err;
                res.render('pages/like/like.njk', { user, displayedUser });
            });
        });
    });
};

module.exports = { getSimilarUsers };
