import { isEscapeKey, showAlert } from './utils.js';
import { resetScale, resetEffects} from './editPicture.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage, showLoadingMessage, hideLoadingMessage } from './message-popup.js';

const pictureForm = document.querySelector('.img-upload__form');
const newPictureLoadButton = pictureForm.querySelector('#upload-file');
const newPictureForm = pictureForm.querySelector('.img-upload__overlay');
const picturePreview = pictureForm.querySelector('.img-upload__preview img');
const newPictureFormClose = pictureForm.querySelector('.img-upload__cancel');
const commentsFormElement = pictureForm.querySelector('.img-upload__text');
const hashtagElement = document.querySelector('.text__hashtags');
const descriptionElement = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const onPopupEscKeydown = (evt) => {
  if (!isEscapeKey(evt)) {
    return;
  }

  if (
    document.activeElement === hashtagElement ||
    document.activeElement === descriptionElement
  ) {
    return;
  }

  evt.preventDefault();
  closeNewPictureForm();
};

function closeNewPictureForm () {
  newPictureForm.classList.add('hidden');
  pictureForm.reset();
  picturePreview.innerHTML = '';
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
}

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

const loadNewPicture = () => {
  newPictureLoadButton.addEventListener('change', () => {
    const file = newPictureLoadButton.files[0];

    if (file && isValidType(file)) {
      newPictureForm.classList.remove('hidden');
      document.body.classList.add('modal-open');
      picturePreview.src = URL.createObjectURL(file);

      resetScale();
      resetEffects();
      document.addEventListener('keydown', onPopupEscKeydown);
    }

    showAlert('Неверный формат файла');
  });

  newPictureFormClose.addEventListener('click', () => {
    closeNewPictureForm();
  });
};

const pristine = new Pristine(commentsFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper'
}, true);

const HASHTAG_REGEXP = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const validateHashtags = (value) => {
  if (!value.trim()) {
    return true;
  }

  const hashtags = value.trim().split(/\s+/);

  if (hashtags.length > 5) {
    return false;
  }

  if (!hashtags.every((tag) => HASHTAG_REGEXP.test(tag))) {
    return false;
  }

  const uniqueHashtags = new Set(
    hashtags.map((tag) => tag.toLowerCase())
  );

  return uniqueHashtags.size === hashtags.length;
};

const validateComment = (value) => value.length <= 140;

pristine.addValidator(hashtagElement, validateHashtags, 'неверный хэш-тег');

pristine.addValidator(descriptionElement, validateComment, 'Максимальная длина 140 символов');

const blockSubmitButton = () => {
  submitButton.disabled = true;
  showLoadingMessage();
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  hideLoadingMessage();
};

const submit = () => {
  pictureForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          unblockSubmitButton();
          evt.target.reset();
          closeNewPictureForm();
          showSuccessMessage();
        },
        () => {
          unblockSubmitButton();
          closeNewPictureForm();
          showErrorMessage();
        },
        new FormData(evt.target),
      );
    }
  });
};

export { loadNewPicture, submit };
