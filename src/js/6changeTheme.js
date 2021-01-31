import refs from './refs.js';
const { iconThemeDesktop, iconThemeMobile, bodyTheme } = refs;

const Theme = {
  LIGHT: 'lightTheme',
  DARK: 'darkTheme',
};

const STORAGE_KEY = 'theme';
iconThemeMobile.addEventListener('change', changeThemeMobile);
iconThemeDesktop.addEventListener('change', changeThemeDesktop);
defaultThemeMobile();
defaultThemeDesktop();

// Mobile\laptop Theme
function defaultThemeMobile() {
  const theme = localStorage.getItem(STORAGE_KEY);
  if (theme === 'true') {
    bodyTheme.classList.add(Theme.DARK);
    iconThemeMobile.checked = true;
  } else {
    bodyTheme.classList.add(Theme.LIGHT);
  }
}

function changeThemeMobile(e) {
  if (e.target.checked) {
    setTheme(Theme.LIGHT, Theme.DARK);
  } else {
    setTheme(Theme.DARK, Theme.LIGHT);
  }
}

// Desktop Theme
function defaultThemeDesktop() {
  const theme = localStorage.getItem(STORAGE_KEY);
  if (theme === 'true') {
    bodyTheme.classList.add(Theme.DARK);
    iconThemeDesktop.checked = true;
  } else {
    bodyTheme.classList.add(Theme.LIGHT);
  }
}
function changeThemeDesktop(e) {
  if (e.target.checked) {
    setTheme(Theme.LIGHT, Theme.DARK);
  } else {
    setTheme(Theme.DARK, Theme.LIGHT);
  }
}
function setTheme(oldTheme, newTheme) {
  bodyTheme.classList.add(newTheme);
  bodyTheme.classList.remove(oldTheme);
  localStorage.setItem(STORAGE_KEY, newTheme);
}