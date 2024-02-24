import { initialCards } from "./cards";
import { createCard, deleteCard, likeCard } from "./components/card";
import {
  openModal,
  closeModal,
  openImage,
  insertProfileInfo,
} from "./components/modal";
import { handleFormSubmit, resetFormValue } from "./components/submit";
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
  resetFormValue();
});
addCardPopupCloseButton.addEventListener("click", () => {
  closeModal(addCardPopup);
  resetFormValue();
});

formProfileEdit.addEventListener("submit", handleFormSubmit);

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
