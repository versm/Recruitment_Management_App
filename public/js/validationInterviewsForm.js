
function validateForm() {

    const candidateInput = document.getElementById('candidate');
    const hrManagerInput = document.getElementById('hrmanager');
    const dateInput = document.getElementById('date');
    const isOnlineInput = document.getElementById('isOnline');
    const placeInput = document.getElementById('place');
    const recruitmentStageInput = document.getElementById('recruitmentStage');

    const errorCandidate = document.getElementById('errorCandidate');
    const errorHrManager = document.getElementById('errorHrManager');
    const errorDate = document.getElementById('errorDate');
    const errorIsOnline = document.getElementById('errorIsOnline');
    const errorPlace= document.getElementById('errorPlace');
    const errorRecruitmentStage= document.getElementById('errorRecruitmentStage');
    const errorsSummary = document.getElementById('errorsSummary');

    const reqMessage = document.getElementById('errorMessage-required').innerText;
    const charMessage10to120 = document.getElementById('errorMessage-length-10-120').innerText;
    const recruitmentStageMessage = document.getElementById('errorMessage-recruitmentStageRange').innerText;
    const dateFormatMessage = document.getElementById('errorMessage-invalidDateFormat').innerText;
    const dateMessage = document.getElementById('errorMessage-invalidDate').innerText;
    const noPlaceMessage = document.getElementById('errorMessage-noPlaceRequired').innerText;
    const sumMessage = document.getElementById('errorMessage-summary').innerText;

    resetErrors([candidateInput,hrManagerInput,dateInput,placeInput,recruitmentStageInput],[errorCandidate,errorHrManager,errorDate,errorPlace,errorRecruitmentStage],errorsSummary);

    let valid = true;

    if (!checkRequired(candidateInput.value)) {
        valid = false;
        candidateInput.classList.add("error-input");
        errorCandidate.innerText = reqMessage;
    }

    if (!checkRequired(hrManagerInput.value)) {
        valid = false;
        hrManagerInput.classList.add("error-input");
        errorHrManager.innerText = reqMessage;
    }

    if (!checkRequired(isOnlineInput.value)) {
        valid = false;
        hrManagerInput.classList.add("error-input");
        errorHrManager.innerText = reqMessage;
    }

    if(!ifOnline(document.getElementById('isOnline').value)&&placeInput.value === '') {
        valid = false;
        placeInput.classList.add("error-input");
        errorPlace.innerText = reqMessage;
    }
    else if(!ifOnline(document.getElementById('isOnline').value)&&checkTextLengthRange(placeInput.value,10,120)){
        valid = false;
        placeInput.classList.add("error-input");
        errorPlace.innerText = charMessage10to120;
    }

    if(ifOnline(isOnlineInput.value) && placeInput.value !== '') {
        valid = false;
        placeInput.classList.add("error-input");
        errorPlace.innerText = noPlaceMessage;
    }


    if (!checkRequired(recruitmentStageInput.value)) {
        valid = false;
        recruitmentStageInput.classList.add("error-input");
        errorRecruitmentStage.innerText = reqMessage;
    } else if (!checkNumber(recruitmentStageInput.value) || !checkNumberRange(recruitmentStageInput.value, 1, 3)) {
        valid = false;
        recruitmentStageInput.classList.add("error-input");
        errorRecruitmentStage.innerText = recruitmentStageMessage;
    }


    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + nowDate.getDate(),
        year = nowDate.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    const nowString = [year, month, day].join('-');


    if (!checkRequired(dateInput.value)) {
        valid = false;
        dateInput.classList.add("error-input");
        errorDate.innerText = reqMessage;
    } else if (!checkDate(dateInput.value)) {
        valid = false;
        dateInput.classList.add("error-input");
        errorDate.innerText = dateFormatMessage;
    } else if (checkDateIfAfter(dateInput.value, nowString)) {
        valid = false;
        dateInput.classList.add("error-input");
        errorDate.innerText = dateMessage;
    }


    if (!valid) {
        errorsSummary.innerText = sumMessage;
    }

    return valid;
}




