import { createCard, deleteCard, likeCard } from "./card";
import { openModal, closeModal, renderLoading } from "./modal";
import { enableValidation, clearValidation } from "./validation";
import {
  loadingCardsData,
  loadingUserData,
  submitUserData,
  submitNewCard,
  handleEditAvatar,
} from "./api";
import "../pages/index.css";

const cardsContainer = document.querySelector(".places__list");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditPopup = document.querySelector(".popup_type_edit");
const profileEditPopupCloseButton =
  profileEditPopup.querySelector(".popup__close");

const formProfileEdit = document.forms["edit-profile"];
const nameProfile = document.querySelector(".profile__title");
const jobProfile = document.querySelector(".profile__description");
const nameInput = document.forms["edit-profile"].name;
const jobInput = document.forms["edit-profile"].description;

const profileImage = document.querySelector(".profile__image");
const profileImagePopup = document.querySelector(".popup__type_edit_avatar");
const profileImagePopupCloseButton =
  profileImagePopup.querySelector(".popup__close");

const formProfileImageEdit = document.forms["edit-avatar"];
const profileImageInput = formProfileImageEdit["link"];

const addCardButton = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector(".popup_type_new-card");
const addCardPopupCloseButton = addCardPopup.querySelector(".popup__close");

const formAddCard = document.forms["new-place"];
const placeInput = formAddCard["place-name"];
const linkInput = formAddCard.link;

const popupImg = document.querySelector(".popup_type_image");
const popupImgCloseButton = popupImg.querySelector(".popup__close");
const popupImgImage = popupImg.querySelector(".popup__image");
const popupImgCaption = popupImg.querySelector(".popup__caption");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button-disabled",
  inputErrorClass: "popup__input-error",
  errorClass: "popup__input_type-error-active",
};

function insertProfileInfo() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

function openImage(openModal, cardData) {
  popupImgImage.src = cardData.link;
  popupImgImage.alt = cardData.name;
  popupImgCaption.textContent = cardData.name;
  openModal(popupImg);
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, profileEditPopup);
  submitUserData(nameInput, jobInput)
    .then(() => {
      nameProfile.textContent = nameInput.value;
      jobProfile.textContent = jobInput.value;
    })
    .finally(() => {
      closeModal(profileEditPopup);
      renderLoading(false, profileEditPopup);
    });
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, addCardPopup);
  const cardData = {
    name: placeInput.value,
    link: linkInput.value,
  };
  submitNewCard(cardData)
    .then((data) => {
      const card = createCard(data, deleteCard, likeCard, openImage);
      cardsContainer.prepend(card);
    })
    .finally(() => {
      closeModal(addCardPopup);
      renderLoading(false, addCardPopup);
    });
}

function handleEditAvatarSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, profileImagePopup);
  handleEditAvatar(profileImageInput)
    .then((userData) => {
      profileImage.style["background-image"] = `url('${userData.avatar}')`;
    })
    .finally(() => {
      closeModal(profileImagePopup);
      renderLoading(false, profileImagePopup);
    });
}

function resetFormValue() {
  document.forms["edit-profile"].reset();
  document.forms["new-place"].reset();
  document.forms["edit-avatar"].reset();
}

profileEditButton.addEventListener("click", () => {
  insertProfileInfo();
  clearValidation(profileEditPopup, validationConfig);
  openModal(profileEditPopup);
});
profileImage.addEventListener("click", () => {
  resetFormValue();
  clearValidation(profileImagePopup, validationConfig);
  openModal(profileImagePopup);
});
addCardButton.addEventListener("click", () => {
  resetFormValue();
  clearValidation(addCardPopup, validationConfig);
  openModal(addCardPopup);
});
profileEditPopupCloseButton.addEventListener("click", () => {
  closeModal(profileEditPopup);
  setTimeout(() => {
    resetFormValue();
  }, 600);
});
profileImagePopupCloseButton.addEventListener("click", () => {
  closeModal(profileImagePopup);
});
addCardPopupCloseButton.addEventListener("click", () => {
  closeModal(addCardPopup);
});

popupImgCloseButton.addEventListener("click", () => {
  closeModal(popupImg);
});

formProfileEdit.addEventListener("submit", handleEditFormSubmit);

formProfileImageEdit.addEventListener("submit", handleEditAvatarSubmit);

formAddCard.addEventListener("submit", handleAddCardFormSubmit);

enableValidation(validationConfig);

Promise.all([loadingCardsData(), loadingUserData()]).then(
  ([cardsData, userData]) => {
    cardsData.forEach((card) => {
      cardsContainer.append(createCard(card, deleteCard, likeCard, openImage));
    });
    nameProfile.textContent = userData.name;
    jobProfile.textContent = userData.about;
    profileImage.style["background-image"] = `url('${userData.avatar}')`;
  }
);
