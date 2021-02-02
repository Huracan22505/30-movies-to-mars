import apiService from './apiService.js';
import refs from './refs.js';
import galleryTemlate from '../templates/galleryPage.hbs';
const { galleryBox, topRatedBtn, popularBtn, upcomingBtn } = refs;

topRatedBtn.addEventListener('click', renderTopRated);
popularBtn.addEventListener('click', renderPopular);
upcomingBtn.addEventListener('click', renderUpcoming);

function renderTopRated() {
  galleryBox.innerHTML = '';
  apiService.getRating().then(result => renderGallery(result));
  if (!topRatedBtn.classList.contains('is-active')) {
    topRatedBtn.classList.add('is-active');
    popularBtn.classList.remove('is-active');
    upcomingBtn.classList.remove('is-active');
  }
  }
function renderUpcoming() {
  galleryBox.innerHTML = '';
  apiService.getUpcoming().then(result => renderGallery(result));
  if (!upcomingBtn.classList.contains('is-active')) {
    upcomingBtn.classList.add('is-active');
    popularBtn.classList.remove('is-active');
    topRatedBtn.classList.remove('is-active');
  }
  getAllUpcomingFilmsByPage();
}
function renderPopular() {
  galleryBox.innerHTML = '';
  apiService.getPopular().then(result => renderGallery(result));
    if (!popularBtn.classList.contains('is-active')) {
      popularBtn.classList.add('is-active');
      topRatedBtn.classList.remove('is-active');
      upcomingBtn.classList.remove('is-active');
    }
}
function renderGallery(result) {
  let items = galleryTemlate(result);
  galleryBox.insertAdjacentHTML('beforeend', items);
}