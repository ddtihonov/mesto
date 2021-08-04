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
const nameInputText = nameInput.value;
const jobInputText = jobInput.value;
const initialCards = [
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
    cellElement.querySelector('.image-link').addEventListener('click', fillPopupImage);
    tableCells.append(cellElement);
})

// данные popup изображения
function fillPopupImage (evt) {
    const image = document.querySelector('.popup__image');
    image.src = evt.target.src
    image.alt = evt.target.alt
    document.querySelector('.popup__image-label').textContent = image.alt
    openPopup (popupImage);
};

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
};

// удаление карточек    
function deleteCell (evt){
    evt.target.parentElement.remove();
};    

// отурытие всех popup
function openPopup (element) {
    element.classList.add('popup_opened');
}

document.querySelector('.profile__changes-button').addEventListener('click', outputUser);
document.querySelector('.profile__add-button').addEventListener('click', outpuCell);

//закрытие всех popup
function closePopup(evt) {
    evt.target.closest('.popup').classList.remove('popup_opened');
}

document.querySelectorAll('.popup__close-icon').forEach (button => {
    button.addEventListener('click', closePopup);
})

//форма смены пользователя
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
    closePopup(evt);
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
        cellElement.querySelector('.image-link').addEventListener('click', fillPopupImage);
        tableCells.prepend(cellElement);
    plaseInput.value = plaseInput.textContent;
    linkInput.value = linkInput.textContent;
    closePopup(evt);
};

formElementCell.addEventListener('submit', formSubmitCell);