import apiService from './apiService.js';
import refs from './refs.js';
import filmCardTemplate from '../templates/filmDetails.hbs';

const {
  searchForm,
  searchFormMobile,
  galleryBox,
  cardModal,
  cardOverlay,
  cardBox,
} = refs;

searchForm.addEventListener('submit', getValue);
searchFormMobile.addEventListener('submit', getValue);
galleryBox.addEventListener('click', onGalleryClick);
cardOverlay.addEventListener('click', onModalClose);

let filmId = '';

// функция получения значения инпута
function getValue(e) {
  e.preventDefault();
  let queryValue = e.target.elements.query.value;
  apiService.searchQuery = queryValue;
  apiService.getSearchResult();
}

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
}
