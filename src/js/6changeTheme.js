import refs from './refs.js';
const { iconThemeDesktop, iconThemeMobile, bodyTheme } = refs;
const STORAGE_KEY = 'theme';
const Theme = {
  LIGHT: 'lightTheme',
  DARK: 'darkTheme',
};
themeChecker();
iconThemeMobile.addEventListener('change', changeTheme);
iconThemeDesktop.addEventListener('change', changeTheme);

function changeTheme(e) {
  bodyTheme.classList.toggle(Theme.DARK);
  bodyTheme.classList.toggle(Theme.LIGHT);

  const theme = e.target.checked;

  localStorage.setItem(STORAGE_KEY, theme);
}
// Check Theme
function themeChecker() {
  const theme = localStorage.getItem(STORAGE_KEY);
  if (theme === 'true') {
    bodyTheme.classList.add(Theme.DARK);
    iconThemeDesktop.checked = true;
  } else {
    bodyTheme.classList.add(Theme.LIGHT);
  }
}
refs.year.innerHTML = new Date().getFullYear();
