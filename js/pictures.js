import { renderBigPicture } from './popup.js';

const userPictureElement = document.querySelector('.pictures');
const userPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

// отрисовка картинок на основной странице

const renderUserPictures = (userPictures) => {

  userPictureElement.querySelectorAll('.picture').forEach((picture) => {
    picture.remove();
  });

  const userPicturesFragment = document.createDocumentFragment();

  userPictures.forEach((userPicture) => {
    const pictureElement = userPictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = userPicture.url;
    pictureElement.querySelector('.picture__comments').textContent = userPicture.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = userPicture.likes;

    userPicturesFragment.append(pictureElement);

    pictureElement.addEventListener('click', () => {
      renderBigPicture(userPicture);
      document.body.classList.add('modal-open');
    });
  });

  userPictureElement.append(userPicturesFragment);
};

export { renderUserPictures };
