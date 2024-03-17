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
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function loadingUserData() {
  return fetch(`${config.baseUrl}users/me`, {
    method: "GET",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log(err);
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
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function submitNewCard(cardData) {
  return fetch(`${config.baseUrl}cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(cardData),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${err.status}`);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleDeleteLike(cardData) {
  return fetch(`${config.baseUrl}cards/likes/${cardData._id}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleAddLike(cardData) {
  return fetch(`${config.baseUrl}cards/likes/${cardData._id}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleDeleteCard(cardData) {
  return fetch(`${config.baseUrl}cards/${cardData._id}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleEditAvatar(profileImageInput) {
  return fetch(`${config.baseUrl}users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: profileImageInput.value,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log(err);
    });
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
