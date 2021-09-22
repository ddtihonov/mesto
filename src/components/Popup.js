export default class Popup {
    constructor( popupSelector ) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this.setEventListeners();
    }

    open() {
        this._popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
        }

    close() {
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
    if (evt.key === "Escape" ) {
        this.close();
    }
    }

    setEventListeners() {
    const closePopupIcon = this._popupElement.querySelector('.popup__close-icon');
    closePopupIcon.addEventListener('click', () => {
        this.close();
    });

    this._popupElement.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup')) {
            this.close(); 
        }
    });
    } 
}