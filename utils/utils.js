const key = "Escape";

// открытие всех popup
export default class Popup {
    constructor({ popupSelector }) {
    this._popupSelector = popupSelector;
    }

    openPopup() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => {
        this._closeByEsc(evt);
    });
    this._popupSelector.addEventListener('click', (evt) => {
        this._closeOverlay(evt);
    });
    }

    closePopup() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => {
        this._closeByEsc(evt);
    });
    this._popupSelector.addEventListener('click', (evt) => {
        this._closeOverlay(evt);
    });
    }
    
    _closeByEsc(evt) {
        if (evt.key === key) {
            const openedPopup = document.querySelector('.popup_opened');
            this.closePopup(openedPopup); 
        }
    }

    _closeOverlay (evt){
        if (evt.target.classList.contains('popup')) {
            const openedPopup = document.querySelector('.popup_opened');
            this.closePopup(openedPopup); 
        }
    } 
}
