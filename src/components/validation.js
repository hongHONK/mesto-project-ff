export function enableValidation(validationConfig) {
    const formsList = Array.from(document.querySelectorAll(validationConfig.formSelector));

    formsList.forEach(formElement => {
        const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
        const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

        inputList.forEach(inputElement => {
            inputElement.addEventListener('input', (evt) => {
                checkInputValidity(evt.target, validationConfig.inputErrorClass, validationConfig.errorClass);
                toggleButtonState(buttonElement, validationConfig.inactiveButtonClass, inputList);
            })
        });
    });
}

function checkInputValidity(inputElement, inputErrorClass, errorClass) {
    const formElement = inputElement.closest('form');
    const inputValidityState = inputElement.validity;

    if (!inputValidityState.valid) {
        const errorMessage = generateErrorMassage(inputElement);
        showErrorMessage(formElement, inputElement, inputErrorClass, errorClass, errorMessage);
    } else {
        hideErrorMessage(formElement, inputElement, inputErrorClass, errorClass);
    }
}

function generateErrorMassage(inputElement) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity('');
    }

    return inputElement.validationMessage;
}


function showErrorMessage(formElement, inputElement, inputErrorClass, errorClass, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);

    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
    inputElement.classList.add(inputErrorClass);
}

function hideErrorMessage(formElement, inputElement, inputErrorClass, errorClass) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
    
    errorElement.textContent = '';
    errorElement.classList.remove(errorClass);
    inputElement.classList.remove(inputErrorClass);
}

function toggleButtonState(buttonElement, inactiveButtonClass, inputList) {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(inactiveButtonClass);
    }
}

function hasInvalidInput(inputList) {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid;
    });
}

export function clearValidation(formElement, validationConfig) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

    inputList.forEach(inputElement => {
        hideErrorMessage(formElement, inputElement, validationConfig.inputErrorClass, validationConfig.errorClass);
    });

    toggleButtonState(buttonElement, validationConfig.inactiveButtonClass, inputList);
}
