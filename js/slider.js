const sliderElement = document.querySelector('.effect-level__slider');
const effectElement = document.querySelector('.effect-level__value');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const setSliderValue = () => {
  sliderElement.noUiSlider.set(effectElement.value);
};

const resetSlider = () => {
  sliderElement.noUiSlider.updateOptions(
    {start: 0}
  );
};

const onEffectUpdate = (cb) => {
  sliderElement.noUiSlider.on('update', (values) => {
    effectElement.value = values[0];
    cb(values[0]);
  });
};

const updateSlider = ({ min, max, step, start }) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min,
      max,
    },
    step,
    start,
  });
};

export { setSliderValue, resetSlider, onEffectUpdate, updateSlider };
