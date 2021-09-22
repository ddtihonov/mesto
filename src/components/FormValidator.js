export default class FormValidator {
    constructor(validationConfig, formElement) {
        this._formInputSelector = validationConfig.formInputSelector
        this._formButtonSelector = validationConfig.formButtonSelector
        this._formButtonDisabled = validationConfig.formButtonDisabled
        this._formInputTypeError = validationConfig.formInputTypeError
        this._formInputErrorActive = validationConfig.formInputErrorActive
        this._formElement = formElement
        this._formInputError = validationConfig.formInputError
        this._buttonElement = this._formElement.querySelector(this._formButtonSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._formInputSelector));
        this._errorElement = this._formElement.querySelectorAll(this._formInputError);
        this._inputElement = this._formElement.querySelectorAll(this._formInputSelector)
}


enableValidation(){
    this._setInputListeners();
}; 

//Ищем input в форме
_setInputListeners = () => {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
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
_toggleButtonState () {
    if (this._hasInvalidInput()){
        this._buttonElement.classList.add(this._formButtonDisabled);
        this._buttonElement.setAttribute('disabled', false)
} else {
    this._buttonElement.classList.remove(this._formButtonDisabled);
    this._buttonElement.removeAttribute('disabled', true)
} 
}

_hasInvalidInput () {
    return this._inputList.some((inputElement) => {
    return !inputElement.validity.valid;
}); 
}


disableSubmitButton (){
    this._buttonElement.classList.add(this._formButtonDisabled);
    this._buttonElement.setAttribute('disabled', false)
}

//чистим форму при открытии
removeValidationErrors() {
    this._errorElement.forEach((element) => {
        element.textContent = '';
    });
    this._inputElement.forEach((element) => {
        element.classList.remove(this._formInputTypeError);
    });
}
}
