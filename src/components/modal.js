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

export { openModal, closeModal };
