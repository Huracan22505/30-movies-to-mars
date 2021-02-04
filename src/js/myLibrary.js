import request from '../js/apiService';
import refs from './refs';
import renderService from '../js/renderService.js';
import modal from '../js/4filmDetailsPage';

const btnWatched = document.querySelector('#watched');
const btnQueue = document.querySelector('#queue');

getDataFromLocalStorage('watched', 1);
btnSwitch(btnWatched, btnQueue);

btnWatched.addEventListener('click', e => {
  getDataFromLocalStorage('watched');
  btnSwitch(btnWatched, btnQueue);
});

btnQueue.addEventListener('click', e => {
  currentListName();
  getDataFromLocalStorage('queue');
  btnSwitch(btnQueue, btnWatched);
});

function btnSwitch(btnRefA, btnRefB) {
  btnRefA.classList.add('is__active');
  btnRefA.setAttribute('disabled', '');

  if (btnRefA.hasAttribute('active')) {
    btnRefA.removeAttribute('active');
  }

  btnRefB.classList.remove('is__active');
  btnRefB.removeAttribute('disabled');
  btnRefB.setAttribute('active', '');
}

async function getDataFromLocalStorage(ListName, page = 1) {
  try {
    refs.libraryList.innerHTML = '';

    const response = JSON.parse(localStorage.getItem(ListName));
    if (response === null) {
      return;
    }

    const amountOfLoad = 12;
    const firstIndex = page * amountOfLoad - amountOfLoad;
    const lastIndex = page * amountOfLoad;
    const shortResponse = response.slice(firstIndex, lastIndex);

    const responseArr = shortResponse.map(id => {
      return request.getFilmById(id);
    });

    const dataArr = await Promise.all(responseArr);

    renderService.renderGallery(dataArr);
  } catch (error) {
    console.log(error);
  }
}

function currentListName() {
  if (btnWatched.hasAttributes('disabled')) {
    return 'watched';
  }
  if (btnQueue.hasAttributes('disabled')) {
    return 'queue';
  }
}
