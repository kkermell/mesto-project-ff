const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-8/",
  headers: {
    authorization: "db0c9171-427e-49f7-83bf-57e5de7ae53b",
    "Content-Type": "application/json",
  },
};

function loadingCardsData() {
  return fetch(`${config.baseUrl}cards`, {
    method: "GET",
    headers: config.headers,
  }).then((res) => {
    return getResponseData(res);
  });
}

function loadingUserData() {
  return fetch(`${config.baseUrl}users/me`, {
    method: "GET",
    headers: config.headers,
  }).then((res) => {
    return getResponseData(res);
  });
}

function submitUserData(nameInput, jobInput) {
  return fetch(`${config.baseUrl}users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value,
    }),
  }).then((res) => {
    return getResponseData(res);
  });
}

function submitNewCard(cardData) {
  return fetch(`${config.baseUrl}cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(cardData),
  }).then((res) => {
    return getResponseData(res);
  });
}

function handleDeleteLike(cardData) {
  return fetch(`${config.baseUrl}cards/likes/${cardData._id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    return getResponseData(res);
  });
}

function handleAddLike(cardData) {
  return fetch(`${config.baseUrl}cards/likes/${cardData._id}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => {
    return getResponseData(res);
  });
}

function handleDeleteCard(cardData) {
  return fetch(`${config.baseUrl}cards/${cardData._id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    return getResponseData(res);
  });
}

function handleEditAvatar(profileImageInput) {
  return fetch(`${config.baseUrl}users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: profileImageInput.value,
    }),
  }).then((res) => {
    return getResponseData(res);
  });
}

function getResponseData(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export {
  loadingCardsData,
  loadingUserData,
  submitUserData,
  submitNewCard,
  handleDeleteLike,
  handleAddLike,
  handleDeleteCard,
  handleEditAvatar,
};
