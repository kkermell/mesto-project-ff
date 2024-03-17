import {
  loadingUserData,
  handleDeleteLike,
  handleAddLike,
  handleDeleteCard,
} from "./api";

const cardTemplate = document.querySelector("#card-template").content;

function createCard(cardData, deleteCard, likeCard, openImage, openModal, userId) {
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

  if (cardData.owner._id === userId) {
    deleteButton.addEventListener("click", () => {
      deleteCard(card, cardData);
    });
  } else {
    deleteButton.remove();
  }

  if (hasMyLike(cardData, userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", () => {
    likeCard(likeButton, cardData, cardLikeAmount, userId);
  });
  cardImage.addEventListener("click", () => {
    openImage(cardData);
  });
  return card;
}

function deleteCard(card, cardData) {
  handleDeleteCard(cardData)
    .then(() => {
      card.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

function likeCard(likeButton, cardData, cardLikeAmount, userId) {
  if (hasMyLike(cardData, userId)) {
    {
      handleDeleteLike(cardData)
        .then((data) => {
          likeButton.classList.remove("card__like-button_is-active");
          cardLikeAmount.textContent = data.likes.length;
          cardData.likes = data.likes;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } else {
    {
      handleAddLike(cardData)
        .then((data) => {
          likeButton.classList.add("card__like-button_is-active");
          cardLikeAmount.textContent = data.likes.length;
          cardData.likes = data.likes;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}

function hasMyLike(cardData, userId) {
  return cardData.likes.some((element) => {
    return element._id === userId;
  });
}

export { createCard, deleteCard, likeCard };
