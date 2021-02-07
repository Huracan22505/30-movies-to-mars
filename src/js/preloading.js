import refs from '../js/refs';
checkPreloader();

function checkPreloader() {
  if (sessionStorage.preload) {
    refs.preLoadPage.remove();
  } else {
    deletePreloader();
  }
}

function deletePreloader() {
  setTimeout(() => {
    refs.preLoadPage.remove();
    sessionStorage.setItem('preload', 'done');
  }, 3100);
}
