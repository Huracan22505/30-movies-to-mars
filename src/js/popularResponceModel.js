import genresList from '../genresList.json';

export default class InnerResponceModel {
  // Собственные свойства класса размещаем в конструкторе
  constructor(
    id,
    posterPath,
    originalTitle,
    genreIds,
    releaseDate,
    totalPages,
  ) {
    this.id = id;
    this.posterPath = 'https://image.tmdb.org/t/p/w500' + posterPath;
    this.originalTitle = originalTitle;
    this.genres = this.getCorrectGenres(genreIds);
    this.releaseDate = this.getReleaseDate(releaseDate);
  }

  getCorrectGenres(genresArray) {
    let genres = [];
    genresList.map(el => {
      if (genresArray.includes(el.id)) {
        genres.push(el.name);
      }
    });
    return genres.join(', ');
  }

  getReleaseDate(date) {
    if (date === null || date === undefined) return;
    return date.slice(0, 4);
  }

  get id() {
    return this._id;
  }
  get posterPath() {
    return this._posterPath;
  }
  get originalTitle() {
    return this._originalTitle;
  }
  get genres() {
    return this._genres;
  }
  get releaseDate() {
    return this._releaseDate;
  }

  set id(value) {
    this._id = value;
  }
  set posterPath(value) {
    this._posterPath = value;
  }
  set originalTitle(value) {
    this._originalTitle = value;
  }
  set genres(value) {
    this._genres = value;
  }
  set releaseDate(value) {
    this._releaseDate = value;
  }
}
