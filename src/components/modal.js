export function openModal(modalElem) {
    const closeButton = modalElem.querySelector('.popup__close');
    
    modalElem.classList.add('popup_is-animated');
    setTimeout(() => modalElem.classList.add('popup_is-opened'), 0);
    modalElem.addEventListener('click', overlayHandler);
    closeButton.addEventListener('click', closeModal);
    document.addEventListener('keydown', keyHandler);
}

export function closeModal() {
    const openedPopup = document.querySelector('.popup_is-opened');
    const openedPopupCloseBtn = openedPopup.querySelector('.popup__close');
        
    openedPopup.classList.remove('popup_is-opened');
    setTimeout(() => openedPopup.classList.remove('popup_is-animated'), 600);
    openedPopup.removeEventListener('click', overlayHandler);
    openedPopupCloseBtn.removeEventListener('click', closeModal);
    document.removeEventListener('keydown', keyHandler);
}

function overlayHandler(event) {
    if (event.currentTarget === event.target) closeModal();
}

function keyHandler(event) {
    if (event.key === 'Escape') closeModal();
}