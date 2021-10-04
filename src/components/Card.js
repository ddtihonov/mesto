export default class Card {
    constructor(element, cardSelector, UserId, {handleCardClick, handleDeleteCard}, handleLikeIcon) {
        this._name = element.name;
        this._link = element.link;
        this._like = element.likes;
        this._ownerId = element.owner._id;
        this._UserId = UserId;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCard = handleDeleteCard;
        this._handleLikeIcon = handleLikeIcon;
}

// Отображение колличества лайков
displayQuantityLikes(element) {
    const likeIcon = this._element.querySelector('.cell__heart');
    const quantityLikes = this._element.querySelector('.cell__score-likes');
    quantityLikes.textContent = element.likes.length;
};

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
    this._element.querySelector('.cell__basket').classList.add('.cell__basket_opened');//
    this._showElementDelete ()
    return this._element; 
}

_like () {
    this._element.querySelector('.cell__heart').classList.toggle('cell__heart_black');
}

_deleteCell (){
    this._element.remove();
    this._element = null
}

_showElementDelete () {
    if (this._ownerId === this._UserId) {
        this._element.querySelector('.cell__basket').classList.add('cell__basket_opened');
    };
}

_setEventListeners() {

    this._element.querySelector('.cell__basket').addEventListener('click', () => {
        this._handleDeleteCard();
        });

    this._element.querySelector('.cell__heart').addEventListener('click', () => {
        this._like();
        });

    this._element.querySelector('.cell__image-link').addEventListener('click', () => {
        this._handleCardClick();
        });
}}