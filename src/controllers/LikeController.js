/**
 * Match Controller
 */

const Game = require('../models/Game');
const User = require('../models/User');
const { shuffle } = require('../tools/shuffle');

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

        uniqueLikeArr.forEach(like => {
            User.find({ username: like }, (err, similarUsers) => {
                if (err) throw err;


                similarUsers.filter((user) => {
                    return user.likedBy.includes(myUser.username);
                })
                shuffle(similarUsers);
                console.log(similarUsers);
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
