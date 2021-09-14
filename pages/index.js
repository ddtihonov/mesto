import {initialCards} from '../utils/initial-cards.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Popup from '../components/Popup.js';
import UserInfo from '../components/UserInfo.js';

const validationConfig = {
    formSelector: '.form',
    formInputSelector: '.form__input',
    formButtonSelector: '.form__button',
    formButtonDisabled: 'form__button_disabled',
    formInputTypeError: 'form__input_type_error',
    formInputErrorActive: 'form__input-error_active',
    formInputError: '.form__input-error'
};

const userChangesButton = document.querySelector('.profile__changes-button');
const csrdChangesButton = document.querySelector('.profile__add-button');
const tableCells = document.querySelector('.table__cells');
const popupProfile = document.querySelector('.popup-profile');
const popupСhangeCell = document.querySelector('.popup-cells');
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

renderCards(...initialCards)

function renderCards(...element) {
    element.forEach((element) => {
        tableCells.prepend(createCard (element))
    });
}


function createCard (element){
    const card = new Card(element, '.cell-template');
    const cardElement = card.generateCard();
    return cardElement; 
}

const userInfo = new UserInfo({
    userInfoName: profileName,
    userInfoProfession: profileProfession
});


// данные popup смены пользователя
function openEditProfilePopup() {
    editProfileFormValidator.removeValidationErrors();
    //nameInput.value = profileName.textContent
    //jobInput.value = profileProfession.textContent
    userInfo.getUserInfo(nameInput.value, jobInput.value);
    const popup = new Popup({
        popupSelector: popupProfile
    });
    popup.open();
}

// данные popup добавления карточки
function openAddCardPopup() {
    formCard.reset();
    addCardFormValidator.removeValidationErrors();
    const popup = new Popup({
        popupSelector: popupСhangeCell
    });
    popup.open();
}

userChangesButton.addEventListener('click', openEditProfilePopup);
csrdChangesButton.addEventListener('click', openAddCardPopup);

//форма смены пользователя
function submitProfileForm (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
    const popup = new Popup({
        popupSelector: popupProfile
    });
    popup.close();
}

formUser.addEventListener('submit', submitProfileForm);

//форма добавления карточки
function submitCardForm (evt) {
    evt.preventDefault();
    addCardFormValidator.disableSubmitButton (formCardButtonImage);
    renderCards({
        name: formCardInputName.value,
        link: formCardInputimage.value
    });
    plaseInput.value = plaseInput.textContent;
    linkInput.value = linkInput.textContent;
    const popup = new Popup({
        popupSelector: popupСhangeCell
    });
    popup.close();
}


formCard.addEventListener('submit', submitCardForm);

const addCardFormValidator = new FormValidator (validationConfig, formCard);
addCardFormValidator.enableValidation();

const editProfileFormValidator = new FormValidator (validationConfig, formUser);
editProfileFormValidator.enableValidation();