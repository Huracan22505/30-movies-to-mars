const baseUrl = 'https://api.themoviedb.org/3/';
const myApiKey = '2955876276611e1cc2d97a4794387b9d';

export default {
  // this.imgUrl: ,
  searchQuery: '',
  pageNumber: 1,
  
  // вывод трендовых фильмов (начальная галерея)
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


  //получение img

  // надоходит новые фильмы
  getLatest() {
    const params = `movie/latest?api_key=${myApiKey}&language=en-US`;
    let url = baseUrl + params;
    return fetch(url)
      .then(response => response.json())
      .then(data => data.results.map(data => data));
  },
  getUpcoming() {
    const params = `movie/upcoming?api_key=${myApiKey}&language=en-US&page=${this.pageNumber}`;
    let url = baseUrl + params;
    return fetch(url)
      .then(response => response.json())
      .then(data => data.results.map(data => data));
  },
  getTopRated() {
    const params = `movie/top_rated?api_key=${myApiKey}&language=en-US&page=${this.pageNumber}`;
    let url = baseUrl + params;
    return fetch(url)
      .then(response => response.json())
      .then(data => data.results.map(data => data));
=======
  // загружает все фильмы для указанной страницы
  getAllFilmsByPage(pageNum = 1) {
    const url = `${baseUrl}movie/popular?api_key=${myApiKey}&language=en-US&page=${pageNum}`;
    return fetch(url).then(response => response.json());
  },
};
