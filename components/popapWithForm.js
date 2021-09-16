import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupElement = document.querySelector(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
}

// данные полей формы
_getInputValues() {
    this._inputList = this._popupElement.querySelectorAll('.form__input');
    this._formData = {};
    this._inputList.forEach(input => {
    this._formData[input.name] = input.value;
    });
    return this._formData;
}

setEventListeners() {
    super.setEventListeners();
    this._formElement = this._popupElement.querySelector('.form');
    this._formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
    });
}

close() {
    super.close();
    this._formElement.reset();
}
}