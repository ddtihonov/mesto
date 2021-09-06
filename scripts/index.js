import {initialCards} from './initial-cards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js'
//import openPopup from '../utils/utils.js';
const validationConfig = {
    formSelector: '.form',
    formInputSelector: '.form__input',
    formButtonSelector: '.form__button',
    formButtonDisabled: 'form__button_disabled',
    formInputTypeError: 'form__input_type_error',
    formInputErrorActive: 'form__input-error_active'
};
const editProfileForm = document.querySelector('.form__user'); 
const addCardForm = document.querySelector('.form__card'); 
const userChangesButton = document.querySelector('.profile__changes-button');
const csrdChangesButton = document.querySelector('.profile__add-button');
const popupCloseIcon = document.querySelectorAll('.popup__close-icon')
const form = document.querySelectorAll('.form');
const tableCells = document.querySelector('.table__cells');
const popupProfile = document.querySelector('.popup-profile');
const popupСhangeCell = document.querySelector('.popup-cells');
const formUser = document.forms.user;
const formCard = document.forms.card;
const formCardInputName = formCard.querySelector('.form__input_place_name');
const formCardInputimage = formCard.querySelector('.form__input_place_image');
const formCardButton = formCard.querySelector('.form__button');
const nameInput = formUser.elements.name;
const jobInput = formUser.elements.job;
const plaseInput = formCard.elements.title;
const linkInput = formCard.elements.image;
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
//const image = document.querySelector('.popup__image');
const key = "Escape";


renderInitialCards(...initialCards)

function renderInitialCards(...element){
    element.forEach((element) => {
        const card = new Card(element.name, element.link);
        const cardElement = card.generateCard();
        tableCells.prepend(cardElement);
    }); 
}


// данные popup смены пользователя
function openEditProfilePopup() {
    nameInput.value = profileName.textContent
    jobInput.value = profileProfession.textContent
    openPopup(popupProfile);
}

// данные popup добавления карточки
function openAddCardPopup() {
    openPopup(popupСhangeCell);
} 

// открытие всех popup
export default function openPopup (element) {
    element.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc);
    element.addEventListener('click', closeOverlay);
}

function closeByEsc(evt) {
    if (evt.key === key) {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup); 
    }
} 

function closeOverlay (evt){
    if (evt.target.classList.contains('popup')) {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup); 
    }
}

userChangesButton.addEventListener('click', openEditProfilePopup);
csrdChangesButton.addEventListener('click', openAddCardPopup);

//закрытие всех popup
function closePopup(element) {
    element.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
    element.removeEventListener('click', closeOverlay);
}

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
    renderInitialCards({
        name: formCardInputName.value,
        link: formCardInputimage.value
    });
    plaseInput.value = plaseInput.textContent;
    linkInput.value = linkInput.textContent;
    disableSubmitButton ()
    closePopup(popupСhangeCell);
}


formCard.addEventListener('submit', submitCardForm);

const addCardFormValidator = new FormValidator (validationConfig, addCardForm);
addCardFormValidator.enableValidation()

const editProfileFormValidator = new FormValidator (validationConfig, editProfileForm);
editProfileFormValidator.enableValidation()