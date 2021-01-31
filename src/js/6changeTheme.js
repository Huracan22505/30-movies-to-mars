const refs = {
  bodyTheme: document.querySelector('body'),
  iconTheme: document.querySelector('.themeSwitch__toggle'),
};
const Theme = {
  LIGHT: 'lightTheme',
  DARK: 'darkTheme',
};
const STORAGE_KEY = 'theme';
iconTheme.addEventListener('change', changeTheme);
defaultTheme();

function changeTheme(e) {
  if (e.target.checked) {
    setTheme(Theme.LIGHT, Theme.DARK);
  } else {
    setTheme(Theme.DARK, Theme.LIGHT);
  }
}
function setTheme(oldTheme, newTheme) {
  refs.bodyTheme.classList.add(newTheme);
  refs.bodyTheme.classList.remove(oldTheme);
  localStorage.setItem(STORAGE_KEY, newTheme);
}
