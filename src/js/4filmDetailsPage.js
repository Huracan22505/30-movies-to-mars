import apiService from './apiService.js';
import refs from './refs.js';
import filmCardTemplate from '../templates/filmDetails.hbs';
import AddLocalStorage from './AddLocalStorage.js';
import debounce from 'lodash.debounce';

const { galleryBox, cardModal, cardOverlay, cardBox } = refs;

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
}

//close modal function
function onModalClose() {
  cardBox.innerHTML = '';
  cardModal.classList.remove('card__modal__lightbox__is-open');
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

export { onGalleryClick };
