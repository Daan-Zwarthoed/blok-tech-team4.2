const formElem = document.querySelector('form');
const formLinks = document.querySelectorAll('.next-step');
const formInput = document.querySelectorAll('form input');
const generalInformationInput = document.querySelectorAll('#general-information input');
const visualInformation = document.querySelector('#visual-information');
const onboardInformation = document.querySelector('#onboard-information');
const onboardInformationInput = document.querySelectorAll('#onboard-information input');
const submitBtn = document.querySelector('button[type="submit"]');

/**
 * This function checks if the user has filled in every input field to go
 * to the next sequence.
 *
 * @param {*} arr = the requested array which contains (multiple) input fields
 * @param {*} form = the form which is being used
 * @param {*} nextInfo = the next sequence in the registering process
 */
const checkInput = (arr, form, nextInfo, event) => {
    const noInput = [];

    // Loop through every input to find the fields that haven't been filled in yet
    arr.forEach((input) => {
        if (input.value.length === 0) {
            // Push the input to the array which contains every input field that has no input yet
            noInput.push(input);
            input.classList.add('warning');
        }
    });

    // If there are no input fields, go to the next sequence
    if (noInput.length === 0) {
        form.scroll({
            left: nextInfo.offsetLeft,
            behavior: 'smooth',
        });
    } else {
        const button = event.target;
        button.classList.add('warning');

        setTimeout(() => {
            button.classList.remove('warning');
        }, 3000);
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

        const button = event.target;
        button.classList.add('warning');

        setTimeout(() => {
            button.classList.remove('warning');
        }, 3000);
    }
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
 * This function checks which button is being clicked and summons the checkInput function.
 *
 * @param {*} event = event
 */
const goNextSequence = (event) => {
    switch (event.target) {
        case formLinks[0]:
            // Prevent default behavior for smooth interactions when Javascript is enabled
            event.preventDefault();
            checkInput(generalInformationInput, formElem, visualInformation, event);
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
