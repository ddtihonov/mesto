export default class Card {
    constructor(element, cardSelector, UserId, {processingClickCard, processingDeleteCard, processinglike}) {
        this._name = element.name;
        this._link = element.link;
        this._likes = element.likes;
        this._ownerId = element.owner._id;
        this._UserId = UserId;
        this._cardSelector = cardSelector;
        this._processingClickCard = processingClickCard;
        this._processingDeleteCard = processingDeleteCard;
        this._processinglike = processinglike;
}

// Отображение колличества лайков
showNumberLikes(element) {
    const likeIcon = this._element.querySelector('.cell__heart');
    const scoreLikes = this._element.querySelector('.cell__score-likes');
    this._isLiked = element.likes.filter((element) => {
        return element._id === this._UserId;
    }).length > 0;
        if(this._isLiked) {
        likeIcon.classList.add('cell__heart_black');
        scoreLikes.textContent = element.likes.length;
    } else {
        likeIcon.classList.remove('cell__heart_black');
        scoreLikes.textContent = element.likes.length;
    }
};

lookLike() {
    return this._isLiked;
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

_deleteCell (){
    this._element.remove();
}

_showElementDelete () {
    if (this._ownerId === this._UserId) {
        this._element.querySelector('.cell__basket').classList.add('cell__basket_opened');
    };
}

_setEventListeners() {

    this._element.querySelector('.cell__basket').addEventListener('click', () => {
        this._processingDeleteCard();
        });

    this._element.querySelector('.cell__heart').addEventListener('click', () => {
        this._processinglike();
        });

    this._element.querySelector('.cell__image-link').addEventListener('click', () => {
        this._processingClickCard();
        });
}}