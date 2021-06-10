const formElem = document.querySelector('form');
const formLinks = document.querySelectorAll('.next-step');
const formInput = document.querySelectorAll('form input');
const generalInformationInput = document.querySelectorAll('#general-information input');
const visualInformation = document.querySelector('#visual-information');
const onboardInformation = document.querySelector('#onboard-information');

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
const scrollElement = (event) => {
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
    }
};

/**
 * EventListener for the next step buttons.
 */
formLinks.forEach((formLink) => {
    formLink.addEventListener('click', scrollElement);
});

/**
 * This function removes the error state on any input when the user clicks on this input.
 */
formInput.forEach((input) => {
    input.addEventListener('click', () => {
        input.classList.remove('warning');
    });
});
