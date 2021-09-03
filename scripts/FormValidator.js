export default class FormValidator {
    constructor(objectFormValidator, formElement) {
        this._formInputSelector = objectFormValidator.formInputSelector
        this._formButtonSelector = objectFormValidator.formButtonSelector
        this._formButtonDisabled = objectFormValidator.formButtonDisabled
        this._formInputTypeError = objectFormValidator.formInputTypeError
        this._formInputErrorActive = objectFormValidator.formInputErrorActive
        this._formElement = formElement
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
    if (this._hasInvalidInput(inputList)) {
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
}