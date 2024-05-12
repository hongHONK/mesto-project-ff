import { openModal } from "./modal";

const cardTemplate = document.querySelector('#card-template').content;
const cardPopup = document.querySelector('.popup_type_image');
const cardPopupCaption = cardPopup.querySelector('.popup__caption');
const cardPopupImage = cardPopup.querySelector('.popup__image');

export function createCard (cardData, handleDelete, handleLike, onImageClick) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    const cardDelButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');

    cardTitle.textContent = cardData.name;
    cardImage.setAttribute('alt', cardData.name);
    cardImage.setAttribute('src', cardData.link);

    cardImage.addEventListener('click', () => onImageClick(cardPopup, cardElement))
    cardDelButton.addEventListener('click',() => handleDelete(cardElement));
    cardLikeButton.addEventListener('click',() => handleLike(cardLikeButton));;

    return cardElement
}

export function delCard(cardElement) {
    cardElement.remove();
}

export function toggleLike(LikeButton) {
    LikeButton.classList.toggle('card__like-button_is-active');
}

export function openImageModal(modalElem, card) {
    const cardTitle = card.querySelector('.card__title');
    const cardImage = card.querySelector('.card__image');
    
    cardPopupCaption.textContent = cardTitle.textContent;
    cardPopupImage.setAttribute('alt', cardImage.getAttribute('alt'));
    cardPopupImage.setAttribute('src', cardImage.getAttribute('src'));

    openModal(modalElem);
}