arrayOfSelectors = {
    formSelector: '.form',
    formInputSelector: '.form__input',
    formButtonSelector: '.form__button',
    formButtonDisabled: 'form__button_disabled',
    formInputTypeError: 'form__input_type_error',
    formInputErrorActive: 'form__input-error_active'
};

//Ругаемся при invalid
const showInputError = (formElement, inputElement, errorMessage, object) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(object.formInputTypeError);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(object.formInputErrorActive);
};

//Чистим при valid
const hideInputError = (formElement, inputElement, object) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(object.formInputTypeError);
    errorElement.classList.remove(object.formInputErrorActive);
    errorElement.textContent = '';
};

//Проверяем валидность input
const checkInputValidity = (formElement, inputElement, object) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, object);
    } else {
        hideInputError(formElement, inputElement, object);
    }
};

//Ищем input в форме
const setEventListeners = (formElement, object) => {
    const inputList = Array.from(formElement.querySelectorAll(object.formInputSelector));
    const buttonElement = formElement.querySelector(object.formButtonSelector);
    toggleButtonState(inputList, buttonElement, object);
    inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, object);
        toggleButtonState(inputList, buttonElement, object);
        });
    });
};

//Ищем нужную форму
function enableValidation(object){
    const formList = Array.from(document.querySelectorAll(object.formSelector));
    formList.forEach((formElement) => {
    setEventListeners(formElement, object);
}); 
}

enableValidation (arrayOfSelectors)

function hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
}); 
}

// поведение кнопки valid-invalid
function toggleButtonState (inputList, buttonElement, object) {
    if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(object.formButtonDisabled);
    buttonElement.setAttribute('disabled', false)
} else {
    buttonElement.classList.remove(object.formButtonDisabled);
    buttonElement.removeAttribute('disabled', true)
} 
}