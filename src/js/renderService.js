import refs from './refs.js';
import galleryTemlate from '../templates/galleryPage.hbs';
import filmCardTemplate from '../templates/filmDetails.hbs';

const { galleryBox, cardBox } = refs;

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
};
