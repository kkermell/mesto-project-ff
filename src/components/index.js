import { createCard, deleteCard, likeCard } from "./card";
import {
  openModal,
  closeModal,
  renderLoading,
  closeHandleOverlay,
} from "./modal";
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

let userId;

function insertProfileInfo() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

function openImage(cardData) {
  popupImgImage.src = cardData.link;
  popupImgImage.alt = cardData.name;
  popupImgCaption.textContent = cardData.name;
  openModal(popupImg);
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, profileEditPopup);
  submitUserData(nameInput, jobInput)
    .then((data) => {
      nameProfile.textContent = data.name;
      jobProfile.textContent = data.about;
      closeModal(profileEditPopup);
      renderLoading(false, profileEditPopup);
    })
    .catch((err) => {
      console.log(err);
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
      const card = createCard(
        data,
        deleteCard,
        likeCard,
        openImage,
        openModal,
        userId
      );
      cardsContainer.prepend(card);
      closeModal(addCardPopup);
      renderLoading(false, addCardPopup);
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleEditAvatarSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, profileImagePopup);
  handleEditAvatar(profileImageInput)
    .then((userData) => {
      profileImage.style["background-image"] = `url('${userData.avatar}')`;
      closeModal(profileImagePopup);
      renderLoading(false, profileImagePopup);
    })
    .catch((err) => {
      console.log(err);
    });
}

function resetFormValue(form) {
  form.reset();
}

profileEditButton.addEventListener("click", () => {
  resetFormValue(formProfileEdit);
  insertProfileInfo();
  clearValidation(profileEditPopup, validationConfig);
  openModal(profileEditPopup);
});
profileImage.addEventListener("click", () => {
  resetFormValue(formProfileImageEdit);
  clearValidation(profileImagePopup, validationConfig);
  openModal(profileImagePopup);
});
addCardButton.addEventListener("click", () => {
  resetFormValue(formAddCard);
  clearValidation(addCardPopup, validationConfig);
  openModal(addCardPopup);
});
profileEditPopupCloseButton.addEventListener("click", () => {
  closeModal(profileEditPopup);
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

profileEditPopup.addEventListener("click", closeHandleOverlay);

profileImagePopup.addEventListener("click", closeHandleOverlay);

addCardPopup.addEventListener("click", closeHandleOverlay);

popupImg.addEventListener("click", closeHandleOverlay);

formProfileEdit.addEventListener("submit", handleEditFormSubmit);

formProfileImageEdit.addEventListener("submit", handleEditAvatarSubmit);

formAddCard.addEventListener("submit", handleAddCardFormSubmit);

enableValidation(validationConfig);

Promise.all([loadingCardsData(), loadingUserData()]).then(
  ([cardsData, userData]) => {
    cardsData.forEach((card) => {
      cardsContainer.append(
        createCard(
          card,
          deleteCard,
          likeCard,
          openImage,
          openModal,
          userData._id
        )
      );
    });
    nameProfile.textContent = userData.name;
    jobProfile.textContent = userData.about;
    profileImage.style["background-image"] = `url('${userData.avatar}')`;
    userId = userData._id;
  }
);
