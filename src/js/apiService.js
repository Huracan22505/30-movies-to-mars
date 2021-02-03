const baseUrl = 'https://api.themoviedb.org/3/';
const myApiKey = '2955876276611e1cc2d97a4794387b9d';

export default {
  searchQuery: '',
  pageNumber: 1,

  // вывод трендовых фильмов
  getRating() {
    const params = `trending/all/day?api_key=${myApiKey}`;
    let url = baseUrl + params;
    return fetch(url)
      .then(response => response.json())
      .then(data => data.results.map(data => data));
  },

  // cписок фильмов как результат поиска
  getSearchResult() {
    const params = `search/movie?api_key=${myApiKey}&language=en-US&page=1&include_adult=false&query=${this.searchQuery}`;
    let url = baseUrl + params;
    return fetch(url)
      .then(response => response.json())
      .then(data => console.log(data));
  },

  // находит фильм по id
  getFilmById(filmId) {
    console.log(filmId);
    const params = `movie/${filmId}?api_key=${myApiKey}&language=en-US`;
    let url = baseUrl + params;
    return fetch(url)
      .then(response => response.json())
      .then(data => data);
  },

  // находит популярные фильмы
  getPopular() {
    const params = `movie/popular?api_key=${myApiKey}&language=en-US&${this.pageNumber}`;
    let url = baseUrl + params;
    return fetch(url)
      .then(response => response.json())
      .then(data => data.results.map(data => data));
  },
  // находит фильмы в кино
  getUpcoming() {
    const params = `movie/upcoming?api_key=${myApiKey}&language=en-US&page=${this.pageNumber}`;
    let url = baseUrl + params;
    return fetch(url)
      .then(response => response.json())
      .then(data => data.results.map(data => data));
  },
  // загружает все фильмы для указанной страницы

  getRatedFilmsByPage(pageNum = 1) {
    const url = `${baseUrl}movie/rated?api_key=${myApiKey}&language=en-US&page=${pageNum}`;
    return fetch(url).then(response => response.json());
  },
  getPopularFilmsByPage(pageNum = 1) {
    const url = `${baseUrl}movie/popular?api_key=${myApiKey}&language=en-US&page=${pageNum}`;
    return fetch(url).then(response => response.json());
  },
  getUpcomingFilmsByPage(pageNum = 1) {
    const url = `${baseUrl}movie/upcoming?api_key=${myApiKey}&language=en-US&page=${pageNum}`;
    return fetch(url).then(response => response.json());
  },
};
