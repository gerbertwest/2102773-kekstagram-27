import { isEscapeKey } from './utils.js';

const COMMENTS_STEP = 5;
let visibleComments;
let currentComments = [];

const pictureModalElement = document.querySelector('.big-picture');
const pictureModalCloseButton = pictureModalElement.querySelector('#picture-cancel');
const moreLoadButton = pictureModalElement.querySelector('.social__comments-loader');
const commentsElement = pictureModalElement.querySelector('.social__comment');
const commentsElements = pictureModalElement.querySelector('.social__comments');
const commentsCount = pictureModalElement.querySelector('[data-comment]');

// обработка кнопки закрытия попап

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureModal();
  }
};

function closePictureModal () {
  commentsElements.innerHTML = '';
  pictureModalElement.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscKeydown);
  document.body.classList.remove('modal-open');
}

// отрисовка блока одного комментария

const createComment = ({ avatar, name, message }) => {
  const comment = commentsElement.cloneNode(true);
  comment.querySelector('.social__text').textContent = message;
  comment.querySelector('.social__comment img').src = avatar;
  comment.querySelector('.social__comment img').alt = name;
  return comment;
};

// отрисовка исходного блока комментариев

const loadComments = () => {
  commentsElements.innerHTML = '';
  const fragment = document.createDocumentFragment();
  const visibleCount = Math.min(visibleComments, currentComments.length);

  currentComments.slice(0, visibleComments).forEach((comment) => {
    const commentElement = createComment(comment);
    fragment.append(commentElement);
    commentsCount.textContent = visibleCount;
  });

  commentsElements.append(fragment);
  moreLoadButton.hidden = visibleComments >= currentComments.length;
};

// отрисовка попапа

const renderBigPicture = (userPictures) => {
  visibleComments = COMMENTS_STEP;
  currentComments = userPictures.comments;

  pictureModalElement.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscKeydown);

  pictureModalElement.querySelector('.big-picture__img img[src]').src = userPictures.url;
  pictureModalElement.querySelector('.likes-count').textContent = userPictures.likes;
  pictureModalElement.querySelector('.comments-count').textContent = userPictures.comments.length;
  pictureModalElement.querySelector('.social__caption').textContent = userPictures.description;

  loadComments();
};

moreLoadButton.addEventListener('click', () => {
  visibleComments += COMMENTS_STEP;
  loadComments ();
});

pictureModalCloseButton.addEventListener('click', () => {
  closePictureModal();
  loadComments();
});

export { renderBigPicture };
