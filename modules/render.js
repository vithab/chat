import { addMessage } from "./logic.js";
import { MESSAGES, CURRENT_USER_EMAIL, myMessage, companionMessage, chatArea} from "./const.js";

function createMessageElement(text, email, date, id) {
  const templateRoot = document.createElement('div'); // создает новый HTML элемент

  if (email == CURRENT_USER_EMAIL) {
    const templateContent = myMessage.content.cloneNode(true); // копирует содержимое шаблона
    templateContent.querySelector('span#text_my_message').textContent = text;
    chatArea.append(templateContent);
  } else {
    const templateContent = companionMessage.content.cloneNode(true); // копирует содержимое шаблона
    templateContent.querySelector('span#text_companion_message').textContent = text;
    chatArea.append(templateContent);
  }
}

function clearMessagesRender() {
  const messages = document.querySelectorAll('.message');
  messages.forEach (message => {message.remove()} )
}

export function messagesRender(MESSAGES) {
  clearMessagesRender();
  
  MESSAGES.forEach(message => {
    createMessageElement(message.text, message.email, message.date, message.id)
  }
  )
}

export function addRenderMessage(event) {
  event.preventDefault();
  
  let input = document.querySelector('.input-message');

  const id = 1;
  const text = input.value;
  const email = CURRENT_USER_EMAIL;
  const date = '18:45';

  addMessage(id, text, email, date);

  console.log(MESSAGES);

  input.value = '';

  messagesRender(MESSAGES);
};
