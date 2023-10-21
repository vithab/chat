import { MESSAGES } from "./const.js";

function Message(id, text, email, date) {
  this.id = id;
  this.text = stringLenghtException(text);
  this.email = stringLenghtException(email);
  this.date = date;
}

export function addMessage(id, text, email, date) {
  let message;

  try {
    message = new Message(id, text, email, date);
  }
  catch (error) {
    console.error(error.message);
    alert('Недопустимая длина строки!');
    return
  }

  MESSAGES.push(message)
}

function stringLenghtException(string) {
  if (string.length < 1) {
    throw new Error("Строка не может быть пустой");
  }

  return string
};