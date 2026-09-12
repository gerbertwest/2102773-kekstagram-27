import { showAlert } from './utils.js';

const GET_LINK = 'https://27.javascript.htmlacademy.pro/kekstagram/data';
const SEND_LINK = 'hhttps://25.javascript.htmlacademy.pro/kekstagram';

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

const sendData = (onSuccess, onFail, body) => {
  fetch(
    SEND_LINK,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail ();
      }
    }
    )
    .catch(() => {
      onFail ();
    });
};

export { getData, sendData };
