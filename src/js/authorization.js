/*import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';*/
// import 'firebase/storage';
// import 'firebase/messaging';
import refs from './refs.js';
const { loginFormBackdrop, loginFormCloseButton, loginFormOpenButton, loginFormOpenButtonDesktop } = refs;

/*firebase.initializeApp({
  apiKey: AIzaSyABHgMmII0_xvD9k6iq4L1Mf5KdyZM - ZFY,
  authDomain: 'thirty-movies-to-mars.firebaseapp.com',
  projectId: 'thirty-movies-to-mars',
  storageBucket: 'thirty-movies-to-mars.appspot.com',
  messagingSenderId: '663360674405',
  appId: '1:663360674405:web:a99b0fcd910e46b7d7848c',
});*/

loginFormOpenButton.addEventListener('click', openLoginForm);
loginFormOpenButtonDesktop.addEventListener('click', openLoginForm);

function openLoginForm() {
  loginFormBackdrop.classList.remove('is-hidden');
  loginFormOpenButton.removeEventListener('click', openLoginForm);
  loginFormOpenButtonDesktop.removeEventListener('click', openLoginForm);
  loginFormCloseButton.addEventListener('click', closeLoginForm);
  window.addEventListener('keydown', closeLoginFormOnEsc);
  loginFormBackdrop.addEventListener('click', closeLoginFormOnBackdropClick);
}

function closeLoginForm() {
  loginFormBackdrop.classList.add('is-hidden');
  loginFormCloseButton.removeEventListener('click', closeLoginForm);
  window.removeEventListener('keydown', closeLoginFormOnEsc);
  loginFormOpenButton.addEventListener('click', openLoginForm);
  loginFormOpenButtonDesktop.addEventListener('click', openLoginForm);
}

function closeLoginFormOnEsc(event) {
  if(event.code !== "Escape") return;
  closeLoginForm();
};

function closeLoginFormOnBackdropClick(event) {
  if(event.target !== loginFormBackdrop) return;
  closeLoginForm();
}