// Initialize and show FeatherIcons.com's icons
feather.replace();

const button = document.querySelector('#generate-user-btn');

function getUserData(info) {
  const request = new XMLHttpRequest();
  request.open('GET', 'https://randomuser.me/api/?nat=us', true);

  request.onload = function() {
    this.status === 200
      ? info(this.responseText, showUserData)
      : console.log("Oops, something must've gone wrong!");
  };

  request.send();
}

function userInfo(res, info) {
  const data = JSON.parse(res);

  const {
    name: { first },
    name: { last },
    picture: { large },
    location: { street },
    location: { city },
    location: { state },
    location: { postcode },
    cell,
    email
  } = data.results[0];

  info(first, last, large, street, city, state, postcode, cell, email);
}

function showUserData(
  first,
  last,
  large,
  street,
  city,
  state,
  postcode,
  cell,
  email
) {
  document.querySelector('#user-name').textContent = `${first} ${last}`;
  document.querySelector(
    '#user-location'
  ).textContent = `${street}, ${city}, ${state} ${postcode}`;
  document.querySelector('#user-phone').textContent = cell;
  document.querySelector('#user-email').textContent = email;
  document.querySelector('#user-photo').src = large;
}

button.addEventListener('click', () => getUserData(userInfo));

function newUserOnSpacebarPress(e) {
  e.keyCode === 32 ? getUserData(userInfo) : '';
}

window.addEventListener('keyup', newUserOnSpacebarPress);
window.addEventListener('load', getUserData(userInfo));
