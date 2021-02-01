import refs from './refs.js';
import galleryTemlate from '../templates/galleryPage.hbs';
import filmCardTemplate from '../templates/filmDetails.hbs';

const { galleryBox, cardModal, cardBox } = refs;

export default {
  // функция отрисовки галереи
  renderGallery(result) {
    let items = galleryTemlate(result);
    galleryBox.insertAdjacentHTML('beforeend', items);
  },

  // функция отрисовки карточки фильма
  renderCardFilm(res) {
    cardBox.insertAdjacentHTML('beforeend', filmCardTemplate(res));
    openModal();
  },

  //функция открытия модалки
  openModal() {
    cardModal.classList.add('card__modal__lightbox__is-open');
  },

  //функция закрытия модалки
  onModalClose() {
    cardBox.innerHTML = '';
    cardModal.classList.remove('card__modal__lightbox__is-open');
  },
};
