import refs from '../js/refs';

function deletePreloader() {
  refs.preLoadPage.remove();
}

setTimeout(() => {
  deletePreloader();
}, 5900);
