import apiService from './apiService.js';
import refs from './refs.js';
import galleryTemlate from '../templates/galleryPage.hbs';
import filmCardTemplate from '../templates/filmDetails.hbs';

const { searchForm, searchFormMobile } = refs;

searchForm.addEventListener('submit', getValue);
searchFormMobile.addEventListener('submit', getValue);

// функция получения значения инпута
function getValue(e) {
  e.preventDefault();
  let queryValue = e.target.elements.query.value;
  apiService.searchQuery = queryValue;
  apiService.getSearchResult();
}
