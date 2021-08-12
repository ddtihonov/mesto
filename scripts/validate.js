const form = document.querySelector('.form');
const formInput = form.querySelector('.form__input');
const formError = form.querySelector(`.${formInput.id}-error`);

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
    console.log(inputElement);
    console.log(formElement); 
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

//Ищем input в форме
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.form__input'));
    inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        });
    });
};

//Ищем нужную форму
function enableValidation(){
    const formList = Array.from(document.querySelectorAll('.form'));
    formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
});
    setEventListeners(formElement);
}); 
}

enableValidation ()