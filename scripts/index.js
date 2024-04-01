// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');
// @todo: Функция создания карточки
function createCard (item, handleDelete) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    const cardDelButton = cardElement.querySelector('.card__delete-button');

    cardTitle.textContent = item.name;
    cardImage.setAttribute('alt', item.name);
    cardImage.setAttribute('src', item.link);

    cardDelButton.addEventListener('click', handleDelete);

    return cardElement
}
// @todo: Функция удаления карточки
function delCard(event) {
    event.target.closest('.card').remove();
}
// @todo: Вывести карточки на страницу
for (let i = 0; i < initialCards.length; i++) {
    const card = createCard(initialCards[i], delCard);
    cardsContainer.append(card);
}