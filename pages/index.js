import {initialCards} from '../utils/initial-cards.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Popup from '../components/Popup.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/popapWithForm.js';
import { validationConfig, popupProfile, popupСhangeCell, userChangesButton, csrdChangesButton, } from '../utils/constants.js';

const formUser = document.forms.user;
const formCard = document.forms.card;
const formCardInputName = formCard.querySelector('.form__input_place_name');
const formCardInputimage = formCard.querySelector('.form__input_place_image');
const nameInput = formUser.elements.name;
const jobInput = formUser.elements.job;
const plaseInput = formCard.elements.title;
const linkInput = formCard.elements.image;
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const formCardButtonImage = formCard.querySelector('.form__button-image');


const cardsList = new Section({
    items: initialCards,
    renderer: (element) => {
    const card = new Card(element, '.cell-template');
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
    }
}, '.table__cells');

cardsList.renderCards();

//форма добавления карточки
function submitCardForm (evt) {
    evt.preventDefault();
    addCardFormValidator.disableSubmitButton (formCardButtonImage);
    const newCard = {
        name: formCardInputName.value,
        link: formCardInputimage.value
    }
    const cardContainer = document.querySelector('.table__cells')
    const card = new Card(newCard, '.cell-template');
    cardContainer.prepend(card.generateCard());///

    plaseInput.value = plaseInput.textContent;
    linkInput.value = linkInput.textContent;
    const popup = new Popup(popupСhangeCell);
    popup.close();
}

formCard.addEventListener('submit', submitCardForm);

/////////////////////////////////////////////////////////////////////
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
    const popup = new Popup(popupProfile);
    popup.open();
});

const newWithForm = new PopupWithForm(popupProfile, (data) => {
    userInfo.setUserInfo(data);
    const popup = new Popup(popupProfile);
    popup.close();
});

// обработчик данных popup добавления карточки
csrdChangesButton.addEventListener('click', () => {
    formCard.reset();
    addCardFormValidator.removeValidationErrors();
    const popup = new Popup(popupСhangeCell);
    popup.open();
});


const addCardFormValidator = new FormValidator (validationConfig, formCard);
addCardFormValidator.enableValidation();

const editProfileFormValidator = new FormValidator (validationConfig, formUser);
editProfileFormValidator.enableValidation();