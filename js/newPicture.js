import { isEscapeKey } from './utils.js';

const pictureForm = document.querySelector('.img-upload');
const newPictureLoadButton = pictureForm.querySelector('#upload-file');
const newPictureForm = pictureForm.querySelector('.img-upload__overlay');
const picturePreview = pictureForm.querySelector('.img-upload__preview img');
const newPictureFormClose = pictureForm.querySelector('.img-upload__cancel');
const commentsFormElement = pictureForm.querySelector('.img-upload__text');
const hashtagElement = document.querySelector('.text__hashtags');

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeNewPictureForm();
  }
};

function closeNewPictureForm () {
  newPictureForm.classList.add('hidden');
  pictureForm.reset();
  picturePreview.src.innerHTML = '';
  document.body.classList.remove('.modal-open');
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
      document.body.classList.add('.modal-open');
      picturePreview.src = URL.createObjectURL(file);
    }
    newPictureForm.classList.remove('hidden');

    document.addEventListener('keydown', onPopupEscKeydown);

    newPictureFormClose.addEventListener('click', () => {
      closeNewPictureForm();
    });

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

const hashtag = /^#[a-za-яё0-9]{1,19}$/i;

function validateHashtag () {
  const hashtagArray = hashtagElement.value.split(' ');
  for (let i = 0; i < hashtagArray.length; i++) {
    const isEvery = () => hashtag.test(hashtagArray[i]);
    console.log(hashtagArray[i])
    //console.log(hashtag.test(hashtagArray[i]))
    //console.log(hashtagArray.every(isEvery))
    return hashtagArray.every(isEvery);
  }
}

pristine.addValidator(hashtagElement, validateHashtag, 'неверный хэш-тег');

export { loadNewPicture };
