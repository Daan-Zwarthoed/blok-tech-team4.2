const banner = document.querySelector('.profile-banner');
const inputBanner = document.querySelector('#banner');
const avatar = document.querySelector('.profile-avatar');
const inputAvatar = document.querySelector('#avatar');
const description = document.querySelector('#description');
const descriptionCount = document.querySelector('#description .char-count');
const displayname = document.querySelector('#displayname');
const charCount = document.querySelectorAll('.char-count');

/**
 * This function shows the user input of an image file when inserting it in an input field.
 */
const showUserImage = (image, event) => {
    // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
    image.src = URL.createObjectURL(event.target.files[0]);
};

/**
 * This function checks the character count of an input field and also shows the maxLength attribute.
 * https://css-tricks.com/build-word-counter-app/
 */
const getCharCount = (input) => `${input.value.length} / ${input.maxLength}`;

/**
 * This function gets the parent of an element.
 * @param {*} element = the requested element
 * @returns = the parent
 */
const getParentFromElement = (element) => element.parentNode;

/**
 * This function checks if an element is a sibling from another element
 * @param {*} element = the requested element
 * @param {*} sibling = the sibling
 * @returns = the sibling (if true)
 */
const checkSiblingFromElement = (element, sibling) => {
    const parent = getParentFromElement(element);
    // Loop through sibling.length for if the sibling is an array
    for (let i = 0; i < sibling.length; i++) {
        if (parent.contains(sibling[i])) {
            return sibling[i];
        }
    }
};

/**
 * This function inserts the value of the getCharCount function to the right
 * sibling from the checkSiblingFromElement function.
 * @param {*} element = the requested element
 * @param {*} sibling = the sibling
 */
const insertCharCount = (element, sibling) => {
    const counter = checkSiblingFromElement(element, sibling);
    counter.innerHTML = getCharCount(element);
};

inputAvatar.addEventListener('change', (event) => {
    showUserImage(avatar, event);
});

inputBanner.addEventListener('change', (event) => {
    showUserImage(banner, event);
});

description.addEventListener('keyup', () => {
    insertCharCount(description, charCount);
});

displayname.addEventListener('keyup', () => {
    insertCharCount(displayname, charCount);
});

/**
 * Fire the functions when the window is loaded for instant feedback.
 */
window.onload = () => {
    insertCharCount(description, charCount);
    insertCharCount(displayname, charCount);
};
