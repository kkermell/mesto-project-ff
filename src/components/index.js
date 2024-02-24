import { initialCards } from "./cards";
import { createCard, deleteCard, likeCard } from "./card";
import { openModal, closeModal } from "./modal";
import "../pages/index.css";

const cardsContainer = document.querySelector(".places__list");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditPopup = document.querySelector(".popup_type_edit");
const profileEditPopupCloseButton =
  profileEditPopup.querySelector(".popup__close");

const addCardButton = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector(".popup_type_new-card");
const addCardPopupCloseButton = addCardPopup.querySelector(".popup__close");
const formProfileEdit = document.forms["edit-profile"];

const formAddCard = document.forms["new-place"];
const placeInput = formAddCard["place-name"];
const linkInput = formAddCard.link;

const nameProfile = document.querySelector(".profile__title");
const jobProfile = document.querySelector(".profile__description");
const nameInput = document.forms["edit-profile"].name;
const jobInput = document.forms["edit-profile"].description;

const popupImg = document.querySelector(".popup_type_image");
const popupImgCloseButton = popupImg.querySelector(".popup__close");

function insertProfileInfo() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

function openImage(openModal, closeModal, cardData) {
  const popupImgImage = popupImg.querySelector(".popup__image");
  const popupImgCaption = popupImg.querySelector(".popup__caption");

  popupImgImage.src = cardData.link;
  popupImgImage.alt = cardData.name;
  popupImgCaption.textContent = cardData.name;
  openModal(popupImg);
}

function handleEditFormSubmit(evt) {
  const nameProfile = document.querySelector(".profile__title");
  const jobProfile = document.querySelector(".profile__description");
  const openedPopup = document.querySelector(".popup_is-opened");

  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closeModal(openedPopup);
}

initialCards.forEach((cardData) => {
  const card = createCard(cardData, deleteCard, likeCard, openImage);
  cardsContainer.append(card);
});

profileEditButton.addEventListener("click", () => {
  insertProfileInfo();
  openModal(profileEditPopup);
});
addCardButton.addEventListener("click", () => {
  openModal(addCardPopup);
});
profileEditPopupCloseButton.addEventListener("click", () => {
  closeModal(profileEditPopup);
});
addCardPopupCloseButton.addEventListener("click", () => {
  closeModal(addCardPopup);
});

popupImgCloseButton.addEventListener("click", () => {
  closeModal(popupImg);
});

formProfileEdit.addEventListener("submit", handleEditFormSubmit);

formAddCard.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const cardData = {
    name: placeInput.value,
    link: linkInput.value,
  };
  const card = createCard(cardData, deleteCard, likeCard, openImage);
  cardsContainer.prepend(card);
  closeModal(addCardPopup);
});