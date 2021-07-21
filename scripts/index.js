const  profileChangesButton = document.querySelector('.profile__changes-button');
const closeIcon = document.querySelector('.popup__close-icon');
const popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__input_user_name');
let jobInput = document.querySelector('.popup__input_user_job');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let nameInputText = nameInput.value;
let jobInputText = jobInput.value;

function togglePopup() {
    popup.classList.toggle('popup_opened');
    if(popup.classList.contains('popup_opened')){
        nameInput.value = profileName.textContent
        jobInput.value = profileProfession.textContent
    }
    
}

profileChangesButton.addEventListener('click', togglePopup);
closeIcon.addEventListener('click', togglePopup);

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