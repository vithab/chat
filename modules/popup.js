import { getCookie, setCookie } from "./storage.js";
 
const settingsPopupButton = document.querySelector('.settings_button');
const logoutPopupButton = document.querySelector('.log_out_button');
const loginButton = document.querySelector('.login_button');
const enterCodeButton = document.querySelector('.enter_code');
const inputCode = document.getElementById('code');


const closePopupButtons = document.querySelectorAll('.pop_up_close');

const settingsPopup = document.querySelector('.pop_up_set');
const authorizePopup = document.querySelector('.pop_up_authorize');
const loginPopup = document.querySelector('.pop_up_login');


settingsPopupButton.addEventListener('click', function(event) {
  event.preventDefault();
  settingsPopup.classList.add('active');
});

logoutPopupButton.addEventListener('click', function(event) {
  event.preventDefault();
  authorizePopup.classList.add('active');
});

closePopupButtons.forEach((item) => {
  item.addEventListener('click', () => {
    settingsPopup.classList.remove('active');
    authorizePopup.classList.remove('active');
    loginPopup.classList.remove('active');
  });
});

enterCodeButton.addEventListener('click', function(event) {
  event.preventDefault();
  authorizePopup.classList.remove('active');

  loginPopup.classList.add('active');
});

loginButton.addEventListener('click', (event) => {
  event.preventDefault();
  console.log(inputCode.value);
  setCookie('code', inputCode.value, {secure: true, 'max-age': 36000});
  console.log(getCookie('code'));
})

// setTimeout( () => { logoutPopup.classList.add('active') }, 1000)