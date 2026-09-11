import { getData } from './api.js';
import { renderUserPictures } from './pictures.js';
import { loadNewPicture } from './newPicture.js';
import { initSort, sortActivate } from './sort.js';
import { disable, enable, initScale } from './editPicture.js';

const USER_PECTIRES_COUNT = 19;

disable();
getData((pictures) => {
  const userPictures = pictures.slice(0, USER_PECTIRES_COUNT);

  renderUserPictures(userPictures);
  initSort(userPictures, renderUserPictures);
  sortActivate();
});

loadNewPicture();
enable();
initScale();
