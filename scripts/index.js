const cellTemplate = document.querySelector('.cell-template').content;
const tableCells = document.querySelector('.table__cells');
const popup = document.querySelector('.popup');
const popupСhangeCell = document.querySelector('.popup-cells');
const popupImage = document.querySelector('.popup-image');
const formUser = document.forms.user;
const formCard = document.forms.card;
const nameInput = formUser.elements.name;
const jobInput = formUser.elements.job;
const plaseInput = formCard.elements.title;
const linkInput = formCard.elements.image;
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const nameInputText = nameInput.value;
const jobInputText = jobInput.value;

doCell(...initialCards)

function doCell(...element){
element.forEach(addCard)
}

//создание карточек
function createCard(card) {
    const cellElement = cellTemplate.cloneNode(true);
    cellElement.querySelector('.cell__caption').textContent = card.name;
    cellElement.querySelector('.cell__image').src = card.link;
    cellElement.querySelector('.cell__image').alt = card.name;
    cellElement.querySelector('.cell__heart').addEventListener('click', like);
    cellElement.querySelector('.cell__basket').addEventListener('click', deleteCell);
    cellElement.querySelector('.image-link').addEventListener('click', fillPopupImage);
    return cellElement;
}

//добавление карточек
function addCard(cellElement) {
    tableCells.prepend(createCard(cellElement));
}

// данные popup изображения
function fillPopupImage (evt) {
    const image = document.querySelector('.popup__image');
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
    evt.target.parentElement.remove();
}    

// открытие всех popup
function openPopup (element) {
    element.classList.add('popup_opened');
    element.addEventListener('click', function (evt) {
        if (evt.target.classList.contains('popup')) {
            exchangeEvent(evt);
        }
    }); 
    listenerEsc (element);
}

// обработчик Escape
function listenerEsc (element) {
    document.addEventListener('keydown', function (evt){
        const key = evt.key;
        if (key === "Escape"){
            closePopup(element);
    }}); 
}

document.querySelector('.profile__changes-button').addEventListener('click', outputUser);
document.querySelector('.profile__add-button').addEventListener('click', outpuCell);

//закрытие всех popup
function closePopup(element) {
    element.classList.remove('popup_opened');
    document.removeEventListener('keydown', function (evt){
        const key = evt.key;
        if (key === "Escape"){
            closePopup(element);
    element.removeEventListener('click', function (evt) {
        if (evt.target.classList.contains('popup')) {
            exchangeEvent(evt);
        }
    });  
}}); 
}

document.querySelectorAll('.popup__close-icon').forEach (button => {
    button.addEventListener('click', exchangeEvent);
});

// событие = элемент
function exchangeEvent (evt){
    const element = evt.target.closest('.popup')
    closePopup(element);
}

//форма смены пользователя
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
    exchangeEvent(evt);
}

formUser.addEventListener('submit', formSubmitHandler);

//форма добавления карточки
function formSubmitCell (evt) {
    evt.preventDefault();
    const element = evt.target.closest('.popup')
    doCell({
        name: formCard.querySelector('.form__input_place_name').value,
        link: formCard.querySelector('.form__input_place_image').value
    });
    plaseInput.value = plaseInput.textContent;
    linkInput.value = linkInput.textContent;
    exchangeEvent(evt);
}

formCard.addEventListener('submit', formSubmitCell);