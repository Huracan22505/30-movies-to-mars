import apiService from './apiService.js';
import refs from './refs.js';
import galleryTemlate from '../templates/galleryPage.hbs';
import filmCardTemplate from '../templates/filmDetails.hbs';
// import switchGenresList from './getGenres.js';

const {
  searchForm,
  searchFormMobile,
  galleryBox,
  genreList,
  cardModal,
  cardOverlay,
  cardBox,
} = refs;

searchFormMobile.addEventListener('submit', getValue);
galleryBox.addEventListener('click', onGalleryClick);
cardOverlay.addEventListener('click', onModalClose);

let filmId = '';

// функция клика по элементу в галерее и
// получение id фильма
function onGalleryClick(ev) {
  ev.preventDefault();
  const cardRef = ev.target;
  filmId = cardRef.getAttribute('data');

  apiService.getFilmById(filmId).then(result => renderCardFilm(result));
}

//функция отрисовки карточки фильма по шаблону
function renderCardFilm(res) {
  cardBox.insertAdjacentHTML('beforeend', filmCardTemplate(res));
  openModal();
}

//функция открытия модалки
function openModal() {
  cardModal.classList.add('card__modal__lightbox__is-open');
}

//функция закрытия модалки
function onModalClose() {
  cardBox.innerHTML = '';

  cardModal.classList.remove('card__modal__lightbox__is-open');
  let cardContent = document.querySelector('.card__section__content ');
}
