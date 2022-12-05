import { showAlert } from './utils.js';

const GET_LINK = 'https://27.javascript.pages.academy/kekstagram/data';

const getData = (onSuccess) => {
  fetch(GET_LINK)
    .then((response) => response.json())
    .then((pictures) => {
      onSuccess(pictures);
    })
    .catch(() => {
      showAlert('Не загрузить данные с сервера. Попробуйте ещё раз');
    });
};

export { getData };
