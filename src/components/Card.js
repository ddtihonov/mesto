import PopupWithImage from "./popupWithImage.js";

export default class Card {
    constructor(element, cardSelector, handleCardClick) {
    this._name = element.name;
    this._link = element.link;
    this._cardSelector = cardSelector;
    this.handleCardClick = handleCardClick
}

_getTemplate() {
    const cardElement = document
        .querySelector('.cell-template')
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
    const popupImage = '.popup-image';
    const popup = new PopupWithImage(popupImage);
    popup.open(this._name, this._link);
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