import apiService from './apiService.js';
import refs from './refs.js';
import filmCardTemplate from '../templates/filmDetails.hbs';
import AddLocalStorage from './AddLocalStorage.js';
import debounce from 'lodash.debounce';
import trailer from './trailer.js';
import * as basicLightbox from 'basiclightbox';
const myApiKey = '2955876276611e1cc2d97a4794387b9d';
const { galleryBox, cardModal, cardOverlay, cardBox, sliderContainer } = refs;
console.log(basicLightbox);

galleryBox.addEventListener('click', debounce(onGalleryClick, 300));
cardOverlay.addEventListener('click', onModalClose);

let filmId = '';
const refsModal = {};
let queue = {};
let watched = {};

// function to get input value
function getValue(e) {
  e.preventDefault();
  let queryValue = e.target.elements.query.value;
  apiService.searchQuery = queryValue;
  apiService.getSearchResult();
}

// function of clicking on an item in the gallery and
// getting movie id
function onGalleryClick(ev) {
  const cardRef = ev.target;
  filmId = cardRef.getAttribute('data');

  if (filmId != null || filmId != undefined)
    apiService.getFilmById(filmId).then(result => {
      renderCardFilm(result);
    });
}

//function of drawing a movie card by template
function renderCardFilm(res) {
  cardBox.insertAdjacentHTML('beforeend', filmCardTemplate(res));
  openModal();
}

//modal opening function
function openModal() {
  cardModal.classList.add('card__modal__lightbox__is-open');
  document.querySelector('html').style.overflow = 'hidden';
  refsModal.watched = document.querySelector('.card__btn__watched');
  refsModal.queue = document.querySelector('.card__btn__queue');

  window.addEventListener('keydown', onEscDown);

  queue = new AddLocalStorage('queue', filmId, refsModal.queue, 'is__active');
  watched = new AddLocalStorage(
    'watched',
    filmId,
    refsModal.watched,
    'is__active',
    queue,
  );

  refsModal.queue.addEventListener('click', queue.addLocalStorage.bind(queue));
  refsModal.watched.addEventListener(
    'click',
    watched.addLocalStorage.bind(watched),
  );

  const movieImg = document.querySelector('.card__img');
  movieImg.addEventListener('click', () => markupModalForTrailer(filmId));
  // markupModalForTrailer(filmId);
}

//close modal function
function onModalClose() {
  cardBox.innerHTML = '';
  cardModal.classList.remove('card__modal__lightbox__is-open');
  window.removeEventListener('keydown', onEscDown);

  document.querySelector('html').style.overflow = '';
  refsModal.queue.removeEventListener(
    'click',
    queue.addLocalStorage.bind(queue),
  );
  refsModal.watched.removeEventListener(
    'click',
    watched.addLocalStorage.bind(watched),
  );
}

function onEscDown(ev) {
  if (ev.code === 'Escape') {
    onModalClose();
  }
}

function markupModalForTrailer(id) {
  console.log(id);
  const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${myApiKey}&language=en-US`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const id = data.results[0].key;
      const youtubeVideo = basicLightbox.create(`
  <iframe width="560" height="315" src='https://www.youtube.com/embed/${id}'frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
`);
      youtubeVideo.show();
      toModalTrailer(youtubeVideo);
    });
}

export { onGalleryClick };
