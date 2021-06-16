// https://www.npmjs.com/package/swipe-listener
// https://browserify.org/

const SwipeListener = require('swipe-listener');

const card = document.querySelector('.likeCard');
const listener = SwipeListener(card);
const dislike = document.querySelector('#dislike');
const like = document.querySelector('#like');
const submit = document.querySelector('.verzend');
const formulier = document.querySelector('form');

submit.hidden = true;

/**
 * Functie
 */

card.addEventListener('swipe', function (event) {
    const { directions } = event.detail;
    if (directions.left) {
        dislike.checked = true;
        formulier.submit();
    }

    if (directions.right) {
        like.checked = true;
        formulier.submit();
    }
});

like.addEventListener('click', function () {
    formulier.submit();
});

dislike.addEventListener('click', function () {
    formulier.submit();
});
