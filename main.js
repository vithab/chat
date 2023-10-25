import { messagesRender } from "./modules/render.js"
import { MESSAGES } from "./modules/const.js";
import { getHistory } from "./modules/net.js";
import { addMessage} from "./modules/logic.js";
// import {sendMessageHandler} from "./modules/net.js";

export const messageForm = document.querySelector('.enter_message');

// messageForm.addEventListener('submit', sendMessageHandler);

getHistory('https://edu.strada.one/api/messages/')
.then((data) => data.messages.forEach(element => {
    addMessage(element._id, element.user.name, element.text, element.createdAt, element.user.email)
    
    messagesRender(MESSAGES);
  })
  );

console.log(MESSAGES)
