import apiService from './apiService.js';
import refs from './refs.js';
import renderService from './renderService.js';
import showNotification from './errorPnotify.js';
import debounce from 'lodash.debounce';

const { searchForm, searchFormMobile, galleryBox, openInputBtn } = refs;
let query = '';

searchForm.addEventListener('input', updateQuery);
searchFormMobile.addEventListener('input', updateQuery);
searchForm.addEventListener('submit', getValue);
searchFormMobile.addEventListener('submit', getValue);
openInputBtn.addEventListener('click', getValue);

// function to get input value
function updateQuery(e) {
  query = e.target.value;
}

// function of passing input value to request
function getValue(e) {
  e.preventDefault();
  if (query === '') {
    return;
  }

  apiService.getSearchResult(query).then(res => {
    if (res.results.length === 0) {
      showNotification('Movie not found');
    } else {
      galleryBox.innerHTML = '';
      renderService.renderGallery(res.results);
    }
  });
}
