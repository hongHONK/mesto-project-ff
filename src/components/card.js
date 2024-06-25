import { deleteCard, deleteLikeStatus, putLikeStatus } from "./api";

const cardTemplate = document.querySelector('#card-template').content;

export function createCard (cardData, userIsOwner, cardIsLiked, handleDelete, handleLike, onImageClick) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    const cardDelButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const cardLikeCounter = cardElement.querySelector('.card__like-counter');

    cardElement.id = cardData['_id'];
    cardTitle.textContent = cardData.name;
    cardLikeCounter.textContent = cardData.likes.length;
    cardImage.setAttribute('alt', cardData.name);
    cardImage.setAttribute('src', cardData.link);

    cardImage.addEventListener('click', () => onImageClick(cardElement));
    cardLikeButton.addEventListener('click',() => handleLike(cardLikeButton, cardLikeCounter));

    if (userIsOwner) {
        cardDelButton.addEventListener('click',() => handleDelete(cardElement));
    } else {
        cardDelButton.remove();
    }

    if (cardIsLiked) {
        cardLikeButton.classList.add('card__like-button_is-active');
    }

    return cardElement;
}

export function handleDelete(cardElement) {
    deleteCard(cardElement.id)
    .catch(err => console.log(err))
    .finally(() => cardElement.remove());
}

export function handleLike(likeButton, likeCounter) {
    const cardId = likeButton.closest('.card').id;
    const cardIsLiked = likeButton.classList.contains('card__like-button_is-active');

    if (cardIsLiked) {
        likeButton.classList.remove('card__like-button_is-active');
        deleteLikeStatus(cardId)
        .then(cardData => {
            likeCounter.textContent = cardData.likes.length;
        })
        .catch(err => {
            console.log(err);
        });
    } else {
        likeButton.classList.add('card__like-button_is-active');
        putLikeStatus(cardId)
        .then(cardData => {
            likeCounter.textContent = cardData.likes.length;
        })
        .catch(err => {
            console.log(err);
        })
    }
}