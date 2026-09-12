import { setSliderValue, onEffectUpdate, updateSlider, resetSlider } from './slider.js';

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const INITIAL_SCALE = 100;
const EFFECTS = {
  none: {
    min: 0,
    max: 1,
    step: 0.1,
    start: 0,
    getFilter: () => 'none',
  },

  chrome: {
    min: 0,
    max: 1,
    step: 0.1,
    start: 0,
    getFilter: (value) => `grayscale(${value})`,
  },

  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
    start: 0,
    getFilter: (value) => `sepia(${value})`,
  },

  marvin: {
    min: 0,
    max: 100,
    step: 1,
    start: 0,
    getFilter: (value) => `invert(${value}%)`,
  },

  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
    start: 0,
    getFilter: (value) => `blur(${value}px)`,
  },

  heat: {
    min: 1,
    max: 3,
    step: 0.1,
    start: 1,
    getFilter: (value) => `brightness(${value})`,
  },
};

let currentScale = INITIAL_SCALE;
let currentEffect = 'none';

const effectElement = document.querySelector('.effect-level__value');
const sliderElement = document.querySelector('.effect-level');
const picturePreview = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');
const scale = document.querySelector('.scale');
const scaleValue = scale.querySelector('.scale__control--value');
const smallerButton = scale.querySelector('.scale__control--smaller');
const biggerButton = scale.querySelector('.scale__control--bigger');

// Кнопки масштаба

const setScale = (value) => {
  currentScale = value;
  scaleValue.value = `${currentScale}%`;
  picturePreview.style.transform = `scale(${currentScale / 100})`;
};

const changeScale = (step) => {
  const newValue = Math.min(
    MAX_SCALE,
    Math.max(MIN_SCALE, currentScale + step)
  );

  setScale(newValue);
};

const resetScale = () => setScale(INITIAL_SCALE);

const initScale = () => {
  biggerButton.addEventListener('click', () => {
    changeScale(SCALE_STEP);
  });

  smallerButton.addEventListener('click', () => {
    changeScale(-SCALE_STEP);
  });

  resetScale();
};

// Эффекты на фото, в том числе слайдер

const disable = () => {
  effectElement.removeEventListener('change', setSliderValue);
};

const enable = () => {
  effectElement.addEventListener('change', setSliderValue);
};

const onEffectChange = (evt) => {
  currentEffect = evt.target.value;
  const effect = EFFECTS[currentEffect];
  updateSlider(effect);
  picturePreview.style.filter = effect.getFilter(effect.start);
};

effectsList.addEventListener('change', onEffectChange);

onEffectUpdate((value) => {
  const effect = EFFECTS[currentEffect];
  if (currentEffect === 'none') {
    sliderElement.classList.add('hidden');
  }
  else {sliderElement.classList.remove('hidden');}
  picturePreview.style.filter = effect.getFilter(value);
});

const resetEffects = () => {
  currentEffect = 'none';
  picturePreview.style.filter = 'none';

  resetSlider();
};

export { disable, enable, initScale, resetScale, resetEffects };
