import refs from './refs.js';
const { iconTheme, bodyTheme } = refs;

const Theme = {
  LIGHT: 'lightTheme',
  DARK: 'darkTheme',
};

const STORAGE_KEY = 'theme';

iconTheme.addEventListener('change', changeTheme);
defaultTheme();

function defaultTheme() {
  const theme = localStorage.getItem(STORAGE_KEY);
  if (theme === 'true') {
    bodyTheme.classList.add(Theme.DARK);
    iconTheme.checked = true;
  } else {
    bodyTheme.classList.add(Theme.LIGHT);
  }
}

function changeTheme(evt) {
  bodyTheme.classList.toggle(Theme.DARK);
  bodyTheme.classList.toggle(Theme.LIGHT);
  localStorage.setItem(STORAGE_KEY, evt.target.checked);
}