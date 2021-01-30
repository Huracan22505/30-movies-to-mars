const baseUrl = 'https://api.themoviedb.org/3/';
const myApiKey = '2955876276611e1cc2d97a4794387b9d';

export default {
  // this.imgUrl: ,
  searchQuery: '',

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
    console.log(url);
    return fetch(url)
      .then(response => response.json())
      .then(data => console.log(data));
  },

  //получение img
};
