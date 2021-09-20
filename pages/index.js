import {initialCards} from '../utils/initial-cards.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/popupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/popapWithForm.js';
import { validationConfig, popupProfile, popupСhangeCell, popupImage, userChangesButton, cardChangesButton, formCard, formUser, formCardInputName, formCardInputImage, nameInput, jobInput, profileName, profileProfession, formCardButtonImage} from '../utils/constants.js';

const cardsList = new Section({
    items: initialCards,
    renderer: (element) => {
    const card = new Card(element, '.cell-template', () =>{
        const popup = new PopupWithImage(popupImage);
        popup.open(element.name, element.link);
    });
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
    }
}, '.table__cells');

cardsList.renderCards();

//форма добавления карточки
const newCard = new PopupWithForm(popupСhangeCell, (element) => {
    addCardFormValidator.disableSubmitButton (formCardButtonImage);
    const newCards = {
        name: formCardInputName.value,
        link: formCardInputImage.value
    }
    const cardContainer = document.querySelector('.table__cells')
    const card = new Card(newCards, '.cell-template', () =>{
        const popup = new PopupWithImage(popupImage);
        popup.open(element.name, element.link);
    });
    cardContainer.prepend(card.generateCard());
    newCard.close();
});

// обработчик данных popup добавления карточки
cardChangesButton.addEventListener('click', () => {
    formCard.reset();
    addCardFormValidator.removeValidationErrors();
    newCard.open();
});

const userInfo = new UserInfo({
    userInfoName: profileName,
    userInfoProfession: profileProfession
});

// обработчик данных для открытия формы смены пользователя
userChangesButton.addEventListener('click', () => {
    editProfileFormValidator.removeValidationErrors();
    const { user, profession } = userInfo.getUserInfo();
    nameInput.value = user
    jobInput.value = profession
    newWithForm.open();
});

// обработка данных при закрытии формы смены пользователя
const newWithForm = new PopupWithForm(popupProfile, (data) => {
    userInfo.setUserInfo(data);
    newWithForm.close();
});

const addCardFormValidator = new FormValidator (validationConfig, formCard);
addCardFormValidator.enableValidation();

const editProfileFormValidator = new FormValidator (validationConfig, formUser);
editProfileFormValidator.enableValidation();