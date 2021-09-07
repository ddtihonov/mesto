import {initialCards} from './initial-cards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js'
import Popup from '../utils/utils.js';
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
const cardChangesButton = document.querySelector('.profile__add-button');
const popupCloseIcon = document.querySelectorAll('.popup__close-icon')
const tableCells = document.querySelector('.table__cells');
const popupProfile = document.querySelector('.popup-profile');
const popupСhangeCell = document.querySelector('.popup-cells');
const formUser = document.forms.user;
const formCard = document.forms.card;
const formCardInputName = formCard.querySelector('.form__input_place_name');
const formCardInputimage = formCard.querySelector('.form__input_place_image');
const formCardButtonImage = formCard.querySelector('.form__button-image');
const nameInput = formUser.elements.name;
const jobInput = formUser.elements.job;
const plaseInput = formCard.elements.title;
const linkInput = formCard.elements.image;
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const image = document.querySelector('.popup__image');


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
    editProfileForm.reset();
    nameInput.value = profileName.textContent
    jobInput.value = profileProfession.textContent
    const popup = new Popup({
        popupSelector: popupProfile
    });
    popup.openPopup();
}

// данные popup добавления карточки
function openAddCardPopup() {
    addCardForm.reset();
    const popup = new Popup({
        popupSelector: popupСhangeCell
    });
    popup.openPopup();
}

userChangesButton.addEventListener('click', openEditProfilePopup);
cardChangesButton.addEventListener('click', openAddCardPopup);

//закрытие крестик
popupCloseIcon.forEach (button => {
    button.addEventListener('click', function (evt){
        const elementClose = evt.target.closest('.popup');
        const popup = new Popup({
            popupSelector: elementClose
        });
        popup.closePopup();
});
});

//форма смены пользователя
function submitProfileForm (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
    const popup = new Popup({
        popupSelector: popupProfile
    });
    popup.closePopup();
}

formUser.addEventListener('submit', submitProfileForm);

//форма добавления карточки
function submitCardForm (evt) {
    evt.preventDefault();
    addCardFormValidator.disableSubmitButton (formCardButtonImage)
    renderInitialCards({
        name: formCardInputName.value,
        link: formCardInputimage.value
    });
    plaseInput.value = plaseInput.textContent;
    linkInput.value = linkInput.textContent;
    const popup = new Popup({
        popupSelector: popupСhangeCell
    });
    popup.closePopup();
}


formCard.addEventListener('submit', submitCardForm);

const addCardFormValidator = new FormValidator (validationConfig, addCardForm);
addCardFormValidator.enableValidation()

const editProfileFormValidator = new FormValidator (validationConfig, editProfileForm);
editProfileFormValidator.enableValidation()