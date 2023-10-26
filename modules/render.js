import { addMessage, sortByField } from "./logic.js";
import { MESSAGES, CURRENT_USER_EMAIL, myMessage, companionMessage, chatArea, wrapper} from "./const.js";

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
};

function checkPosition() {
  // Нам потребуется знать высоту документа и высоту экрана:
  const height = document.body.offsetHeight
  const screenHeight = wrapper.innerHeight

  // Они могут отличаться: если на странице много контента,
  // высота документа будет больше высоты экрана (отсюда и скролл).

  // Записываем, сколько пикселей пользователь уже проскроллил:
  const scrolled = wrapper.scrollY

  // Обозначим порог, по приближении к которому
  // будем вызывать какое-то действие.
  // В нашем случае — четверть экрана до конца страницы:
  const threshold = height - screenHeight / 4

  // Отслеживаем, где находится низ экрана относительно страницы:
  const position = scrolled + screenHeight

  if (position >= threshold) {
    // Если мы пересекли полосу-порог, вызываем нужное действие.
  }
}

wrapper.addEventListener('scroll', checkPosition);
wrapper.addEventListener('resize', checkPosition)


// chatArea.addEventListener('scroll', function() {
//   const scrollPosition = chatArea.pageYOffset || document.documentElement.scrollTop;
//   console.log('Текущая прокрутка страницы:', scrollPosition);
// })