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

const popup = document.querySelector('.popup');
let nameInput = document.querySelector('.popup__input_user_name');
let jobInput = document.querySelector('.popup__input_user_job');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let nameInputText = nameInput.value;
let jobInputText = jobInput.value;

initialCards.forEach

// лайки
document.querySelectorAll('.cell__heart').forEach (button => {
    button.addEventListener('click', (evt) => {
        evt.preventDefault();
        evt.target.classList.toggle('cell__heart_black');
    })});

// удаление карточек    
document.querySelectorAll('.cell__basket').forEach (button => {
    button.addEventListener('click', (evt) =>{
        evt.preventDefault();
        evt.target.parentElement.remove();
    })});    

function togglePopup() {
    popup.classList.toggle('popup_opened');
    if(popup.classList.contains('popup_opened')){
        nameInput.value = profileName.textContent
        jobInput.value = profileProfession.textContent
    }
    
}

document.querySelector('.profile__changes-button').addEventListener('click', togglePopup);
document.querySelector('.popup__close-icon').addEventListener('click', togglePopup);

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