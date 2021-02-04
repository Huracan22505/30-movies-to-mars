import InnerResponceModel from './models/responceModel.js';
import OuterResponceModel from './models/responseOuterModel.js';
import FilmIdModel from './models/modelFilmById.js';
const baseUrl = 'https://api.themoviedb.org/3/';
const myApiKey = '2955876276611e1cc2d97a4794387b9d';

export default {
  // вывод трендовых фильмов
  getRating() {
    const params = `trending/all/day?api_key=${myApiKey}`;
    let url = baseUrl + params;
    return fetch(url)
      .then(response => response.json())
      .then(data => buildModel(data));
  },

  // cписок фильмов как результат поиска
  getSearchResult(searchQuery) {
    const params = `search/movie?api_key=${myApiKey}&language=en-US&page=1&include_adult=false&query=${searchQuery}`;

    let url = baseUrl + params;
    console.log(url);
    return fetch(url)
      .then(response => response.json())
      .then(data => buildModel(data));
  },

  // находит фильм по id
  getFilmById(filmId) {
    console.log(filmId);
    const params = `movie/${filmId}?api_key=${myApiKey}&language=en-US`;
    let url = baseUrl + params;
    return fetch(url)
      .then(response => response.json())
      .then(data => bildModelById(data));
  },

  // находит популярные фильмы
  getPopular(pageNum = 1) {
    const params = `movie/popular?api_key=${myApiKey}&language=en-US&${pageNum}`;
    let url = baseUrl + params;
    return fetch(url)
      .then(response => response.json())
      .then(data => buildModel(data));
  },
  // находит фильмы в кино
  getUpcoming(pageNum = 1) {
    const params = `movie/upcoming?api_key=${myApiKey}&language=en-US&page=${pageNum}`;
    let url = baseUrl + params;
    return fetch(url)
      .then(response => response.json())
      .then(data => buildModel(data));
  },
  // загружает все фильмы для указанной страницы
  getAllFilmsByPage(pageNum = 1) {
    const url = `${baseUrl}movie/popular?api_key=${myApiKey}&language=en-US&page=${pageNum}`;
    return fetch(url)
      .then(response => response.json())
      .then(data => buildModel(data));
  },
};

function buildModel(data) {
  return new OuterResponceModel(
    data.page,
    data.total_pages,
    data.results.map(
      el =>
        new InnerResponceModel(
          el.id,
          el.poster_path,
          el.original_title,
          el.genre_ids,
          el.release_date,
        ),
    ),
    data.total_results,
  );
}

function bildModelById(data) {
  return new FilmIdModel(
    data.id,
    data.poster_path,
    data.title,
    data.original_title,
    data.genres,
    data.popularity,
    data.vote_average,
    data.vote_count,
    data.overview,
    data.release_date,
  );
}
