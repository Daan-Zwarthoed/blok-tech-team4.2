// https://www.npmjs.com/package/swipe-listener
// https://browserify.org/

const SwipeListener = require('swipe-listener');
const dislike = document.querySelector('#dislike');
const like = document.querySelector('#like');
const submit = document.querySelector('.verzend');
const formulier = document.querySelector('form');

submit.hidden = true;

/**
 * Functie
 */

card.addEventListener('swipe', (event) => {
    const directions = event.detail.directions;
    switch (directions) {
        case directions.left:
            dislike.checked = true;
            formulier.submit();
        case directions.right:
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
