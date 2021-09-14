import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
constructor({ popupSelector }) {
    super({ popupSelector });

    this.setEventListeners();
}

open(name, link) {
    this._popupSelector.classList.add('popup_opened');
    const image = document.querySelector('.popup__image');
    const imageLabel =  document.querySelector('.popup__image-label')
    image.src = link 
    image.alt = name
    imageLabel.textContent = name
    document.addEventListener('keydown', (evt) => {
    this._handleEscClose(evt);
    });
}
}