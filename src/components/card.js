const cardTemplate = document.querySelector('#card-template').content;

export function createCard (item, handleDelete, handleLike) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    const cardDelButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');

    cardTitle.textContent = item.name;
    cardImage.setAttribute('alt', item.name);
    cardImage.setAttribute('src', item.link);

    cardDelButton.addEventListener('click', handleDelete);
    cardLikeButton.addEventListener('click', handleLike);;

    return cardElement
}

export function delCard(evt) {
    evt.target.closest('.card').remove();
}

export function toggleLike(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}