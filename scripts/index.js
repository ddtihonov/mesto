const  profileChangesButton = document.querySelector('.profile__changes-button');
const closeIcon = document.querySelector('.popup__close-icon');
const popup = document.querySelector('.popup');
const buttonDelete = document.querySelectorAll('.cell__basket');
let nameInput = document.querySelector('.popup__input_user_name');
let jobInput = document.querySelector('.popup__input_user_job');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let nameInputText = nameInput.value;
let jobInputText = jobInput.value;

document.querySelectorAll('.cell__heart').forEach (button => {
    button.addEventListener('click', like)});
    function like(evt) {
        console.log(evt);
        evt.preventDefault();
        evt.target.classList.toggle('cell__heart_black');
    }

document.querySelectorAll('.cell__basket').forEach (button => {
        button.addEventListener('click', deleteCell)});    
    function deleteCell(evt){
        evt.preventDefault();
        evt.target.parentElement.remove();
    }


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