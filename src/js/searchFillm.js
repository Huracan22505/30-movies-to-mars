import apiService from './apiService.js';
import refs from './refs.js';
import galleryTemlate from '../templates/galleryPage.hbs';
import filmCardTemplate from '../templates/filmDetails.hbs';
import renderService from './renderService.js';

const { searchForm, searchFormMobile, galleryBox } = refs;

searchForm.addEventListener('submit', getValue);
searchFormMobile.addEventListener('submit', getValue);

// функция получения значения инпута
function getValue(e) {
  e.preventDefault();

  let queryValue = e.target.elements.query.value;
  console.log(queryValue);
  galleryBox.innerHTML = '';
  apiService
    .getSearchResult(queryValue)
    .then(res => renderService.renderGallery(res.results));
}
