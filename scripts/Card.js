const popupImage = document.querySelector('.popup-image');
const image = document.querySelector('.popup__image');
export default class Card {
    constructor(name, link) {
    this._name = name;
    this._link = link;
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
    this._element.querySelector('.cell__image').src = this._link;
    this._element.querySelector('.cell__image').alt = this._name;
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
    popupImage.querySelector('.popup__image-label').textContent = this._name
    console.log(popupImage)
    //popupImage.classList.add('popup_opened');
    openPopup (popupImage);
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

function openPopup (element) {
    console.log(image.src)
    console.log(image.alt)
    element.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc);
    element.addEventListener('click', closeOverlay);
}