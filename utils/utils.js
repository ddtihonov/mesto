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
    //element.addEventListener('click', closeOverlay);
    }

    closePopup() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => {
        this._closeByEsc(evt);
    });
    }
    
    _closeByEsc(evt) {
        console.log(evt.key)
        if (evt.key === key) {
            const openedPopup = document.querySelector('.popup_opened');
            this.closePopup(openedPopup); 
        }
    }

    closeOverlay (evt){
        if (evt.target.classList.contains('popup')) {
            const openedPopup = document.querySelector('.popup_opened');
            closePopup(openedPopup); 
        }
    } 
}
