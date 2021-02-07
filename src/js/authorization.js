import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/messaging'

import refs from './refs.js';
const { loginFormBackdrop, loginFormCloseButton, loginFormOpenButton, loginFormOpenButtonDesktop, signinBtn, signupBtn, regEmail, regPass, signupEmail, signupPass, logoutBtn, loginFields, loginErrorMessage, menu } = refs;

const firebaseConfig = {
  apiKey: "AIzaSyABHgMmII0_xvD9k6iq4L1Mf5KdyZM-ZFY",
  authDomain: "thirty-movies-to-mars.firebaseapp.com",
  projectId: "thirty-movies-to-mars",
  storageBucket: "thirty-movies-to-mars.appspot.com",
  messagingSenderId: "663360674405",
  appId: "1:663360674405:web:a99b0fcd910e46b7d7848c"
};

firebase.initializeApp(firebaseConfig);

//login event
signinBtn.addEventListener('click', loginEvnt);
//signup event
signupBtn.addEventListener('click', signupEvnt);
//logout event
logoutBtn.addEventListener('click', logoutEvnt);

function loginEvnt(e) {
  //get email and password
  e.preventDefault();
  const loginEmail = regEmail.value;
  const loginPassword = regPass.value;
  const auth = firebase.auth();
  //sign in
  const promise = auth.signInWithEmailAndPassword(loginEmail, loginPassword);
  promise.catch(e => loginError(e));
};

function signupEvnt(e) {
  //get email and password
  e.preventDefault();
  const signEmail = signupEmail.value;
  const signPassword = signupPass.value;
  const auth = firebase.auth();
  //create new user
  const promise = auth.createUserWithEmailAndPassword(signEmail, signPassword);
  promise.catch(e => loginError(e));
};

function logoutEvnt() {
  firebase.auth().signOut();
}

//realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {

  if(firebaseUser) {
    logoutBtn.classList.remove('is-hidden');
    loginFields.classList.add('is-hidden');
    closeLoginForm();

  } else {
    loginFields.classList.remove('is-hidden');
    logoutBtn.classList.add('is-hidden');
  }

});

function loginError(e) {
  regPass.value = '';
  signupPass.value = '';
  loginErrorMessage.textContent = e;
  loginErrorMessage.classList.remove('is-hidden');
}
//Open and close login form on click/esc/side click/close button click
loginFormOpenButton.addEventListener('click', openLoginForm);
loginFormOpenButtonDesktop.addEventListener('click', openLoginForm);

function openLoginForm() {
  loginFormBackdrop.classList.remove('is-hidden');
  loginFormOpenButton.removeEventListener('click', openLoginForm);
  loginFormOpenButtonDesktop.removeEventListener('click', openLoginForm);
  menu.classList.remove('is-open');
  document.querySelector('html').style.overflow = 'hidden';
  loginFormCloseButton.addEventListener('click', closeLoginForm);
  window.addEventListener('keydown', closeLoginFormOnEsc);
  loginFormBackdrop.addEventListener('click', closeLoginFormOnBackdropClick);
}

function closeLoginForm() {
  loginFormBackdrop.classList.add('is-hidden');
  loginErrorMessage.classList.add('is-hidden');
  loginFormCloseButton.removeEventListener('click', closeLoginForm);
  window.removeEventListener('keydown', closeLoginFormOnEsc);
  loginFormOpenButton.addEventListener('click', openLoginForm);
  loginFormOpenButtonDesktop.addEventListener('click', openLoginForm);
  document.querySelector('html').style.overflow = '';
}

function closeLoginFormOnEsc(event) {
  if(event.code !== "Escape") return;
  closeLoginForm();
};

function closeLoginFormOnBackdropClick(event) {
  if(event.target !== loginFormBackdrop) return;
  closeLoginForm();
}
