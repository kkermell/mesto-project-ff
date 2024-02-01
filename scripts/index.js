// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

function addCard(item) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = item.link;
  cardElement.querySelector(".card__title").textContent = item.name;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", removeCard);

  function removeCard() {
    const cardItem = cardElement
      .querySelector(".card__delete-button")
      .closest(".card");
    cardItem.remove();
  };

  placesList.append(cardElement);
}

initialCards.forEach(addCard);

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
