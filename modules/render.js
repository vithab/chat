import { addMessage, sortByField } from "./logic.js";
import { MESSAGES, CURRENT_USER_EMAIL, myMessage, companionMessage, chatArea} from "./const.js";

export function createMessageElement(username, text, email, date, id) {
  const templateRoot = document.createElement('div'); // создает новый HTML элемент

  if (email == CURRENT_USER_EMAIL) {
    const templateContent = myMessage.content.cloneNode(true); // копирует содержимое шаблона
    templateContent.querySelector('span#text_my_message').textContent = text;
    templateContent.querySelector('.time').textContent = date;

    chatArea.append(templateContent);
  } else {
    const templateContent = companionMessage.content.cloneNode(true); // копирует содержимое шаблона
    templateContent.querySelector('span#user_name').textContent = username;
    templateContent.querySelector('span#text_companion_message').textContent = text;
    templateContent.querySelector('.time').textContent = date;

    chatArea.append(templateContent);
  }
}

function clearMessagesRender() {
  const messages = document.querySelectorAll('.message');
  messages.forEach (message => {message.remove()} )
}

export function messagesRender(MESSAGES) {
  clearMessagesRender();
  MESSAGES.sort(sortByField('date'));
  MESSAGES.forEach(message => {
    createMessageElement( message.username, message.text, message.email, message.date, message.id)
  }
  )
}
