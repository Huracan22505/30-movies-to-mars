import Glide from '@glidejs/glide';
import filmsCardSliderTpl from '../templates/cardFilmSlider.hbs';
import trailer from './trailer.js';

const sliderContainer = document.querySelector('.js-slider-container');

getTrendy();

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
      perView: 5,
    },
    767: {
      perView: 3,
    },
  },
});

glide.mount();

function getTrendy() {
  const url = `https://api.themoviedb.org/3/trending/all/day?api_key=2955876276611e1cc2d97a4794387b9d`;
  return fetch(url)
    .then(response => response.json())
    .then(({ results }) => {
      return results;
    })
    .then(markupSliderFilms)
    .catch(err => {
      sliderContainer.innerHTML = `<img class="catch-error-pagination" src="${errorUrl}" />`;
    });
}

function markupSliderFilms(articles) {
  sliderContainer.innerHTML = filmsCardSliderTpl(articles);
  trailer.createTrailerLink(document.querySelectorAll('.btn-slider'));
}
