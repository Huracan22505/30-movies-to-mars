import refs from './refs.js'

const {openMenuBtn, closeMenuBtn, menu, openInputBtn, closeInputBtn, inputPanel, switcher} = refs;

openMenuBtn.addEventListener('click', onOpenBurger);
openInputBtn.addEventListener('click', onSearch);
closeInputBtn.addEventListener('click', onSearch);
menu.addEventListener('click', (e)=>{ if(e.target === switcher) { menu.classList.remove('is-open'); document.querySelector('html').style.overflow = 'hidden'}
})
  

function onOpenBurger() {
  menu.classList.add('is-open');
  closeMenuBtn.addEventListener('click', onCloseBurger);
  document.querySelector('html').style.overflow = 'hidden';
}

function onCloseBurger() {
  menu.classList.remove('is-open');
  document.querySelector('html').style.overflow = '';
}
        
function onSearch() {
  inputPanel.classList.toggle('is-open')
} 