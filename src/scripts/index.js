import '../pages/index.css';
import { initialCards } from '../components/cards';
import { createCard, delCard, toggleLike } from '../components/card';
import { openModal, closeModal } from '../components/modal';
// @todo: DOM узлы
const container = document.querySelector('.content');
const profileSection = container.querySelector('.profile');
const profileTitle = profileSection.querySelector('.profile__title');
const profileDescription = profileSection.querySelector('.profile__description');
const cardsContainer = container.querySelector('.places__list');

const profileEditPopup = document.querySelector('.popup_type_edit');
const profileAddPopup = document.querySelector('.popup_type_new-card');
const cardPopup = document.querySelector('.popup_type_image');

const editForm = document.forms[0];
let nameInput = editForm.elements.name;
let descriptionInput = editForm.elements.description;

const addForm = document.forms[1];
const placeNameInput = addForm.elements[0];
const linkInput = addForm.elements.link;

// @todo: Вывести карточки на страницу
for (let i = 0; i < initialCards.length; i++) {
    const card = createCard(initialCards[i], delCard, toggleLike);
    cardsContainer.append(card);
}

profileSection.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('profile__edit-button')) {
        openProfileEditModal(profileEditPopup);
    }

    if (evt.target.classList.contains('profile__add-button')) {
        openImageAddModal(profileAddPopup);
    }
})

cardsContainer.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('card__image')) {
        openImageModal(cardPopup, evt.target);
    }
})

editForm.addEventListener('submit', handleEditSubmit);
addForm.addEventListener('submit', handleAddSubmit);

function openProfileEditModal(modalElem) {
    nameInput.value = profileTitle.textContent;
    descriptionInput.value = profileDescription.textContent;
    
    openModal(modalElem);
}

function openImageAddModal(modalElem) {
    openModal(modalElem);
}

function openImageModal(modalElem, evtTarget) {
    const card = evtTarget.closest('.card');
    const cardTitle = card.querySelector('.card__title');
    const cardImage = card.querySelector('.card__image');
    const popupCaption = modalElem.querySelector('.popup__caption');
    const popupImage = modalElem.querySelector('.popup__image');
    
    popupCaption.textContent = cardTitle.textContent;
    popupImage.setAttribute('alt', cardImage.getAttribute('alt'));
    popupImage.setAttribute('src', cardImage.getAttribute('src'));

    openModal(modalElem);
}

function handleEditSubmit(evt) {
    evt.preventDefault();

    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;

    closeModal();

    nameInput.value = '';
    descriptionInput.value = '';
}

function handleAddSubmit(evt) {
    evt.preventDefault();
    
    closeModal();
    const card = createCard({ name: placeNameInput.value, link: linkInput.value }, delCard, toggleLike);
    cardsContainer.append(card);

    placeNameInput.value = '';
    linkInput.value = '';
}