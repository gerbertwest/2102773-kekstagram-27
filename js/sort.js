import { getShuffledArray, debounce } from './utils.js';

const TIMEOUT_DELAY = 500;

const sort = document.querySelector('.img-filters');

const sortActivate = () => {
  sort.classList.remove('img-filters--inactive');
};

const getSortedPictures = (pictures, filter = 'default') => {
  switch (filter) {
    case 'random':
      return getShuffledArray(pictures);

    case 'discussed':
      return [...pictures].sort(
        (a, b) => b.comments.length - a.comments.length
      );

    case 'default':
    default:
      return [...pictures];
  }
};

const initSort = (pictures, onSort) => {
  const form = document.querySelector('.img-filters__form');

  const renderSortedPictures = debounce((sortType) => {
    const sortedPictures = getSortedPictures(pictures, sortType);

    onSort(sortedPictures);
  }, TIMEOUT_DELAY);

  form.addEventListener('click', (evt) => {
    const button = evt.target.closest('.img-filters__button');

    if (!button) {
      return;
    }

    form.querySelector('.img-filters__button--active')?.classList.remove('img-filters__button--active');

    button.classList.add('img-filters__button--active');

    const sortType = button.dataset.filter;
    renderSortedPictures(sortType);
  });
};

export { initSort, sortActivate };
