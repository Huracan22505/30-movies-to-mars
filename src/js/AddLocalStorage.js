export default class AddLocalStorage {
  constructor(listName, idMovie, button, classCSS, queue = {}) {
    if (!localStorage.getItem(listName)) {
      localStorage.setItem(listName, '[]');
    }

    this.id = Number(idMovie);
    this.listName = listName;
    this.localStorageArray = JSON.parse(localStorage.getItem(this.listName));
    this.newLocalStorageArray = [];
    this.isActive = this.localStorageArray.includes(this.id);
    this.queue = queue;
    this.button = button;
    this.classCSS = classCSS;
    this.active();
  }

  active() {
    if (this.isActive) {
      this.button.classList.add(this.classCSS);
      this.button.innerText = 'REMOVE FROM ' + this.button.dataset.name;
      return this.active;
    }
    this.button.classList.remove(this.classCSS);
    this.button.innerText = 'ADD TO ' + this.button.dataset.name;

    return this.active;
  }

  checkQueue() {
    this.queue.newLocalStorageArray = [
      ...this.queue.localStorageArray.filter(id => id !== this.id),
    ];
    localStorage.setItem(
      'queue',
      JSON.stringify(this.queue.newLocalStorageArray),
    );
    this.queue.button.classList.remove(this.classCSS);
    this.queue.isActive = false;
    this.queue.button.innerText = 'ADD TO ' + this.button.dataset.name;
  }

  addLocalStorage() {
    if (this.listName === 'watched' && this.isActive === false) {
      this.checkQueue();
    }

    if (!this.isActive) {
      this.newLocalStorageArray = [
        ...this.localStorageArray.filter(id => id !== this.id),
        this.id,
      ];
      localStorage.setItem(
        this.listName,
        JSON.stringify(this.newLocalStorageArray),
      );
      this.isActive = true;
      this.active();
      return;
    }

    this.newLocalStorageArray = this.localStorageArray.filter(
      id => id !== this.id,
    );
    localStorage.setItem(
      this.listName,
      JSON.stringify(this.newLocalStorageArray),
    );
    this.isActive = false;
    this.active();
  }
}
