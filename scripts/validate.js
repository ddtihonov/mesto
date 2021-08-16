const form = document.querySelector('.form');
const formInput = form.querySelector('.form__input');
const formError = form.querySelector(`.${formInput.id}-error`);
const formList = Array.from(document.querySelectorAll('.form'));

//Ругаемся при invalid
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('form__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active');
};

//Чистим при valid
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('form__input_type_error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
};

//Проверяем валидность input
const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

//Ищем input в форме
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.form__input'));
    const buttonElement = formElement.querySelector('.form__button');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
        });
    });
};

//Ищем нужную форму
function enableValidation(element){
    element.forEach((formElement) => {
    setEventListeners(formElement);
}); 
}

enableValidation (formList)

function hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
}); 
}

// поведение кнопки valid-invalid
function toggleButtonState (inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('form__button_disabled');
    buttonElement.setAttribute('disabled', false)
} else {
    buttonElement.classList.remove('form__button_disabled');
    buttonElement.removeAttribute('disabled', true)
} 
}