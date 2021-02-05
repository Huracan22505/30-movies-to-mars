import genresList from '../../genresList.json';
import image from '../../images/glideSlider/errorFilm.jpg';

export default class InnerResponceModel {
  constructor(id, posterPath, originalTitle, genreIds, releaseDate) {
    this.id = id;
    this.posterPath = this.getCorrectImages(posterPath);
    this.originalTitle = this.getOriginalTitle(originalTitle);
    this.genres = this.getCorrectGenres(genreIds);
    this.releaseDate = this.getReleaseDate(releaseDate);
  }
  getOriginalTitle(originalTitle) {
    if (originalTitle === undefined) {
      return String.fromCodePoint(0x1f640);
    }
    return originalTitle;
  }

  getCorrectImages(posterPath) {
    if (posterPath === null) {
      return image;
    }
    return 'https://image.tmdb.org/t/p/w500' + posterPath;
  }

  getCorrectGenres(genresArray) {
    if (genresArray.length === 0) {
      return String.fromCodePoint(0x1f640);
    }
    let genres = [];
    genresList.map(el => {
      if (genresArray.includes(el.id)) {
        genres.push(el.name);
      }
    });
    return genres.join(', ');
  }

  getReleaseDate(date) {
    if (date === null || date === undefined) {
      return String.fromCodePoint(0x1f640);
    }
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
