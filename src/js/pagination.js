// import filmDetailsPage from './4filmDetailsPage.js';
import apiService from './apiService.js';
import refs from './refs.js';
import galleryTemlate from '../templates/galleryPage.hbs';

const { galleryBox } = refs;
let currentPage = 1;
let totalPages = 0;
let type = 'popular';
let userQuery = '';

document.body.addEventListener(
  'search',
  function (e) {
    // clear old pagination
    document.querySelector('.pagination__wrapper').innerHTML = '';
    type = 'search';
    userQuery = e.detail.query;
    currentPage = 1;
    // totalPages = data._totalPages;
    createPaginationButton(e.detail.data._totalPages);
    addListenersForPaginationButtons();
    checkLeftAndRightButtons();
  },
  false,
);

document.querySelector('.popularBtn').addEventListener('click', function () {
  type = 'popular';
  currentPage = 1;
  resetPaginationForFirstPage();
});

document.querySelector('.topRatedBtn').addEventListener('click', function () {
  type = 'rated';
  currentPage = 1;
  resetPaginationForFirstPage();
});

document.querySelector('.upcomingBtn').addEventListener('click', function () {
  type = 'upcoming';
  currentPage = 1;
  resetPaginationForFirstPage();
});

function resetPaginationForFirstPage() {
  let buttons = document.querySelectorAll('.pagination__button');
  buttons[0].remove();
  buttons[1].remove();
  let firstButton = document.createElement('button');
  firstButton.classList.add('pagination__button');
  firstButton.innerHTML = 1;
  firstButton.setAttribute('data-button-id', 1);

  let secondButton = document.createElement('button');
  secondButton.classList.add('pagination__button');
  secondButton.innerHTML = 2;
  secondButton.setAttribute('data-button-id', 2);

  let parentOfLastElement = document.querySelector('.pagination__wrapper');

  parentOfLastElement.insertBefore(
    firstButton,
    document.querySelector('.pagination__button-dots'),
  );

  parentOfLastElement.insertBefore(
    secondButton,
    document.querySelector('.pagination__button-dots'),
  );
  addListenersForPaginationButtons(true);
}

apiService.getAllFilmsByPage().then(data => {
  // use later as such:
  // filmDetailsPage.renderGallery(data.results);

  //comment it later
  renderGallery(data.results);
  totalPages = data.totalPages;
  createPaginationButton(data.totalPages);
  addListenersForPaginationButtons();
  checkLeftAndRightButtons();
  currentPage = 1;
});

// remove later and use 'import filmDetailsPage from './4filmDetailsPage.js';'
function renderGallery(result) {
  let items = galleryTemlate(result);
  galleryBox.insertAdjacentHTML('beforeend', items);
}

function checkLeftAndRightButtons() {
  if (currentPage === 1) {
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
  const paginationWrapper = document.querySelector('.pagination__wrapper');

  // стрелка влево
  let arrowLeftButton = document.createElement('button');
  arrowLeftButton.classList.add('pagination__arrow-left');
  arrowLeftButton.innerHTML = '&#8592;';
  arrowLeftButton.addEventListener('click', () => {
    // если страница 500 (последняя)
    if (currentPage == totalPages) {
      let buttons = Array.from(
        document.querySelectorAll('.pagination__button'),
      ).reverse();

      for (let i = 0; i < buttons.length; i++) {
        buttons[i].setAttribute('data-button-id', totalPages - (i + 1));
        buttons[i].innerText = totalPages - (i + 1);
      }
    }

    if (type === 'popular') {
      apiService.getPopularFilmsByPage(currentPage - 1).then(data => {
        data = apiService.buildModel(data);
        document.querySelector('.gallery__wrapper').innerHTML = '';
        renderGallery(data.results);
        if (currentPage != totalPages) {
          currentPage = currentPage - 1;
        }

        checkLeftAndRightButtons();
        updateNumbersOfButtonsForPrevPage();
      });
    } else if (type === 'rated') {
      apiService.getRatedFilmsByPagePagination(currentPage - 1).then(data => {
        data = apiService.buildModel(data);
        document.querySelector('.gallery__wrapper').innerHTML = '';
        renderGallery(data.results);
        if (currentPage != totalPages) {
          currentPage = currentPage - 1;
        }

        checkLeftAndRightButtons();
        updateNumbersOfButtonsForPrevPage();
      });
    } else if (type === 'upcoming') {
      apiService.getUpcomingFilmsByPage(currentPage - 1).then(data => {
        data = apiService.buildModel(data);
        document.querySelector('.gallery__wrapper').innerHTML = '';
        renderGallery(data.results);
        if (currentPage != totalPages) {
          currentPage = currentPage - 1;
        }

        checkLeftAndRightButtons();
        updateNumbersOfButtonsForPrevPage();
      });
    } else if (type === 'search') {
      apiService.getSearchResult(userQuery, currentPage - 1).then(data => {
        document.querySelector('.gallery__wrapper').innerHTML = '';
        renderGallery(data._results);
        if (currentPage != totalPages) {
          currentPage = currentPage - 1;
        }

        checkLeftAndRightButtons();
        updateNumbersOfButtonsForPrevPage();
      });
    }
  });
  paginationWrapper.append(arrowLeftButton);

  //     создание кнопок 1 и 2 в начале    //
  for (let i = 0; i < 2; i++) {
    let newButton = document.createElement('button');
    newButton.classList.add('pagination__button');
    newButton.innerHTML = i + 1;
    newButton.setAttribute('data-button-id', i + 1);
    paginationWrapper.append(newButton);
  }

  // создание кнопки '...'
  let threeDotsButton = document.createElement('button');
  threeDotsButton.classList.add('pagination__button-dots');
  threeDotsButton.innerHTML = '...';
  paginationWrapper.append(threeDotsButton);

  // создание последней кнопки (500 например)
  let lastButton = document.createElement('button');
  lastButton.classList.add('pagination__button-last');
  lastButton.innerHTML = lastNumber;
  lastButton.setAttribute('data-button-id', lastNumber);
  lastButton.addEventListener('click', function () {
    // elementId это pageNum в apiService
    apiService.getPopularFilmsByPage(lastNumber).then(data => {
      data = apiService.buildModel(data);
      if (type === 'popular') {
        document.querySelector('.gallery__wrapper').innerHTML = '';
        renderGallery(data.results);
        currentPage = lastNumber;
        checkLeftAndRightButtons();
      } else if (type === 'rated') {
        document.querySelector('.gallery__wrapper').innerHTML = '';
        renderGallery(data.results);
        currentPage = lastNumber;
        checkLeftAndRightButtons();
      } else if (type === 'upcoming') {
        document.querySelector('.gallery__wrapper').innerHTML = '';
        renderGallery(data.results);
        currentPage = lastNumber;
        checkLeftAndRightButtons();
      }
    });
  });
  paginationWrapper.append(lastButton);

  // стрелка вправо
  let arrowRightButton = document.createElement('button');
  arrowRightButton.classList.add('pagination__arrow-right');
  arrowRightButton.innerHTML = '&#8594;';
  arrowRightButton.addEventListener('click', () => {
    currentPage = parseInt(currentPage);
    if (type === 'popular') {
      apiService.getPopularFilmsByPage(currentPage + 1).then(data => {
        data = apiService.buildModel(data);
        document.querySelector('.gallery__wrapper').innerHTML = '';
        renderGallery(data.results);
        currentPage = currentPage + 1;
        checkLeftAndRightButtons();
        updateNumbersOfButtonsForNextPage();
      });
    } else if (type === 'rated') {
      apiService.getRatedFilmsByPagePagination(currentPage + 1).then(data => {
        data = apiService.buildModel(data);
        document.querySelector('.gallery__wrapper').innerHTML = '';
        renderGallery(data.results);
        currentPage = currentPage + 1;
        checkLeftAndRightButtons();
        updateNumbersOfButtonsForNextPage();
      });
    } else if (type === 'upcoming') {
      apiService.getUpcomingFilmsByPage(currentPage + 1).then(data => {
        data = apiService.buildModel(data);
        document.querySelector('.gallery__wrapper').innerHTML = '';
        renderGallery(data.results);
        currentPage = currentPage + 1;
        checkLeftAndRightButtons();
        updateNumbersOfButtonsForNextPage();
      });
    } else if (type === 'search') {
      apiService.getSearchResult(userQuery, currentPage + 1).then(data => {
        document.querySelector('.gallery__wrapper').innerHTML = '';
        renderGallery(data._results);
        currentPage = currentPage + 1;
        checkLeftAndRightButtons();
        updateNumbersOfButtonsForNextPage();
      });
    }
  });
  paginationWrapper.append(arrowRightButton);
}

// функция обновления следубщей кнопки
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
  addListenersForPaginationButtons(true);
}

// функция обновления предыдущей кнопки
function updateNumbersOfButtonsForPrevPage() {
  let buttons = document.querySelectorAll('.pagination__button');
  let newId = buttons[0].getAttribute('data-button-id');

  if (currentPage == totalPages) {
    currentPage = currentPage - 1;
    document.querySelector('.pagination__button-dots').remove();
    return;
  }

  if (currentPage == totalPages - 2) {
    const paginationWrapper = document.querySelector('.pagination__wrapper');
    const paginationLastElement = document.querySelector(
      '.pagination__button-last',
    );
    //
    let threeDotsButton = document.createElement('button');
    threeDotsButton.classList.add('pagination__button-dots');
    threeDotsButton.innerHTML = '...';
    paginationWrapper.insertBefore(threeDotsButton, paginationLastElement);
  }

  if (newId - 1 !== 0) {
    buttons[buttons.length - 1].remove();
    let newButton = document.createElement('button');
    newButton.classList.add('pagination__button');
    newButton.innerHTML = parseInt(newId) - 1;
    newButton.setAttribute('data-button-id', parseInt(newId) - 1);
    let parentOfLastElement = buttons[0].parentNode;
    parentOfLastElement.insertBefore(newButton, buttons[0]);
    addListenersForPaginationButtons(true);
  }
}

// добавляем слушатели на кнопки динамично
function addListenersForPaginationButtons(lastElement = false) {
  let elements = document.querySelectorAll('.pagination__button');

  if (lastElement) {
    elements = [elements[elements.length - 1]];
  }
  // доступ к кнопкам в хтмл

  for (let i = 0; i < elements.length; i++) {
    //слушатель событий клика на кнопку
    elements[i].addEventListener('click', function () {
      let elementId = elements[i].getAttribute('data-button-id');

      // elementId это pageNum в apiService
      if (type === 'popular') {
        apiService.getPopularFilmsByPage(elementId).then(data => {
          data = apiService.buildModel(data);
          document.querySelector('.gallery__wrapper').innerHTML = '';
          renderGallery(data.results);
          currentPage = elementId;
          checkLeftAndRightButtons();
        });
      } else if (type === 'rated') {
        apiService.getRatedFilmsByPagePagination(elementId).then(data => {
          data = apiService.buildModel(data);
          document.querySelector('.gallery__wrapper').innerHTML = '';
          renderGallery(data.results);
          currentPage = elementId;
          checkLeftAndRightButtons();
        });
      } else if (type === 'upcoming') {
        apiService.getUpcomingFilmsByPage(elementId).then(data => {
          data = apiService.buildModel(data);
          document.querySelector('.gallery__wrapper').innerHTML = '';
          renderGallery(data.results);
          currentPage = elementId;
          checkLeftAndRightButtons();
        });
      }
    });
  }
}
