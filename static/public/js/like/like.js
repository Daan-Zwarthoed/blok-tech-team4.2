// Browserify. (z.d.). Browserify. Geraadpleegd op 3 juni 2021, van https://browserify.org/
// npm: swipe-listener. (2020, 13 oktober). Npm. https://www.npmjs.com/package/swipe-listener

const SwipeListener = require('swipe-listener');

const card = document.querySelector('.likeCard');
const listener = SwipeListener(card);
const dislike = document.querySelector('#dislike');
const like = document.querySelector('#like');
const submit = document.querySelector('.verzend');
const formulier = document.querySelector('form');

submit.hidden = true; // de verzendbutton is hidden wanneer javascript ingeschakeld is

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
