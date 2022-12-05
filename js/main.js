import { getData } from './api.js';
import { renderUserPictures } from './pictures.js';
import { loadNewPicture } from './newPicture.js';

const USER_PECTIRES_COUNT = 12;

getData((pictures) => {
  renderUserPictures(pictures.slice(0, USER_PECTIRES_COUNT));
});

loadNewPicture();
