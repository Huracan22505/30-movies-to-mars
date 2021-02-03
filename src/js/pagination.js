// import filmDetailsPage from './4filmDetailsPage.js';
import apiService from './apiService.js';
import refs from './refs.js';
import galleryTemlate from '../templates/galleryPage.hbs';

const { galleryBox } = refs;
let currentPage = 1;
let totalPages = 0;

apiService.getAllFilmsByPage().then(data => {
  // use later as such:
  // filmDetailsPage.renderGallery(data.results);

  //comment it later
  renderGallery(data.results);
  totalPages = data.totalPages;
  createPaginationButton(data.totalPages);
  processPaginationButtons();
  checkLeftAndRightButtons();
});

// remove later and use 'import filmDetailsPage from './4filmDetailsPage.js';'
function renderGallery(result) {
  console.log(result);
  let items = galleryTemlate(result);
  galleryBox.insertAdjacentHTML('beforeend', items);
}

function checkLeftAndRightButtons() {
  if (currentPage == 1) {
    document.querySelector('.pagination__arrow-left').classList.add('hidden');
  } else {
    document
      .querySelector('.pagination__arrow-left')
      .classList.remove('hidden');
  }
  if (currentPage == totalPages) {
    document.querySelector('.pagination__arrow-right').classList.add('hidden');
  } else {
    document
      .querySelector('.pagination__arrow-right')
      .classList.remove('hidden');
  }
}

function createPaginationButton(lastNumber) {
  console.log(lastNumber);
  const paginationWrapper = document.querySelector('.pagination__wrapper');

  // стрелка влево
  let arrowLeftButton = document.createElement('button');
  arrowLeftButton.classList.add('pagination__arrow-left');
  arrowLeftButton.innerHTML = '&#8592;';
  arrowLeftButton.addEventListener('click', () => {
    apiService.getAllFilmsByPage(currentPage - 1).then(data => {
      document.querySelector('.gallery__wrapper').innerHTML = '';
      renderGallery(data.results);
      currentPage = currentPage - 1;
      checkLeftAndRightButtons();
      updateNumbersOfButtonsForPrevPage();
    });
  });
  paginationWrapper.append(arrowLeftButton);

  for (let i = 0; i < 5; i++) {
    let newButton = document.createElement('button');
    newButton.classList.add('pagination__button');
    newButton.innerHTML = i + 1;
    newButton.setAttribute('data-button-id', i + 1);
    paginationWrapper.append(newButton);
  }

  let threeDotsButton = document.createElement('button');
  threeDotsButton.classList.add('pagination__button-dots');
  threeDotsButton.innerHTML = '...';
  paginationWrapper.append(threeDotsButton);

  let lastButton = document.createElement('button');
  lastButton.classList.add('pagination__button-last');
  lastButton.innerHTML = lastNumber;
  lastButton.setAttribute('data-button-id', lastNumber);
  lastButton.addEventListener('click', function () {
    // elementId это pageNum в apiService
    apiService.getAllFilmsByPage(lastNumber).then(data => {
      document.querySelector('.gallery__wrapper').innerHTML = '';
      renderGallery(data.results);
      currentPage = lastNumber;
      checkLeftAndRightButtons();
    });
  });
  paginationWrapper.append(lastButton);

  // стрелка вправо
  let arrowRightButton = document.createElement('button');
  arrowRightButton.classList.add('pagination__arrow-right');
  arrowRightButton.innerHTML = '&#8594;';
  arrowRightButton.addEventListener('click', () => {
    apiService.getAllFilmsByPage(currentPage + 1).then(data => {
      document.querySelector('.gallery__wrapper').innerHTML = '';
      renderGallery(data.results);
      currentPage = currentPage + 1;
      checkLeftAndRightButtons();
      updateNumbersOfButtonsForNextPage();
    });
  });
  paginationWrapper.append(arrowRightButton);
}

function updateNumbersOfButtonsForNextPage() {
  let buttons = document.querySelectorAll('.pagination__button');
  buttons[0].remove();
  let newButton = document.createElement('button');
  newButton.classList.add('pagination__button');
  let newId = buttons[buttons.length - 1].getAttribute('data-button-id');
  newButton.innerHTML = parseInt(newId) + 1;
  newButton.setAttribute('data-button-id', parseInt(newId) + 1);

  let parentOfLastElement = buttons[buttons.length - 1].parentNode;
  parentOfLastElement.insertBefore(
    newButton,
    buttons[buttons.length - 1].nextSibling,
  );
}

function updateNumbersOfButtonsForPrevPage() {
  let buttons = document.querySelectorAll('.pagination__button');
  buttons[buttons.length - 1].remove();
  let newButton = document.createElement('button');
  newButton.classList.add('pagination__button');
  let newId = buttons[0].getAttribute('data-button-id');
  newButton.innerHTML = parseInt(newId) - 1;
  newButton.setAttribute('data-button-id', parseInt(newId) - 1);

  let parentOfLastElement = buttons[0].parentNode;
  parentOfLastElement.insertBefore(newButton, buttons[0]);
}

function processPaginationButtons() {
  // доступ к кнопкам в хтмл
  const elements = document.querySelectorAll('.pagination__button');
  for (let i = 0; i < elements.length; i++) {
    //слушатель событий клика на кнопку
    elements[i].addEventListener('click', function () {
      let elementId = elements[i].getAttribute('data-button-id');

      // elementId это pageNum в apiService
      apiService.getAllFilmsByPage(elementId).then(data => {
        document.querySelector('.gallery__wrapper').innerHTML = '';
        renderGallery(data.results);
        currentPage = elementId;
        checkLeftAndRightButtons();
      });
    });
  }
}
