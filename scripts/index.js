import {initialCards} from './initial-cards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js'
const form = document.querySelectorAll('.form');
const tableCells = document.querySelector('.table__cells');
const popupProfile = document.querySelector('.popup-profile');
const popupСhangeCell = document.querySelector('.popup-cells');
const formUser = document.forms.user;
const formCard = document.forms.card;
const formCardButton = formCard.querySelector('.form__button');
const nameInput = formUser.elements.name;
const jobInput = formUser.elements.job;
const plaseInput = formCard.elements.title;
const linkInput = formCard.elements.image;
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const image = document.querySelector('.popup__image');
const key = "Escape";

doCell(...initialCards)

function doCell(...element){
    element.forEach((element) => {
        const card = new Card(element.name, element.link);
        const cardElement = card.generateCard();
        tableCells.prepend(cardElement);
    }); 
}


// данные popup смены пользователя
function outputUser() {
    nameInput.value = profileName.textContent
    jobInput.value = profileProfession.textContent
    openPopup(popupProfile);
}

// данные popup добавления карточки
function outpuCell() {
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
        const closedPopup = document.querySelector('.popup_opened');
        closePopup(closedPopup); 
    }
} 

function closeOverlay (evt){
    if (evt.target.classList.contains('popup')) {
        const closedPopup = document.querySelector('.popup_opened');
        closePopup(closedPopup); 
    }
}

document.querySelector('.profile__changes-button').addEventListener('click', outputUser);
document.querySelector('.profile__add-button').addEventListener('click', outpuCell);

//закрытие всех popup
function closePopup(element) {
    element.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
    element.removeEventListener('click', closeOverlay);
}

document.querySelectorAll('.popup__close-icon').forEach (button => {
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
    doCell({
        name: formCard.querySelector('.form__input_place_name').value,
        link: formCard.querySelector('.form__input_place_image').value
    });
    plaseInput.value = plaseInput.textContent;
    linkInput.value = linkInput.textContent;
    formCardButton.classList.add('form__button_disabled');
    formCardButton.setAttribute('disabled', false)
    closePopup(popupСhangeCell);
}

formCard.addEventListener('submit', submitCardForm);

form.forEach((formElement) => {
    const objectFormValidator = new FormValidator({
    formInputSelector: '.form__input',
    formButtonSelector: '.form__button',
    formButtonDisabled: 'form__button_disabled',
    formInputTypeError: 'form__input_type_error',
    formInputErrorActive: 'form__input-error_active' 
    }, formElement)
    objectFormValidator.enableValidation()
}) 