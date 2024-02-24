import { closeModal } from "./modal";

const nameInput = document.forms["edit-profile"].name;
const jobInput = document.forms["edit-profile"].description;

function handleFormSubmit(evt) {
  const nameProfile = document.querySelector(".profile__title");
  const jobProfile = document.querySelector(".profile__description");
  const popup = document.querySelector(".popup_is-opened");

  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closeModal(popup);
}

function resetFormValue() {
  setTimeout(() => {
    document.forms["edit-profile"].reset();
    document.forms["new-place"].reset();
  }, 600);
}

export { handleFormSubmit, resetFormValue };
