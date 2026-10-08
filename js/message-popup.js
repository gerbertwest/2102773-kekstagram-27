import { isEscapeKey } from './utils.js';

const successTemplate = document.querySelector('#success');
const errorTemplate = document.querySelector('#error');
const loadingTemplate = document.querySelector('#messages');

const showMessage = (template) => {
  const message = template.content.cloneNode(true);
  const messageElement = message.firstElementChild;

  document.body.append(messageElement);

  const button = messageElement.querySelector('button');

  if (!button) {
    return;
  }

  const onEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeMessage();
    }
  };

  const onDocumentClick = () => {
    closeMessage();
  };

  function closeMessage () {
    messageElement.remove();
    document.removeEventListener('keydown', onEscKeydown);
    document.removeEventListener('click', onDocumentClick);
  }

  button.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onEscKeydown);
  document.addEventListener('click', onDocumentClick);
};

const showSuccessMessage = () => {
  showMessage(successTemplate);
};

const showErrorMessage = () => {
  showMessage(errorTemplate);
};

const showLoadingMessage = () => {
  showMessage(loadingTemplate);
};

const hideLoadingMessage = () => {
  const message = document.querySelector('.img-upload__message--loading');

  if (message) {
    message.remove();
  }
};

export { showSuccessMessage, showErrorMessage, showLoadingMessage, hideLoadingMessage };
