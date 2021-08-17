const cellTemplate = document.querySelector('.cell-template').content;
const tableCells = document.querySelector('.table__cells');
const popup = document.querySelector('.popup-profile');
const popupСhangeCell = document.querySelector('.popup-cells');
const popupImage = document.querySelector('.popup-image');
const formUser = document.forms.user;
const formCard = document.forms.card;
const formCardButton = formCard.querySelector('.form__button');
const nameInput = formUser.elements.name;
const jobInput = formUser.elements.job;
const plaseInput = formCard.elements.title;
const linkInput = formCard.elements.image;
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const nameInputText = nameInput.value;
const jobInputText = jobInput.value;
const image = document.querySelector('.popup__image');
const key = "Escape";

doCell(...initialCards)

function doCell(...element){
element.forEach(addCard)
}

//создание карточек
function createCard(card) {
    const cellElement = cellTemplate.cloneNode(true);
    const cellElementImage = cellElement.querySelector('.cell__image')
    cellElement.querySelector('.cell__caption').textContent = card.name;
    cellElementImage.src = card.link;
    cellElementImage.alt = card.name;
    cellElement.querySelector('.cell__heart').addEventListener('click', like);
    cellElement.querySelector('.cell__basket').addEventListener('click', deleteCell);
    cellElement.querySelector('.cell__image-link').addEventListener('click', fillPopupImage);
    return cellElement;
}

//добавление карточек
function addCard(cellElement) {
    tableCells.prepend(createCard(cellElement));
}

// данные popup изображения
function fillPopupImage (evt) {
    image.src = evt.target.src
    image.alt = evt.target.alt
    document.querySelector('.popup__image-label').textContent = image.alt
    openPopup (popupImage);
}

// данные popup смены пользователя
function outputUser() {
    nameInput.value = profileName.textContent
    jobInput.value = profileProfession.textContent
    openPopup(popup);
}

// данные popup добавления карточки
function outpuCell() {
    openPopup(popupСhangeCell);
}
// лайки
function like (evt) {
    evt.target.classList.toggle('cell__heart_black');
}

// удаление карточек    
function deleteCell (evt){
    evt.target.closest('.cell').remove();
}    

// открытие всех popup
function openPopup (element) {
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
    const elementClose = evt.target.closest('.popup')
    closePopup(elementClose);
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
    const elementClose = evt.target.closest('.popup')
    formCardButton.classList.add('form__button_disabled');
    formCardButton.setAttribute('disabled', false)
    closePopup(elementClose);
}

formCard.addEventListener('submit', submitCardForm);