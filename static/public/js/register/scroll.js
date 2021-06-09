const formElem = document.querySelector('form');
const formLinks = document.querySelectorAll('.next-step');
const generalInformationInput = document.querySelectorAll('#general-information input');
const visualInformation = document.querySelector('#visual-information');
const visualInformationInput = document.querySelectorAll('#visual-information input');
const onboardInformation = document.querySelector('#onboard-information');

/**
 * This function checks if the user has filled in every input field to go
 * to the next sequence.
 *
 * @param {*} arr = the request array which contains (multiple) input fields
 * @param {*} form = the form which is being used
 * @param {*} nextInfo = the next sequence of information
 */
const checkInput = (arr, form, nextInfo) => {
    const noInput = [];

    // Loop through every input to find the fields that haven't been filled in yet
    arr.forEach((input) => {
        if (input.value.length === 0) {
            // Push the input to the array which contains every input field that has no input yet
            noInput.push(this.input);
        }

        // If there are no input fields, go to the next sequence
        if (noInput.length === 0) {
            form.scroll({
                left: nextInfo.offsetLeft,
                behavior: 'smooth',
            });
        }
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
            // Prevent default behavior for smooth interactions when Javascript is enabled.
            event.preventDefault();
            checkInput(generalInformationInput, formElem, visualInformation);
            break;
        case formLinks[1]:
            // Prevent default behavior for smooth interactions when Javascript is enabled.
            event.preventDefault();
            checkInput(visualInformationInput, formElem, onboardInformation);
            break;
    }
};

formLinks.forEach((formLink) => {
    formLink.addEventListener('click', scrollElement);
});
