import refs from './refs.js'

const {openMenuBtn, closeMenuBtn, menu, openInputBtn, closeInputBtn, inputPanel} = refs;

openMenuBtn.addEventListener('click', toggleModal);
closeMenuBtn.addEventListener('click', toggleModal);
openInputBtn.addEventListener('click', onSearch);
closeInputBtn.addEventListener('click', onSearch);

function toggleModal() {
  menu.classList.toggle('is-open');
}

function onSearch() {
  inputPanel.classList.toggle('is-open')
} 
