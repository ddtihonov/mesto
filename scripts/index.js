import {initialCards} from './initial-cards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js'
import {openPopup, closePopup } from '../utils/utils.js';
const validationConfig = {
    formSelector: '.form',
    formInputSelector: '.form__input',
    formButtonSelector: '.form__button',
    formButtonDisabled: 'form__button_disabled',
    formInputTypeError: 'form__input_type_error',
    formInputErrorActive: 'form__input-error_active'
};

const userChangesButton = document.querySelector('.profile__changes-button');
const csrdChangesButton = document.querySelector('.profile__add-button');
const popupCloseIcon = document.querySelectorAll('.popup__close-icon')
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
const errorElement = document.querySelectorAll('.form__input-error')
const inputElement = document.querySelectorAll('.form__input')

renderInitialCards(...initialCards)

function renderInitialCards(...element){
    element.forEach((element) => {
        const card = new Card(element, '.cell-template');
        const cardElement = card.generateCard();
        tableCells.prepend(cardElement);
    }); 
}

// данные popup смены пользователя
function openEditProfilePopup() {
    formUser.reset();
    clearingForm();
    nameInput.value = profileName.textContent
    jobInput.value = profileProfession.textContent
    openPopup(popupProfile);
}

// данные popup добавления карточки
function openAddCardPopup() {
    formCard.reset();
    clearingForm();
    openPopup(popupСhangeCell);
}

function clearingForm() {
    errorElement.forEach((element) => {
        element.textContent = '';
    });
    inputElement.forEach((element) => {
        element.classList.remove('form__input_type_error');
    }); 
}

userChangesButton.addEventListener('click', openEditProfilePopup);
csrdChangesButton.addEventListener('click', openAddCardPopup);

popupCloseIcon.forEach (button => {
    button.addEventListener('click', function (evt){
        const elementClose = evt.target.closest('.popup');
        closePopup(elementClose);
});
});

//форма смены пользователя
function submitProfileForm (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
    closePopup(popupProfile);
}

formUser.addEventListener('submit', submitProfileForm);

//форма добавления карточки
function submitCardForm (evt) {
    evt.preventDefault();
    addCardFormValidator.disableSubmitButton (formCardButtonImage);
    renderInitialCards({
        name: formCardInputName.value,
        link: formCardInputimage.value
    });
    plaseInput.value = plaseInput.textContent;
    linkInput.value = linkInput.textContent;
    closePopup(popupСhangeCell);
}


formCard.addEventListener('submit', submitCardForm);

const addCardFormValidator = new FormValidator (validationConfig, formCard);
addCardFormValidator.enableValidation();

const editProfileFormValidator = new FormValidator (validationConfig, formUser);
editProfileFormValidator.enableValidation();