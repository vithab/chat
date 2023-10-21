import { getCookie } from "./storage.js";

const getCodeButton = document.querySelector('.get_code');
const inputEmail = document.getElementById('email');
const inputName = document.getElementById('name');
const changeUserButton = document.querySelector('.change_user');
const token = getCookie('code');

// Определяем функцию которая принимает в качестве параметров url и данные которые необходимо обработать:
const postData = async (url = '', data = {}) => {
  // Формируем запрос
  const response = await fetch(url, {
    // Метод, если не указывать, будет использоваться GET
    method: 'POST',
    // Заголовок запроса
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`

    },
    // Данные
    body: JSON.stringify(data)

  });
  return response.json(); 
};

const patchName = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  return response.json(); 
};

const getUser = async (url = '') => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  console.log(response);
  return response.json(); 
};

getCodeButton.addEventListener('click', (event) => {
  event.preventDefault();

  postData('https://edu.strada.one/api/user', { email: inputEmail.value });
});

changeUserButton.addEventListener('click', (event) => {
  event.preventDefault();
  console.log(inputName.value)
  patchName('https://edu.strada.one/api/user', { name: inputName.value });
  getUser('https://edu.strada.one/api/user/me')
})