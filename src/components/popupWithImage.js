import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
constructor(popupSelector) {
    super(popupSelector);
}

open(name, link) {
    super.open();
    const image = document.querySelector('.popup__image');
    const imageLabel =  document.querySelector('.popup__image-label')
    image.src = link 
    image.alt = name
    imageLabel.textContent = name
}
}