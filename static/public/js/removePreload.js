const bodyElem = document.querySelector('body');

/**
 * This function removes any transitions from loading before the window is loaded.
 * Coyier, C. (2015, 24 augustus). Transitions Only After Page Load. CSS-Tricks. https://css-tricks.com/transitions-only-after-page-load/
 */
window.onload = () => {
    bodyElem.classList.remove('preload');
};
