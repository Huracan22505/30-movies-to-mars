import Glide from '@glidejs/glide';
import filmsCardSliderTpl from '../templates/cardFilmSlider.hbs';
import trailer from './trailer.js';
import apiService from './apiService.js';

const sliderContainer = document.querySelector('.js-slider-container');

// Init glide-slider
const glide = new Glide('.glide', {
  type: 'slider',
  startAt: 0,
  perView: 7,
  autoplay: 4000,
  hoverpause: true,
  bound: true,
  gap: 30,
  animationDuration: 1000,
  breakpoints: {
    1000: {
      perView: 4,
    },
    767: {
      perView: 3,
    },
  },
});

glide.mount();

apiService
  .getRatedFilmsByPage()
  .then(data => markupSliderFilms(data))
  .catch(err => {
    sliderContainer.innerHTML = `<img class="catch-error-pagination" src="${errorUrl}" />`;
  });

function markupSliderFilms(articles) {
  sliderContainer.innerHTML = filmsCardSliderTpl(articles);
  trailer.createTrailerLink(document.querySelectorAll('.btn-slider'));
}
