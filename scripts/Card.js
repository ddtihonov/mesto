const popupImage = document.querySelector('.popup-image');
const image = document.querySelector('.popup__image');
const imageLabel =  popupImage.querySelector('.popup__image-label')
import Popup from '../utils/Popup.js';
export default class Card {
    constructor(element, cardSelector) {
    this._name = element.name;
    this._link = element.link;
    this._cardSelector = cardSelector
}

_getTemplate() {
    const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.cell')
        .cloneNode(true);

    return cardElement;
}

generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    const cellImage = this._element.querySelector('.cell__image');
    cellImage.src = this._link;
    cellImage.alt = this._name;
    this._element.querySelector('.cell__caption').textContent = this._name;
    
    return this._element;
}

_like () {
    this._element.querySelector('.cell__heart').classList.toggle('cell__heart_black');
}

_deleteCell (){
    this._element.remove();
}    

_fillPopupImage () {
    image.src = this._link 
    image.alt = this._name
    imageLabel.textContent = this._name

    const popup = new Popup({
        popupSelector: popupImage
    });
    popup.openPopup();
    }

_setEventListeners() {

    this._element.querySelector('.cell__basket').addEventListener('click', () => {
        this._deleteCell();
        });

    this._element.querySelector('.cell__heart').addEventListener('click', () => {
        this._like();
        });

    this._element.querySelector('.cell__image-link').addEventListener('click', () => {
        this._fillPopupImage();
        });
}}