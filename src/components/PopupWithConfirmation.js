import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement = this._popupElement.querySelector('.form');
        this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleFormSubmit();
        });
        console.log(this._formElement)
    }

    submitRemoval(submitAction) {
        this._handleSubmiteCallback = submitAction;
    }
}