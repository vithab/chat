import {addRenderMessage, messagesRender} from "./modules/render.js"
import { MESSAGES } from "./modules/const.js";

const messageForm = document.querySelector('.enter_message');

messagesRender(MESSAGES);

messageForm.addEventListener('submit', addRenderMessage);
