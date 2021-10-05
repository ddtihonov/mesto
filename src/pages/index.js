import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Api from '../components/Api.js';
import { validationConfig, popupProfile, popupСhangeCell, popupImage, userChangesButton, cardChangesButton, formCard, formUser, formCardInputName, formCardInputImage, nameInput, aboutInput, profileName, profileAbout, formCardButtonImage, popupCardDelete, popupAvatar, avatarChangesLink, avatarImage, formAvatar} from '../utils/constants.js';

let UserId = null;

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-28',
headers: {
    authorization: '14d1d8a7-1fa6-4dd5-b9aa-bce836d4ee4b',
    'Content-Type': 'application/json'
}
});

// копия PopupWithImage 
const popupImageOpen = new PopupWithImage(popupImage);

//копия PopupWithConfirmation
const cardDeletePopup = new PopupWithConfirmation(popupCardDelete)

// копия UserInfo
const userInfo = new UserInfo({
    userInfoName: profileName,
    userInfoAbout: profileAbout,
    userAvatar: avatarImage
});

// Разметка карточки
function createCard (element, UserId) {
    const card = new Card(element, '.cell-template', UserId, {
        handleCardClick:() =>{
        popupImageOpen.open(element.name, element.link);
        },
        handleDeleteCard: () => {
            cardDeletePopup.submitRemoval(() => {
            api.deleteCard(element._id)
                .then(() => {
                card.deleteCell();
                cardDeletePopup.close();
            });
        });
        cardDeletePopup.open();
        },
        handleLikeIcon: () => {
            if(!card.lookLike()) {
                api.addLike(element._id)
                .then((element) => {
                    card.showNumberLikes(element);
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                });
                } 
            else {
                api.deleteLike(element._id)
                .then((element) => {
                card.showNumberLikes(element);
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                });
            };
        }
    });
    const cardElement = card.generateCard();
    card.showNumberLikes(element);
    return cardElement
}

// Отрисовка элемента
const cardsList = new Section({
    renderer: (element) => {
    cardsList.addItem(createCard(element, UserId));
    }
}, '.table__cells');

//форма добавления карточки
const newCard = new PopupWithForm(popupСhangeCell, {
    handleFormSubmit: (element) => {
    addCardFormValidator.disableSubmitButton ();    
    newCard.renderLoading(true);
    api.addCard(element)
        .then((element) =>{
            cardsList.addItem(createCard(element, UserId));
            newCard.close();
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            newCard.renderLoading(false);
        });
    
}
});


// обработчик данных popup добавления карточки
cardChangesButton.addEventListener('click', () => {
    addCardFormValidator.removeValidationErrors();
    newCard.open();
});

// обработчик данных для открытия формы смены пользователя
userChangesButton.addEventListener('click', () => {
    editProfileFormValidator.removeValidationErrors();
    const { user, about } = userInfo.getUserInfo();
    nameInput.value = user
    aboutInput.value = about
    newWithForm.open();
});

// обработчик данных popup смены аватара
avatarChangesLink.addEventListener('click', () => {
    changeAvatarFormValidator.removeValidationErrors();
    newAvatar.open();
});

// обработка данных при закрытии формы смены аватара
const newAvatar = new PopupWithForm(popupAvatar, {
    handleFormSubmit:(data) => {
    newAvatar.renderLoading(true);
    api.addAvatar(data)
        .then((data) => {
            userInfo.setUserInfo({
                avatar: data.avatar
            });
            newAvatar.close();
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            newAvatar.renderLoading(false);
        });
    }
});

// обработка данных при закрытии формы смены пользователя
const newWithForm = new PopupWithForm(popupProfile, {
    handleFormSubmit: (data) => {
    newWithForm.renderLoading(true);
    api.setUserInfo({
        name: data.name,
        about: data.about
    })
        .then((data) => {
            userInfo.setUserInfo({
                name: data.name,
                about: data.about
            });
            newWithForm.close();
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            newWithForm.renderLoading(false);
        });
    }
});

//форма добавления карты
const addCardFormValidator = new FormValidator (validationConfig, formCard);
addCardFormValidator.enableValidation();

//форма редактирования профиля
const editProfileFormValidator = new FormValidator (validationConfig, formUser);
editProfileFormValidator.enableValidation();

//форма смены аватара
const changeAvatarFormValidator = new FormValidator (validationConfig, formAvatar);
changeAvatarFormValidator.enableValidation();

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cardData]) => {
        userInfo.setUserInfo({
            name: userData.name,
            about: userData.about,
            avatar: userData.avatar
        });
        UserId = userData._id;
        cardsList.renderCards(cardData);
    })
    .catch((err) => {
    console.log(`Ошибка: ${err}`);
});