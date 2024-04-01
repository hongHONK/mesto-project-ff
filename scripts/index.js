// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');
// @todo: Функция создания карточки
function addCard (nameValue, imageValue) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = nameValue;
    cardElement.querySelector('.card__image').setAttribute('alt', nameValue);
    cardElement.querySelector('.card__image').setAttribute('src', imageValue);

    cardElement.querySelector('.card__delete-button').addEventListener('click', delCard);

    cardsContainer.append(cardElement);
}
// @todo: Функция удаления карточки
function delCard(event) {
    event.target.parentElement.remove();
}
// @todo: Вывести карточки на страницу
for (let i = 0; i < initialCards.length; i++) {
    addCard(initialCards[i].name, initialCards[i].link);
}