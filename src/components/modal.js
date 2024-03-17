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
  if (evt.target.classList.contains("popup_is-opened")) {
    closeModal(evt.target);
  }
}

function renderLoading(isLoading, popup) {
  const buttonElement = popup.querySelector(".popup__button");
  if (isLoading) {
    buttonElement.textContent = "Сохранение...";
  } else {
    buttonElement.textContent = "Сохранить";
  }
}

export { openModal, closeModal, renderLoading };
