import apiService from './apiService.js';
import refs from './refs.js';
import filmCardTemplate from '../templates/filmDetails.hbs';
import AddLocalStorage from './AddLocalStorage.js';
import debounce from 'lodash.debounce';
import auth from './authorization.js';
import trailer from './trailer.js';
import * as basicLightbox from 'basiclightbox';

const { firebase, openLoginForm } = auth;
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

// function of clicking on an item in the gallery
// and getting movie id
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
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      refsModal.queue.addEventListener(
        'click',
        queue.addLocalStorage.bind(queue),
      );
      refsModal.watched.addEventListener(
        'click',
        watched.addLocalStorage.bind(watched),
      );
    } else {
      refsModal.queue.addEventListener('click', openLoginFormOnModal);
      refsModal.watched.addEventListener('click', openLoginFormOnModal);
    }
  });

  window.addEventListener('keydown', onEscDown);

  queue = new AddLocalStorage('queue', filmId, refsModal.queue, 'is__active');
  watched = new AddLocalStorage(
    'watched',
    filmId,
    refsModal.watched,
    'is__active',
    queue,
  );

  //=======> trailer rendering function
  const movieImg = document.querySelector('.card__img');
  const moviePlayBtn = document.querySelector('.btn_card_play');
  movieImg.addEventListener('click', () =>
    trailer.markupModalForTrailer(filmId),
  );
  moviePlayBtn.addEventListener('click', () =>
    trailer.markupModalForTrailer(filmId),
  );
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

function openLoginFormOnModal() {
  openLoginForm();
  onModalClose();
}

export { onGalleryClick };
