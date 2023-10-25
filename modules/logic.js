import { MESSAGES } from "./const.js";

function Message(id, username, text, date, email) {
  this.id = id;
  this.username = username;
  this.text = stringLenghtException(text);
  this.email = stringLenghtException(email);
  this.date = date;
}

export function addMessage(id, username, text, date, email) {
  let message;

  try {
    message = new Message(id, username, text, date, email);
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

// Сортировка
export function sortByField(fieldName) {
  return (a, b) => a[fieldName] > b[fieldName] ? 1 : -1;
}