import { openModal } from "./modal";
import {
  loadingUserData,
  handleDeleteLike,
  handleAddLike,
  handleDeleteCard,
} from "./api";

const cardTemplate = document.querySelector("#card-template").content;
const userData = await loadingUserData();

function createCard(cardData, deleteCard, likeCard, openImage) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = card.querySelector(".card__delete-button");
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const likeButton = card.querySelector(".card__like-button");
  const cardLikeAmount = card.querySelector(".card__like-amount");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  cardLikeAmount.textContent = cardData.likes.length;

  if (cardData.owner._id === userData._id) {
    deleteButton.addEventListener("click", () => {
      deleteCard(card, cardData);
    });
  } else {
    deleteButton.remove();
  }

  if (hasMyLike(cardData)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", () => {
    likeCard(likeButton, cardData, cardLikeAmount);
  });
  cardImage.addEventListener("click", () => {
    openImage(openModal, cardData);
  });
  return card;
}

function deleteCard(card, cardData) {
  handleDeleteCard(cardData).then(() => {
    card.remove();
  });
}

function likeCard(likeButton, cardData, cardLikeAmount) {
  if (hasMyLike(cardData)) {
    {
      handleDeleteLike(cardData).then((data) => {
        likeButton.classList.remove("card__like-button_is-active");
        cardLikeAmount.textContent = data.likes.length;
        cardData.likes = data.likes;
      });
    }
  } else {
    {
      handleAddLike(cardData).then((data) => {
        likeButton.classList.add("card__like-button_is-active");
        cardLikeAmount.textContent = data.likes.length;
        cardData.likes = data.likes;
      });
    }
  }
}

function hasMyLike(cardData) {
  return cardData.likes.some((element) => {
    return element._id === userData._id;
  });
}

export { createCard, deleteCard, likeCard };
