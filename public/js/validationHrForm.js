
function validateForm() {

    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const salaryInput = document.getElementById('salary');
    const descriptionInput = document.getElementById('description');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const errorFirstName = document.getElementById('errorFirstName');
    const errorLastName = document.getElementById('errorLastName');
    const errorSalary = document.getElementById('errorSalary');
    const errorDescription = document.getElementById('errorDescription');
    const errorPassword = document.getElementById('errorPassword');
    const errorEmail = document.getElementById('errorEmail');
    const errorsSummary = document.getElementById('errorsSummary');

    const reqMessage = document.getElementById('errorMessage-required').innerText;
    const charMessage2to60 = document.getElementById('errorMessage-length-2-60').innerText;
    const charMessage5to60 = document.getElementById('errorMessage-length-5-60').innerText;
    const charMessage50to250 = document.getElementById('errorMessage-length-50-250').innerText;
    const emailMessage = document.getElementById('errorMessage-email').innerText;
    const salaryRangeMessage = document.getElementById('errorMessage-salaryRange').innerText;
    const intMessage = document.getElementById('errorMessage-integer').innerText;
    const sumMessage = document.getElementById('errorMessage-summary').innerText;

    resetErrors([firstNameInput,lastNameInput,salaryInput,descriptionInput, emailInput,passwordInput],[errorFirstName,errorLastName,errorSalary,errorDescription, errorEmail,errorPassword],errorsSummary);

    let valid = true;

    if (!checkRequired(firstNameInput.value)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = reqMessage;
    } else if (!checkTextLengthRange(firstNameInput.value, 2, 60)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = charMessage2to60;
    }

     if (!checkRequired(lastNameInput.value)) {
            valid = false;
            lastNameInput.classList.add("error-input");
            errorLastName.innerText = reqMessage;
     } else if (!checkTextLengthRange(lastNameInput.value, 2, 60)) {
            valid = false;
            lastNameInput.classList.add("error-input");
            errorLastName.innerText = charMessage2to60;
     }

    if (!checkRequired(salaryInput.value)) {
        valid = false;
        salaryInput.classList.add("error-input");
        errorSalary.innerText = reqMessage;
    } else if (!checkNumber(salaryInput.value)) {
        valid = false;
        salaryInput.classList.add("error-input");
        errorSalary.innerText = intMessage;
    } else if (!checkNumberRange(salaryInput.value, 2000, 100000)) {
        valid = false;
        salaryInput.classList.add("error-input");
        errorSalary.innerText = salaryRangeMessage;
    }


    if (!checkRequired(descriptionInput.value)) {
        valid = false;
        descriptionInput.classList.add("error-input");
        errorDescription.innerText = reqMessage;
    } else if (!checkTextLengthRange(descriptionInput.value, 50, 250)) {
        valid = false;
        descriptionInput.classList.add("error-input");
        errorDescription.innerText = charMessage50to250;
    }

    if (!checkRequired(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = reqMessage;
    } else if (!checkTextLengthRange(emailInput.value, 5, 60)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = charMessage5to60;
    } else if (!checkEmail(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = emailMessage;
    }

    if (!checkRequired(passwordInput.value)) {
        valid = false;
        passwordInput.classList.add("error-input");
        errorPassword.innerText = reqMessage;
    } else if (!checkTextLengthRange(passwordInput.value, 5, 60)) {
        valid = false;
        passwordInput.classList.add("error-input");
        errorPassword.innerText = charMessage5to60;
    }

    if (!valid) {
        errorsSummary.innerText = sumMessage;
    }

    return valid;
}




