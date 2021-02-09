const scrollButton = document.querySelector('.scroll__up');
window.addEventListener('scroll', picUpToTop);
scrollButton.addEventListener('click', backToTop);

function picUpToTop() {
  const scroll = window.pageYOffset;
  const coords = document.documentElement.clientHeight;
  if (scroll > coords) {
    scrollButton.classList.add('scroll__up__top');
  }
  if (scroll < coords) {
    scrollButton.classList.remove('scroll__up__top');
  }
}

function backToTop() {
  if (window.pageYOffset > 0) {
    window.scrollBy(0, -80);
    setTimeout(backToTop, 20);
  }
}