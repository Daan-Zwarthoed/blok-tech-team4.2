const bodyElem = document.querySelector('body');

/**
 * This function removes any transitions from loading before the window is loaded.
 * For more see: https://css-tricks.com/transitions-only-after-page-load/
 */
window.onload = () => {
    bodyElem.classList.remove('preload');
};
