//import { renderBigPicture } from './pictures.js';
import { isEscapeKey } from './utils.js';
//import { getData } from './api.js';
//import { openPopup } from './popup.js';


const pictureModalElement = document.querySelector('.big-picture');
const pictureModalCloseElement = pictureModalElement.querySelector('#picture-cancel');
const userPictureElement = document.querySelector('.pictures');
//console.log(userPictureElement)

const pictureModalOpenElement = userPictureElement.querySelector('a');

//console.log(pictureModalOpenElement);


const renderBigPicture = (userPictures) => {

  pictureModalElement.querySelector('.big-picture__img').src = userPictures.url;
  pictureModalElement.querySelector('.likes-count').textContent = userPictures.likes;
  pictureModalElement.querySelector('.comments-count').textContent = userPictures.comments;
  pictureModalElement.querySelector('.social__caption').textContent = userPictures.description;

  return pictureModalElement;
};

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureModal();
  }
};

const createBigPictures = (pictures) => {
  pictures.forEach ((picture) => {
    renderBigPicture(picture);
    //openPictureModal(picture);
  });
};


function openPictureModal (userPictures) {
  pictureModalElement.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscKeydown);
  renderBigPicture(userPictures);
  //console.log(renderBigPicture(userPictures))
  // pictureModalElement.querySelector('.likes-count').textContent = target.textContent;
  // pictureModalElement.querySelector('.big-picture__img').src = target.src;
  // pictureModalElement.querySelector('.comments-count').textContent = target.textContent;
}

function closePictureModal () {
  pictureModalElement.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscKeydown);
}

const openPopup = () => {
  userPictureElement.addEventListener('click', (evt) => {
    createBigPictures(evt.target);
    console.log(evt.target)
});
};


pictureModalCloseElement.addEventListener('click', () => {
  closePictureModal();
});

export { openPopup, renderBigPicture, createBigPictures };
