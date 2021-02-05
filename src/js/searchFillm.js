import apiService from './apiService.js';
import refs from './refs.js';
import renderService from './renderService.js';
import showNotification from './errorPnotify.js';
import debounce from 'lodash.debounce';

const { searchForm, searchFormMobile, galleryBox, openInputBtn } = refs;
let query = '';

searchForm.addEventListener('input', debounce(updateQuery, 1000));
searchFormMobile.addEventListener('input', debounce(updateQuery, 1000));
searchForm.addEventListener('submit', getValue);
searchFormMobile.addEventListener('submit', getValue);
openInputBtn.addEventListener('click', getValue);

// функция получения значения инпута
function updateQuery(e) {
  query = e.target.value;
}

// функция передачи значения инпута в запрос
function getValue(e) {
  e.preventDefault();

  galleryBox.innerHTML = '';
  apiService.getSearchResult(query).then(res => {
    if (res.results.length === 0) {
      showNotification('Movie not found');
    }
    renderService.renderGallery(res.results);
  });
}
