const openModal = function (popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeHandleEsc);
  document.addEventListener("click", closeHandleOverlay);
};

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeHandleEsc);
  document.removeEventListener("click", closeHandleOverlay);
}

function closeHandleEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}

function closeHandleOverlay(evt) {
  const openedPopup = document.querySelector(".popup_is-opened");
  if (evt.target === openedPopup) {
    closeModal(openedPopup);
  }
}

function insertProfileInfo() {
  const nameInput = document.querySelector(".profile__title");
  const jobInput = document.querySelector(".profile__description");
  const editForm = document.forms["edit-profile"];
  editForm.name.value = nameInput.textContent;
  editForm.description.value = jobInput.textContent;
}

function openImage(openModal, closeModal, cardData) {
  const popup = document.querySelector(".popup_type_image");
  const popupImage = popup.querySelector(".popup__image");
  const popupCaption = popup.querySelector(".popup__caption");
  const popupCloseButton = popup.querySelector(".popup__close");

  popupImage.src = cardData.link;
  popupCaption.textContent = cardData.name;
  openModal(popup);

  popupCloseButton.addEventListener("click", () => {
    closeModal(popup);
  });
}

export { openModal, closeModal, openImage, insertProfileInfo };
