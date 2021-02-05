export default class OuterResponceModel {
  constructor(page, totalPages, results, totalResults) {
    this.page = page;
    this.totalPages = totalPages;
    this.results = results;
    this.totalResults = totalResults;
  }

  get page() {
    return this._page;
  }
  get totalPages() {
    return this._totalPages;
  }
  get results() {
    return this._results;
  }
  get totalResults() {
    return this._totalResults;
  }

  set page(value) {
    this._page = value;
  }
  set totalPages(value) {
    this._totalPages = value;
  }
  set results(value) {
    this._results = value;
  }
  set totalResults(value) {
    this._totalResults = value;
  }
}
