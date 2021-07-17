//let Heart = document.querySelectorAll('.table__heart');

//console.log(Heart);

//function HeartChange () {
//    Heart.src = 'images/Union.png';
//}

//Heart.addEventListener('click', HeartChange);

const  ProfileEditButton = document.querySelector('.profile__edit-button');
const CloseIcon = document.querySelector('.close-icon');
const Popup = document.querySelector('.popup');

function TogglePopup() {
    Popup.classList.toggle('popup_opened');
}

ProfileEditButton.addEventListener('click', TogglePopup);
CloseIcon.addEventListener('click', TogglePopup);

let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_job');
function formSubmitHandler (evt) {
    evt.preventDefault(); 
    let nameInputText = nameInput.value;
    let jobInputText = jobInput.value;
    let ProfileName = document.querySelector('.profile__name');
    let ProfileProfession = document.querySelector('.profile__profession');
    ProfileName.textContent = nameInputText;
    ProfileProfession.textContent = jobInputText;
    nameInput.value = ' ';
    jobInput.value = ' ';
}

formElement.addEventListener('submit', formSubmitHandler); 