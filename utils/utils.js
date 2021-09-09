const key = "Escape";
export  function openPopup(element) {
    element.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc);
    element.addEventListener('click', closeOverlay);
    }

export  function closeByEsc(evt) {
        if (evt.key === key) {
            const openedPopup = document.querySelector('.popup_opened');
            closePopup(openedPopup); 
        }
    } 
    
export  function closeOverlay (evt){
        if (evt.target.classList.contains('popup')) {
            const openedPopup = document.querySelector('.popup_opened');
            closePopup(openedPopup); 
        }
    }
    
export  function closePopup(element) {
        element.classList.remove('popup_opened');
        document.removeEventListener('keydown', closeByEsc);
        element.removeEventListener('click', closeOverlay);
    }