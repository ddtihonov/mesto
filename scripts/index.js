const cellTemplate = document.querySelector('.cell-template').content;
const tableCells = document.querySelector('.table__cells');
const popup = document.querySelector('.popup');
const popupСhangeCell = document.querySelector('.popup-cells');
const popupImage = document.querySelector('.popup-image');
const formElement = document.querySelector('.popup__container');
const formElementCell = document.querySelector('.popup__container_cell_exchange');
const nameInput = document.querySelector('.popup__input_user_name');
const jobInput = document.querySelector('.popup__input_user_job');
const plaseInput = document.querySelector('.popup__input_place_name');
const linkInput = document.querySelector('.popup__input_place_image'); 
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
let nameInputText = nameInput.value;
let jobInputText = jobInput.value;
let initialCards = [
    {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
]; 

//создание карточек
initialCards.forEach(function (element) {
    const cellElement = cellTemplate.cloneNode(true);
    cellElement.querySelector('.cell__caption').textContent = element.name;
    cellElement.querySelector('.cell__image').src = element.link;
    cellElement.querySelector('.cell__image').alt = element.name;
    cellElement.querySelector('.cell__heart').addEventListener('click', like);
    cellElement.querySelector('.cell__basket').addEventListener('click', deleteCell);
    cellElement.querySelector('.image-link').addEventListener('click', openPopupImage);
    tableCells.append(cellElement);
})

// открытие popup изображения
function openPopupImage (evt) {
    popupImage.classList.toggle('popup_opened');
    const image = document.querySelector('.popup__image');
    image.src = evt.target.src
    image.alt = evt.target.alt
    document.querySelector('.popup__image-label').textContent = image.alt
};

// лайки
function like (evt) {
    evt.target.classList.toggle('cell__heart_black');
};

// удаление карточек    
function deleteCell (evt){
    evt.target.parentElement.remove();
};    

// открытие popup данные пользователя
function togglePopup() {
    popup.classList.toggle('popup_opened');
    if(popup.classList.contains('popup_opened')){
        nameInput.value = profileName.textContent
        jobInput.value = profileProfession.textContent
    }
}

// отурытие popup новая карточка
function togglePopupCell () {
    popupСhangeCell.classList.toggle('popup_opened');
}

document.querySelector('.profile__changes-button').addEventListener('click', togglePopup);
document.querySelector('.profile__add-button').addEventListener('click', togglePopupCell);

//закрытие всех popup
document.querySelectorAll('.popup__close-icon').forEach (button => {
    button.addEventListener('click', (evt) => {
        evt.target.closest('.popup').classList.toggle('popup_opened');
    })});  

//форма смены пользователя
function formSubmitHandler (evt) {
    evt.preventDefault(); 
    nameInputText = nameInput.value;
    jobInputText = jobInput.value;
    profileName.textContent = nameInputText;
    profileProfession.textContent = jobInputText;
    nameInput.value = ' ';
    jobInput.value = ' ';
    togglePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
//форма добавления карточки
function formSubmitCell (evt) {
    evt.preventDefault();
    initialCards.unshift({
        name: formElementCell.querySelector('.popup__input_place_name').value,
        link: formElementCell.querySelector('.popup__input_place_image').value
    });
    const cellElement = cellTemplate.cloneNode(true);
        cellElement.querySelector('.cell__caption').textContent = formElementCell.querySelector('.popup__input_place_name').value;
        cellElement.querySelector('.cell__image').src = formElementCell.querySelector('.popup__input_place_image').value;
        cellElement.querySelector('.cell__image').alt = formElementCell.querySelector('.popup__input_place_name').value;
        cellElement.querySelector('.cell__heart').addEventListener('click', like);
        cellElement.querySelector('.cell__basket').addEventListener('click', deleteCell);
        cellElement.querySelector('.image-link').addEventListener('click', openPopupImage);
        tableCells.prepend(cellElement);
    plaseInput.value = plaseInput.innerText;
    linkInput.value = linkInput.innerText;
    evt.target.closest('.popup').classList.toggle('popup_opened');
};

formElementCell.addEventListener('submit', formSubmitCell);
