export default class FormValidator {
    constructor(validationConfig, formElement) {
        this._formInputSelector = validationConfig.formInputSelector
        this._formButtonSelector = validationConfig.formButtonSelector
        this._formButtonDisabled = validationConfig.formButtonDisabled
        this._formInputTypeError = validationConfig.formInputTypeError
        this._formInputErrorActive = validationConfig.formInputErrorActive
        this._formElement = formElement
        this._formInputError = validationConfig.formInputError
}


enableValidation(){
    this._setInputListeners();
}; 

//Ищем input в форме
_setInputListeners = () => {
    const inputList = Array.from(this._formElement.querySelectorAll(this._formInputSelector));
    const buttonElement = this._formElement.querySelector(this._formButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
    });
});
}

//Проверяем валидность input
_checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
    } else {
        this._hideInputError(inputElement);
    }
}

//Чистим при valid
_hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._formInputTypeError);
    errorElement.classList.remove(this._formInputErrorActivet);
    errorElement.textContent = '';
}

//Ругаемся при invalid
_showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._formInputTypeError);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._formInputErrorActive);
}

// поведение кнопки valid-invalid
_toggleButtonState (inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)){
    buttonElement.classList.add(this._formButtonDisabled);
    buttonElement.setAttribute('disabled', false)
} else {
    buttonElement.classList.remove(this._formButtonDisabled);
    buttonElement.removeAttribute('disabled', true)
} 
}

_hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
}); 
}


disableSubmitButton (buttonElement){
    buttonElement.classList.add(this._formButtonDisabled);
    buttonElement.setAttribute('disabled', false)
}

//чистим форму при открытии
removeValidationErrors() {
    const errorElement = document.querySelectorAll(this._formInputError)
    const inputElement = document.querySelectorAll(this._formInputSelector)
    errorElement.forEach((element) => {
        element.textContent = '';
    });
    inputElement.forEach((element) => {
        element.classList.remove(this._formInputTypeError);
    });
}
}
