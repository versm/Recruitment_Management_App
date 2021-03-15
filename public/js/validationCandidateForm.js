
function validateForm() {

    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const telInput = document.getElementById('phoneNumber');
    const passwordInput = document.getElementById('password');

    const errorFirstName = document.getElementById('errorFirstName');
    const errorLastName = document.getElementById('errorLastName');
    const errorEmail = document.getElementById('errorEmail');
    const errorTel = document.getElementById('errorTel');
    const errorPassword = document.getElementById('errorPassword');
    const errorsSummary = document.getElementById('errorsSummary');

    const reqMessage = document.getElementById('errorMessage-required').innerText;
    const charMessage2to60 = document.getElementById('errorMessage-length-2-60').innerText;
    const charMessage5to60 = document.getElementById('errorMessage-length-5-60').innerText;
    const emailMessage = document.getElementById('errorMessage-email').innerText;
    const phoneNumMessage = document.getElementById('errorMessage-phoneNumber').innerText;
    const sumMessage = document.getElementById('errorMessage-summary').innerText;

    resetErrors([firstNameInput,lastNameInput,emailInput,telInput],[errorFirstName,errorLastName,errorEmail,errorTel],errorsSummary);

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


    if (!checkRequired(telInput.value)) {
        valid = false;
        telInput.classList.add("error-input");
        errorTel.innerText = reqMessage;
    } else if (!checkTel(telInput.value)) {
        valid = false;
        telInput.classList.add("error-input");
        errorTel.innerText = phoneNumMessage;
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




