import '../pages/index.css';
import { initialCards } from '../components/cards';
import { createCard, delCard, toggleLike } from '../components/card';
import { openModal, closeModal, setCloseModalByClickListeners } from '../components/modal';

const container = document.querySelector('.content');
const profileSection = container.querySelector('.profile');
const profileTitle = profileSection.querySelector('.profile__title');
const profileDescription = profileSection.querySelector('.profile__description');
const profileEditBtn = profileSection.querySelector('.profile__edit-button');
const profileAddBtn = profileSection.querySelector('.profile__add-button');

const cardsContainer = container.querySelector('.places__list');

const profileEditPopup = document.querySelector('.popup_type_edit');
const profileAddPopup = document.querySelector('.popup_type_new-card');
const cardPopup = document.querySelector('.popup_type_image');

const editForm = document.querySelector('form[name = "edit-profile"]');
const nameInput = editForm.querySelector('input[name = "name"]');
const descriptionInput = editForm.querySelector('input[name = "description"]');

const addForm = document.querySelector('form[name = "new-place"]');
const placeNameInput = addForm.querySelector('input[name = "place-name"]');
const linkInput = addForm.querySelector('input[name = "link"]');

const cardPopupCaption = cardPopup.querySelector('.popup__caption');
const cardPopupImage = cardPopup.querySelector('.popup__image');

for (const cardData of initialCards) {
    const card = createCard(cardData, delCard, toggleLike, openImageModal);
    cardsContainer.append(card);
}

setCloseModalByClickListeners([profileEditPopup, profileAddPopup, cardPopup]);

function openProfileEditModal() {
    nameInput.value = profileTitle.textContent;
    descriptionInput.value = profileDescription.textContent;
    openModal(profileEditPopup);
}

function openAddCardModal() {
    openModal(profileAddPopup);
}

function openImageModal(cardData) {
    const cardTitle = cardData.querySelector('.card__title');
    const cardImage = cardData.querySelector('.card__image');
    
    cardPopupCaption.textContent = cardTitle.textContent;
    cardPopupImage.setAttribute('alt', cardImage.getAttribute('alt'));
    cardPopupImage.setAttribute('src', cardImage.getAttribute('src'));

    openModal(cardPopup);
}

function handleEditSubmit(evt) {
    evt.preventDefault();

    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;

    closeModal(profileEditPopup);

    editForm.reset();
}

function handleAddSubmit(evt) {
    evt.preventDefault();
    
    closeModal(profileAddPopup);
    const card = createCard({ name: placeNameInput.value, link: linkInput.value }, delCard, toggleLike, openImageModal);
    cardsContainer.prepend(card);

    addForm.reset();
}

profileEditBtn.addEventListener('click', openProfileEditModal);
profileAddBtn.addEventListener('click', openAddCardModal);

editForm.addEventListener('submit', handleEditSubmit);
addForm.addEventListener('submit', handleAddSubmit);