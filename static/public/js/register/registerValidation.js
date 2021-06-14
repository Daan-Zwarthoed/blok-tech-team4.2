const formElem = document.querySelector('form');
const formLinks = document.querySelectorAll('.next-step');
const formInput = document.querySelectorAll('form input');
const generalInformationInput = document.querySelectorAll('#general-information input');
const visualInformation = document.querySelector('#visual-information');
const onboardInformation = document.querySelector('#onboard-information');
const onboardInformationInput = document.querySelectorAll('#onboard-information input');
const submitBtn = document.querySelector('button[type="submit"]');
const playstyle = document.querySelector('input[name="playstyle"]');
const playtime = document.querySelector('input[name="playtime"]');
const radioArr = [playstyle, playtime];
const username = document.querySelector('#username');
const charCount = document.querySelectorAll('.char-count');

/**
 * This function checks if a set of radio buttons have been checked.
 *
 * @param {*} arr = the request array of radio elements
 * @param {*} counter = the counter which keeps track of the not filled in input fields
 */
const checkRadio = (arr, counter) => {
    arr.forEach((input) => {
        if (!input.checked) {
            counter.push(input);
        }
    });
};

/**
 * This function checks if input fields have been checked.
 *
 * @param {*} arr = the request array of input elements
 * @param {*} counter = the counter which keeps track of the not filled in input fields
 */
const checkInput = (arr, counter) => {
    // Loop through every input to find the fields that haven't been filled in yet
    arr.forEach((input) => {
        if (input.value.length === 0) {
            // Push the input to the array which contains every input field that has no input yet
            counter.push(input);
            input.classList.add('warning');
        }
    });
};

/**
 * This function goes to the next sequence (applied when input isn't necessarily required).
 *
 * @param {*} form = the form which is being used
 * @param {*} nextInfo = the next sequence in the registering process
 */
const nextSequence = (form, nextInfo) => {
    form.scroll({
        left: nextInfo.offsetLeft,
        behavior: 'smooth',
    });
};

/**
 * This function adds a warning to the targeted element.
 *
 * @param {*} event = event
 */
const addWarning = (event) => {
    const element = event.target;

    element.classList.add('warning');

    setTimeout(() => {
        element.classList.remove('warning');
    }, 3000);
};

/**
 * This function checks if the user has filled in every input field to go
 * to the next sequence.
 *
 * @param {*} arr = the requested array which contains (multiple) input fields
 * @param {*} radio = the requested array which contains (multiple) radio fields
 * @param {*} form = the form which is being used
 * @param {*} nextInfo = the next sequence in the registering process
 * @param {*} event = event
 */
const validate = (input, radio, form, nextInfo, event) => {
    const noInput = [];

    checkRadio(radio, noInput);

    checkInput(input, noInput);

    // If there are no input fields, go to the next sequence
    if (noInput.length === 0) {
        nextSequence(form, nextInfo);
    } else {
        addWarning(event);
    }
};

/**
 * This checks if at least one game is checked before you can register.
 * @param {*} arr = the requested array which contains checkboxes
 * @param {*} event = event
 */
const checkGames = (arr, event) => {
    // Declare a boolean to check if checkboxes are checked.
    let boolChecked = false;

    arr.forEach((input) => {
        if (input.checked) {
            boolChecked = true;
        }
    });

    if (!boolChecked) {
        // Prevent the user from submitting
        event.preventDefault();
        addWarning(event);
    }
};

/**
 * This function checks which button is being clicked and summons the checkInput function.
 *
 * @param {*} event = event
 */
const goNextSequence = (event) => {
    switch (event.target) {
        case formLinks[0]:
            // Prevent default behavior for smooth interactions when Javascript is enabled
            event.preventDefault();
            validate(generalInformationInput, radioArr, formElem, visualInformation, event);
            break;
        case formLinks[1]:
            // Prevent default behavior for smooth interactions when Javascript is enabled
            event.preventDefault();
            nextSequence(formElem, onboardInformation);
            break;
        case submitBtn:
            checkGames(onboardInformationInput, event);
            break;
    }
};

/**
 * EventListener for the next step buttons.
 */
formLinks.forEach((formLink) => {
    formLink.addEventListener('click', goNextSequence);
});

/**
 * Eventlistener for adding active state to the game cards.
 */
onboardInformationInput.forEach((input) => {
    input.addEventListener('click', (event) => {
        const card = event.target.parentNode;

        if (card.classList.contains('clicked')) {
            card.classList.remove('clicked');
        } else {
            card.classList.add('clicked');
        }
    });
});

submitBtn.addEventListener('click', goNextSequence);

/**
 * This function removes the error state on any input when the user clicks on this input.
 */
formInput.forEach((input) => {
    input.addEventListener('click', () => {
        input.classList.remove('warning');
    });
});

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

username.addEventListener('keyup', () => {
    insertCharCount(username, charCount);
});

/**
 * Fire the functions when the window is loaded for instant feedback.
 */
window.onload = () => {
    insertCharCount(username, charCount);
};
