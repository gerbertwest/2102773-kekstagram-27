import { isEscapeKey } from './utils.js';

const userPictureElement = document.querySelector('.pictures');
const userPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureModalElement = document.querySelector('.big-picture');
const pictureModalCloseElement = pictureModalElement.querySelector('#picture-cancel');
const moreLoadButton = pictureModalElement.querySelector('.social__comments-loader');
const commentsElement = pictureModalElement.querySelector('.social__comment');
const commentsElements = pictureModalElement.querySelector('.social__comments');
const commentsCount = pictureModalElement.querySelector('[data-comment]');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureModal();
  }
};

// отрисовка одного комментария

const createComment = ({ avatar, name, message }) => {
  const comment = commentsElement.cloneNode(true);
  comment.querySelector('.social__text').textContent = message;
  comment.querySelector('.social__comment img').src = avatar;
  comment.querySelector('.social__comment img').alt = name;
  commentsElements.append(comment);
  return comment;
};

const loadComments = (comments) => {
  commentsElements.innerHTML = '';
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < 2; i++) {
    const commentElement = createComment(comments[i]);
    fragment.append(commentElement);
    commentsCount.textContent = i + 1;
  }
  commentsElements.append(fragment);
};

// обработка кнопки закрытия попап

function closePictureModal () {
  commentsElements.innerHTML = '';
  pictureModalElement.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscKeydown);
  document.body.classList.remove('.modal-open');
}

const renderComments = (comments) => {
  commentsElements.innerHTML = '';
  for (let i = 0; i < comments.length ; i++) {
    const commentElement = createComment(comments[i]);
    commentsElements.append(commentElement);
    commentsCount.textContent = i + 1 ;
    moreLoadButton.classList.add('hidden');
  }
};


// отрисовка попапа

const renderBigPicture = (userPictures) => {
  pictureModalElement.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscKeydown);

  pictureModalElement.querySelector('.big-picture__img img[src]').src = userPictures.url;
  pictureModalElement.querySelector('.likes-count').textContent = userPictures.likes;
  pictureModalElement.querySelector('.comments-count').textContent = userPictures.comments.length;
  pictureModalElement.querySelector('.social__caption').textContent = userPictures.description;

  const userComments = userPictures.comments;
  loadComments(userComments);
  if (userComments.length === 2) {moreLoadButton.classList.add('hidden');}
  moreLoadButton.addEventListener('click', () => renderComments (userComments));

  pictureModalCloseElement.addEventListener('click', () => {
    closePictureModal();
    loadComments(userComments);
  });
};

// отрисовка картинок на основной странице

const renderUserPictures = (userPictures) => {
  const userPicturesFragment = document.createDocumentFragment();
  userPictures.forEach((userPicture) => {
    const pictureElement = userPictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = userPicture.url;
    pictureElement.querySelector('.picture__comments').textContent = userPicture.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = userPicture.likes;

    userPicturesFragment.append(pictureElement, pictureModalElement);

    pictureElement.addEventListener('click', () => {
      moreLoadButton.classList.remove('hidden');
      renderBigPicture(userPicture);
      document.body.classList.add('.modal-open');
    });
  });
  userPictureElement.append(userPicturesFragment);
};


export { renderUserPictures };
