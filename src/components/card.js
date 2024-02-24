import { openModal } from "./modal";

const cardTemplate = document.querySelector("#card-template").content;

function createCard(cardData, deleteCard, likeCard, openImage) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = card.querySelector(".card__delete-button");
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const likeButton = card.querySelector(".card__like-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener("click", () => {
    deleteCard(card);
  });
  likeButton.addEventListener("click", () => {
    likeCard(likeButton);
  });
  cardImage.addEventListener("click", () => {
    openImage(openModal, cardData);
  });

  return card;
}

function deleteCard(card) {
  card.remove();
}

function likeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, likeCard };
