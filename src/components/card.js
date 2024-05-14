const cardTemplate = document.querySelector('#card-template').content;

export function createCard (cardData, handleDelete, handleLike, onImageClick) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    const cardDelButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');

    cardTitle.textContent = cardData.name;
    cardImage.setAttribute('alt', cardData.name);
    cardImage.setAttribute('src', cardData.link);

    cardImage.addEventListener('click', () => onImageClick(cardElement))
    cardDelButton.addEventListener('click',() => handleDelete(cardElement));
    cardLikeButton.addEventListener('click',() => handleLike(cardLikeButton));;

    return cardElement
}

export function delCard(cardElement) {
    cardElement.remove();
}

export function toggleLike(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
}