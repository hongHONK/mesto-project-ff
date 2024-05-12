export function openModal(modalElem) {
    // const closeButton = modalElem.querySelector('.popup__close');
    
    modalElem.classList.add('popup_is-opened');
    // modalElem.addEventListener('click', handleOverlay);
    // closeButton.addEventListener('click', closeModal);
    document.addEventListener('keydown', handleKey);
}

export function closeModal(modalElem) {
    // const openedPopup = document.querySelector('.popup_is-opened');
    // const openedPopupCloseBtn = openedPopup.querySelector('.popup__close');
        
    modalElem.classList.remove('popup_is-opened');
    // openedPopup.removeEventListener('click', handleOverlay);
    // openedPopupCloseBtn.removeEventListener('click', closeModal);
    document.removeEventListener('keydown', handleKey);
}

function handleOverlay(evt) {
    if (evt.currentTarget === evt.target) closeModal(evt.currentTarget);
}

function handleKey(evt) {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (evt.key === 'Escape') closeModal(openedPopup);
}

export function setCloseModalByClickListeners(popupList) {
    popupList.forEach(popup => {
        const closeButton = popup.querySelector('.popup__close');

        closeButton.addEventListener('click', () => closeModal(popup));
        popup.addEventListener('click', handleOverlay);
    })
} 