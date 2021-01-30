import apiService from './apiService.js';
import refs from './refs.js';
import galleryTemlate from '../templates/galleryPage.hbs';
import switchGenresList from './getGenres.js';
console.log(galleryTemlate);

const { searchForm, searchFormMobile, galleryBox, genreList } = refs;
console.log(searchFormMobile);
// console.log(apiService.getRating());
// console.log(apiService.getSearchResult('gifted'));

searchForm.addEventListener('submit', getValue);
searchFormMobile.addEventListener('submit', getValue);

function getValue(e) {
  e.preventDefault();
  console.log(12);

  let queryValue = e.target.elements.query.value;
  console.log(queryValue);
  apiService.searchQuery = queryValue;
  apiService.getSearchResult();
}

// отрисовка галереи
apiService.getRating().then(result => renderGallery(result));
function renderGallery(result) {
  let newGenre = switchGenresList(result.genres_ids);
  let items = galleryTemlate(result);
  galleryBox.insertAdjacentHTML('beforeend', items);

  genreList.textContent = newGenre;
}
