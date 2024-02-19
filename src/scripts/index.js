import { initialCards } from "./cards";
import '../pages/index.css';

const cardTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".places__list");

function createCard(cardData, deleteCard) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = card.querySelector(".card__delete-button");
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener("click", () => {
    deleteCard(card);
  });

  return card;
}

function deleteCard(card) {
  card.remove();
}

initialCards.forEach((cardData) => {
  const card = createCard(cardData, deleteCard);
  cardsContainer.append(card);
});
