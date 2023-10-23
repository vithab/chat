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

const settingsButtonHandler = (event) => {
  event.preventDefault();
  settingsPopup.classList.add('active');  
};

const logoutButtonHandler = (event) => {
  event.preventDefault();
  authorizePopup.classList.add('active');
};

const closeButtonHandler = (event) => {
  settingsPopup.classList.remove('active');
  authorizePopup.classList.remove('active');
  loginPopup.classList.remove('active');
};

const enterCodeButtonHandler = (event) => {
  event.preventDefault();
  
  authorizePopup.classList.remove('active');
  loginPopup.classList.add('active');
};

const loginButtonHandler = (event) => {
  event.preventDefault();
  
  setCookie('code', inputCode.value, {secure: true, 'max-age': 360000});
  console.log(getCookie('code'));
};

settingsPopupButton.addEventListener('click', settingsButtonHandler);
logoutPopupButton.addEventListener('click', logoutButtonHandler);
enterCodeButton.addEventListener('click', enterCodeButtonHandler);
loginButton.addEventListener('click', loginButtonHandler);

closePopupButtons.forEach((item) => {
  item.addEventListener('click', closeButtonHandler);
});

// setTimeout( () => { logoutPopup.classList.add('active') }, 1000)