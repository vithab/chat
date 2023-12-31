import { getCookie, setCookie } from "./storage.js";
import { MESSAGES } from "./const.js";
import { addMessage } from "./logic.js";
import { messagesRender } from "./render.js";

const getCodeButton = document.querySelector('.get_code');
const inputEmail = document.getElementById('email');
const inputName = document.getElementById('name');
const changeUserButton = document.querySelector('.change_user');
const messageForm = document.querySelector('.enter_message');
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

export const getHistory = async (url = '') => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  return response.json(); 
};

getCodeButton.addEventListener('click', (event) => {
  event.preventDefault();

  postData('https://edu.strada.one/api/user', { email: inputEmail.value });
});

changeUserButton.addEventListener('click', (event) => {
  event.preventDefault();
  console.log(inputName.value)
  setCookie('name', inputName.value, {secure: true, 'max-age': 360000});

  patchName('https://edu.strada.one/api/user', { name: inputName.value });
  getUser('https://edu.strada.one/api/user/me')
});

connectWebsocket();

function connectWebsocket() {
  const socket = new WebSocket(`wss://edu.strada.one/websockets?${token}`);
  
  socket.onopen = () => {
    console.log("[open] Соединение установлено");
    console.log("Можно отправить сообщения на сервер");
    
    function sendMessageHandler(e) {
      e.preventDefault();

      let input = document.querySelector('.input-message');
      let inputText = input.value;

      if(inputText != '') {
        console.log(inputText);
        
        socket.send(JSON.stringify({ text: `${inputText}`}));
      };

      input.value = '';
    }

    messageForm.onsubmit = function (event) {
      sendMessageHandler(event);
    };
  };
  
  socket.onmessage = function(event) { 
    console.log(event.data);
    const dataJson = JSON.parse(event.data);
    addMessage(dataJson._id, dataJson.user.name, dataJson.text, dataJson.createdAt, dataJson.user.email);
    messagesRender(MESSAGES);
  };
  
  socket.onclose = event => {
    console.log('Websocket closed. Code: ' + event.code + event.reason);
    setTimeout(connectWebsocket(), 2000);
  };
  
  socket.onerror = (error) => {
    console.error(`Websocket error: ${error}`);
  }
}
