const  ProfileChangesButton = document.querySelector('.profile__changes-button');
const CloseIcon = document.querySelector('.popup__close-icon');
const Popup = document.querySelector('.popup');
let FormElement = document.querySelector('.popup__container');
let NameInput = document.querySelector('.input-name');
let JobInput = document.querySelector('.input-job');
let ProfileName = document.querySelector('.profile__name');
let ProfileProfession = document.querySelector('.profile__profession');
let NameInputText = NameInput.value;
let JobInputText = JobInput.value;

function TogglePopup() {
    Popup.classList.toggle('popup_opened');
    if(document.querySelector('.popup').classList.contains('popup_opened')){
        NameInput.value = ProfileName.textContent
        JobInput.value = ProfileProfession.textContent
    }
    
}

ProfileChangesButton.addEventListener('click', TogglePopup);
CloseIcon.addEventListener('click', TogglePopup);

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    NameInputText = NameInput.value;
    JobInputText = JobInput.value;
    ProfileName.textContent = NameInputText;
    ProfileProfession.textContent = JobInputText;
    NameInput.value = ' ';
    JobInput.value = ' ';
}

FormElement.addEventListener('submit', formSubmitHandler);