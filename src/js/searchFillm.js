import apiService from './apiService.js';
import refs from './refs.js';
import renderService from './renderService.js';
import showNotification from './errorPnotify.js';
const { searchForm, searchFormMobile, galleryBox } = refs;

searchForm.addEventListener('submit', getValue);
searchFormMobile.addEventListener('submit', getValue);

// функция получения значения инпута
function getValue(e) {
  e.preventDefault();

  let queryValue = e.target.elements.query.value;

  galleryBox.innerHTML = '';
  apiService.getSearchResult(queryValue).then(res => {
    if (res.results.length === 0) {
      showNotification('Movie not found');
    }

    renderService.renderGallery(res.results);
  });
}
