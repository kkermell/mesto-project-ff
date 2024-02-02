// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".places__list");

function createCard(cardData) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  deleteButton.addEventListener("click", () => {
    deleteButton.closest(".card").remove();
  });

  return cardElement;
}

initialCards.forEach((cardData) => {
  const card = createCard(cardData);
  cardsContainer.append(card);
});

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
