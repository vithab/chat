// возвращает куки с указанным name,
// или undefined, если ничего не найдено
export function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

// Устанавливает куки с именем name и значением value, 
// с настройкой path=/ по умолчанию (можно изменить, чтобы добавить другие значения по умолчанию):
export function setCookie(name, value, options = {}) {
  options = {
    path: '/',
    // при необходимости добавьте другие значения по умолчанию
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

// Пример использования:
// setCookie('user', 'John', {secure: true, 'max-age': 3600});

// Чтобы удалить куки, мы можем установить отрицательную дату истечения срока действия:
function deleteCookie(name) {
  setCookie(name, "", {
    'max-age': -1
  })
}

// Операции обновления или удаления куки должны использовать те же путь и домен
// Обратите внимание: когда мы обновляем или удаляем куки, 
// нам следует использовать только такие же настройки пути и домена, как при установке куки.