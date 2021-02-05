import refs from './refs.js';
import galleryTemlate from '../templates/galleryPage.hbs';
import filmCardTemplate from '../templates/filmDetails.hbs';

const { galleryBox, cardBox } = refs;

export default {
  // gallery rendering function
  renderGallery(result) {
    console.log('render service result: ', result);
    let items = galleryTemlate(result);
    galleryBox.insertAdjacentHTML('beforeend', items);
  },

  // movie card drawing function
  renderCardFilm(res) {
    cardBox.insertAdjacentHTML('beforeend', filmCardTemplate(res));
    openModal();
  },
};
