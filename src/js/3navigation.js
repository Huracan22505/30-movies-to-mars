(() => {
  const refs = {
    openMenuBtn: document.querySelector('.openBurgerMenu'),
    closeMenuBtn: document.querySelector('.closeBurgerMenu'),
    menu: document.querySelector('.navBar'),
  };
  refs.openMenuBtn.addEventListener('click', toggleModal);
  refs.closeMenuBtn.addEventListener('click', toggleModal);

  function toggleModal() {
    refs.menu.classList.toggle('is-open');
  }
})();
