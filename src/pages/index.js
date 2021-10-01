import './index.css';

import {initialCards} from '../utils/initial-cards.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import { validationConfig, popupProfile, popupСhangeCell, popupImage, userChangesButton, cardChangesButton, formCard, formUser, formCardInputName, formCardInputImage, nameInput, jobInput, profileName, profileProfession, formCardButtonImage, popupCardDelete, popupAvatar, avatarChangesLink, avatarImage, formAvatar} from '../utils/constants.js';

// копия PopupWithImage 
const popupImageOpen = new PopupWithImage(popupImage);

// копия UserInfo
const userInfo = new UserInfo({
    userInfoName: profileName,
    userInfoProfession: profileProfession,
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
    items: initialCards,
    renderer: (element) => {
    cardsList.addItem(createCard(element));
    }
}, '.table__cells');

cardsList.renderCards();

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
    const { user, profession } = userInfo.getUserInfo();
    nameInput.value = user
    jobInput.value = profession
    newWithForm.open();
});

// обработчик данных popup смены аватара
avatarChangesLink.addEventListener('click', () => {
    changeAvatarFormValidator.removeValidationErrors();
    newAvatar.open();
});

// обработка данных при закрытии формы смены аватара
const newAvatar = new PopupWithForm(popupAvatar, (data) => {
    userInfo.setUserInfo(data);
    newAvatar.close();
});

// обработка данных при закрытии формы смены пользователя
const newWithForm = new PopupWithForm(popupProfile, (data) => {
    userInfo.setUserInfo({avatar: data.avatar});
    newWithForm.close();
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

/*popupCardDelete.addEventListener('click', () => {*/