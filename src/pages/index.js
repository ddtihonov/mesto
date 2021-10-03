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
export let UserId = null;
export const api = new Api({
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
function createCard (element) {
    const card = new Card(element, '.cell-template', () =>{
        popupImageOpen.open(element.name, element.link);
    });
    const cardElement = card.generateCard();
    return cardElement
}

// Отрисовка элемента
const cardsList = new Section({
    renderer: (element) => {
    cardsList.addItem(createCard(element));
    }
}, '.table__cells');

//форма добавления карточки
const newCard = new PopupWithForm(popupСhangeCell, (element) => {
    addCardFormValidator.disableSubmitButton ();
    const newCards = {
        name: element.title,
        link: element.image
    }
    cardsList.addItem(createCard(newCards));
    newCard.close();
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
const newAvatar = new PopupWithForm(popupAvatar, (data) => {
    //popupAvatar.renderLoading(true);
    api.addAvatar(data)
        .then((data) => {
            userInfo.setUserInfo({
                avatar: data.avatar
            });
        newAvatar.close();
        })
        .catch((err) => {
            console.log(`Attention! ${err}`);
        })
        .finally(() => {
         //popupProfile.renderLoading(false);
        });
});

// обработка данных при закрытии формы смены пользователя
const newWithForm = new PopupWithForm(popupProfile, (data) => {
   // popupProfile.renderLoading(true);
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
            console.log(`Attention! ${err}`);
        })
        .finally(() => {
            //popupProfile.renderLoading(false);
        });
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

Promise.all([api.getUserInfo(), api.getCards()])
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
    console.log(`Attention! ${err}`);
});