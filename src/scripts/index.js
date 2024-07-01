import '../pages/index.css';
import { createCard, handleDelete, handleLike } from '../components/card';
import { openModal, closeModal, setCloseModalByClickListeners } from '../components/modal';
import { enableValidation, clearValidation } from '../components/validation';
import { getUserData, getInitialCards, patchUserData, postCard, patchUserAvatar } from '../components/api';

const container = document.querySelector('.content');
const profileSection = container.querySelector('.profile');
const profileTitle = profileSection.querySelector('.profile__title');
const profileDescription = profileSection.querySelector('.profile__description');
const profileImage = profileSection.querySelector('.profile__image');
const profileEditBtn = profileSection.querySelector('.profile__edit-button');
const profileAddBtn = profileSection.querySelector('.profile__add-button');

const cardsContainer = container.querySelector('.places__list');

const profileEditPopup = document.querySelector('.popup_type_edit');
const profileAddPopup = document.querySelector('.popup_type_new-card');
const cardPopup = document.querySelector('.popup_type_image');
const avatarEditPopup = document.querySelector('.popup_type_avatar');

const editForm = document.querySelector('form[name = "edit-profile"]');
const nameInput = editForm.querySelector('input[name = "name"]');
const descriptionInput = editForm.querySelector('input[name = "description"]');

const addForm = document.querySelector('form[name = "new-place"]');
const placeNameInput = addForm.querySelector('input[name = "place-name"]');
const linkInput = addForm.querySelector('input[name = "link"]');

const avatarForm = document.querySelector('form[name = "edit-avatar"]');
const avatarLinkInput = avatarForm.querySelector('input[name = "avatar-link"]');

const cardPopupCaption = cardPopup.querySelector('.popup__caption');
const cardPopupImage = cardPopup.querySelector('.popup__image');

let userId = null;

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

function getAndSaveUserId() {
    getUserData()
    .then(res => {
        userId = res['_id'];
    })
    .catch(err => console.log(err));
}

function renderInitialCardsAndUserData() {
    Promise.all([getUserData(), getInitialCards()])
        .then(value => {
            const userData = value[0];
            const cardList = value[1];
            renderUserData(userData);
            cardList.forEach(cardData => {
                renderCard(cardData, 'append');
            })
        })
        .catch(err => {
            console.log(err);
        })
}

function renderUserData(userData) {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
}

function renderCard(cardData, method) {
    const cardElement = createCard(cardData, userId, handleDelete, handleLike, openImageModal);
    
    switch (method) {
        case 'append': 
            cardsContainer.append(cardElement);
            break;
        case 'prepend':
            cardsContainer.prepend(cardElement);
            break;
    }
}

function renderLoading(formElement, isLoading) {
    const buttonElement = formElement.querySelector('.popup__button');
    
    if (isLoading) {
        buttonElement.textContent = 'Сохранение...';
    } else {
        buttonElement.textContent = 'Сохранить';
    }
}

function openProfileEditModal() {
    nameInput.value = profileTitle.textContent;
    descriptionInput.value = profileDescription.textContent;
    
    clearValidation(editForm, validationConfig);
    openModal(profileEditPopup);
}

function openAddCardModal() {
    clearValidation(addForm, validationConfig);
    openModal(profileAddPopup);
}

function openAvatarEditModal() {
    clearValidation(avatarForm, validationConfig);
    openModal(avatarEditPopup);
} 

function openImageModal(cardTitle, cardImage) {    
    cardPopupCaption.textContent = cardTitle.textContent;
    cardPopupImage.setAttribute('alt', cardImage.getAttribute('alt'));
    cardPopupImage.setAttribute('src', cardImage.getAttribute('src'));

    openModal(cardPopup);
}

function handleEditSubmit(evt) {
    evt.preventDefault();

    const userData = {
        name: nameInput.value,
        about: descriptionInput.value
    };

    renderLoading(evt.target, true);

    patchUserData(userData)
    .then(userData => {
        renderUserData(userData);
        closeModal(profileEditPopup);
        editForm.reset();
    })
    .catch(err => {
        console.log(err);
    })
    .finally(() => {
        renderLoading(evt.target, false);
    });
}

function handleAddSubmit(evt) {
    evt.preventDefault();
    
    const cardData = {
        name: placeNameInput.value,
        link: linkInput.value
    };

    renderLoading(evt.target, true);

    postCard(cardData)
    .then(cardData => {
        renderCard(cardData, 'prepend');
        closeModal(profileAddPopup);
        addForm.reset();
    })
    .catch(err => {
        console.log(err);
    })
    .finally(() => {
        renderLoading(evt.target, false);
    });
}

function handleAvatarSubmit(evt) {
    evt.preventDefault();

    const avatarLink = avatarLinkInput.value;
    renderLoading(evt.target, true);

    patchUserAvatar(avatarLink)
    .then(() => {
        profileImage.style.backgroundImage = `url(${avatarLink})`;
        closeModal(avatarEditPopup);
        avatarForm.reset();
    })
    .catch(err => {
        console.log(err);
    })
    .finally(() => {
        renderLoading(evt.target, false);
    });
}

setCloseModalByClickListeners([profileEditPopup, profileAddPopup, cardPopup, avatarEditPopup]);
getAndSaveUserId();
renderInitialCardsAndUserData();
enableValidation(validationConfig); 

profileEditBtn.addEventListener('click', openProfileEditModal);
profileAddBtn.addEventListener('click', openAddCardModal);
profileImage.addEventListener('click', openAvatarEditModal);

editForm.addEventListener('submit', handleEditSubmit);
addForm.addEventListener('submit', handleAddSubmit);
avatarForm.addEventListener('submit', handleAvatarSubmit);