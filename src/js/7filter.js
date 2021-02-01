import apiService from './apiService.js';
import refs from './refs.js';
import galleryTemlate from '../templates/galleryPage.hbs';
const { galleryBox, popularBtn, latestBtn, upcomingBtn } = refs;

popularBtn.addEventListener('click', renderTopRated);
latestBtn.addEventListener('click', renderLatest);
upcomingBtn.addEventListener('click', renderUpcoming);

function renderTopRated() {
  galleryBox.innerHTML = '';
  apiService.getTopRated().then(result => renderGallery(result));
}
function renderUpcoming() {
  galleryBox.innerHTML = '';
  apiService.getUpcoming().then(result => renderGallery(result));
}
function renderLatest() {
  galleryBox.innerHTML = '';
  apiService.getLatest().then(result => renderGallery(result));
}
function renderGallery(result) {
  let items = galleryTemlate(result);
  galleryBox.insertAdjacentHTML('beforeend', items);
}
