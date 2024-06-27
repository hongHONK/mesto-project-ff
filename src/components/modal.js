export function openModal(modalElem) {
    modalElem.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleCloseModalByEsc);
}

export function closeModal(modalElem) {
    modalElem.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleCloseModalByEsc);
}

function handleCloseModalByOverlayClick(evt) {
    if (evt.currentTarget === evt.target) closeModal(evt.currentTarget);
}

function handleCloseModalByEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        closeModal(openedPopup);
    }
}

export function setCloseModalByClickListeners(popupList) {
    popupList.forEach(popup => {
        const closeButton = popup.querySelector('.popup__close');

        closeButton.addEventListener('click', () => closeModal(popup));
        popup.addEventListener('click', handleCloseModalByOverlayClick);
    })
} 