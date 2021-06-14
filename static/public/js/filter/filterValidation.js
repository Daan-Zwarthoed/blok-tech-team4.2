const submit = document.querySelector('input[type="submit"]');
const inputs = document.querySelectorAll('input[type="radio"]');

// Checks for unchecked inputs
function validateForm() {
    const noInput = [];
    inputs.forEach((input) => {
        if (input.checked == false) {
            // Push unchecked inputs to the noInput array and gives them a class
            noInput.push(input);
            input.classList.add('warning');
        }
    });
}

submit.addEventListener('click', validateForm);

// Removes class after checking an input
inputs.forEach((input) => {
    input.addEventListener('click', () => {
        input.classList.remove('warning');
    });
});
