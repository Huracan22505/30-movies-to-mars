import refs from './refs.js'

const {openMenuBtn, closeMenuBtn, menu, openInputBtn, closeInputBtn, inputPanel, burger, switcher} = refs;

openMenuBtn.addEventListener('click', toggleModal);
closeMenuBtn.addEventListener('click', toggleModal);
openInputBtn.addEventListener('click', onSearch);
closeInputBtn.addEventListener('click', onSearch);
menu.addEventListener('click', (e)=>{if(e.target === switcher) {menu.classList.remove('is-open'); document.body.classList.remove('modal-open')}
})

function toggleModal() {
  menu.classList.toggle('is-open');
  document.body.classList.toggle('modal-open')
}

function onSearch() {
  inputPanel.classList.toggle('is-open')
} 
