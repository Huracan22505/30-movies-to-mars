import firebase from 'firebase/app'
import 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/messaging'

import refs from './refs.js';
const { loginFormBackdrop, loginFormCloseButton, loginFormOpenButton, loginFormOpenButtonDesktop, signinBtn, signupBtn, 
        regEmail, regPass, signupEmail, signupPass, logoutBtn, loginFields, loginErrorMessage, menu, welcomeMeassage, 
        libraryRef, cardModal, libraryRefMobile, googleAuth, phoneAuth } = refs;

const firebaseConfig = {
  apiKey: "AIzaSyABHgMmII0_xvD9k6iq4L1Mf5KdyZM-ZFY",
  authDomain: "thirty-movies-to-mars.firebaseapp.com",
  projectId: "thirty-movies-to-mars",
  storageBucket: "thirty-movies-to-mars.appspot.com",
  messagingSenderId: "663360674405",
  appId: "1:663360674405:web:a99b0fcd910e46b7d7848c"
};

firebase.initializeApp(firebaseConfig);
firebase.auth().useDeviceLanguage();

//login event
signinBtn.addEventListener('click', loginEvnt);
//signup event
signupBtn.addEventListener('click', signupEvnt);
//Google auth event
googleAuth.addEventListener('click', googleLogin);
//Phone auth event
phoneAuth.addEventListener('click', phoneLogin);
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
  promise.then(addEvntListenerOnModal)
  .catch(error => loginError(error));
};

function signupEvnt(e) {
  //get email and password
  e.preventDefault();
  const signEmail = signupEmail.value;
  const signPassword = signupPass.value;
  const auth = firebase.auth();
  //create new user
  const promise = auth.createUserWithEmailAndPassword(signEmail, signPassword);
  promise.then(addEvntListenerOnModal)
  .catch(error => loginError(error));
};

function googleLogin() {
const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(function (result) {
      userExists(result.user);
    })
    .then(addEvntListenerOnModal)
    .catch(error => loginError(error));
};

function phoneLogin() {
const ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start('#phoneAuth', {
  signInOptions: [
    {
      provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      recaptchaParameters: {
        type: 'image',
        size: 'normal',
        badge: 'bottomleft'
      },
      defaultCountry: 'UA',
      defaultNationalNumber: '0991234567',
      loginHint: '+380991234567'
    }
  ]
});
};

function logoutEvnt() {
  firebase.auth().signOut();
}

//realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {

  if(firebaseUser) {
    loginFields.classList.add('is-hidden');
    googleAuth.classList.add('is-hidden');
    phoneAuth.classList.add('is-hidden');
    logoutBtn.classList.remove('is-hidden');
    libraryRef.removeEventListener('click', libraryAuth);
    libraryRefMobile.removeEventListener('click', libraryAuth);
    addWelcomeMessage();
    closeLoginForm();

  } else {
    libraryRef.addEventListener('click', libraryAuth);
    libraryRefMobile.addEventListener('click', libraryAuth);
    loginFields.classList.remove('is-hidden');
    googleAuth.classList.remove('is-hidden');
    phoneAuth.classList.remove('is-hidden');
    logoutBtn.classList.add('is-hidden');
    welcomeMeassage.classList.add('is-hidden');
  }

});

function libraryAuth(e) {
  e.preventDefault();
  openLoginForm();
}

function loginError(err) {
  regPass.value = '';
  signupPass.value = '';
  loginErrorMessage.textContent = err;
  loginErrorMessage.classList.remove('is-hidden');
}

function addWelcomeMessage() {
  welcomeMeassage.classList.remove('is-hidden');
  welcomeMeassage.textContent = `Hi! You logged in under ${firebase.auth().currentUser.email || firebase.auth().currentUser.phoneNumber}`;
}

function addEvntListenerOnModal() {
  if (cardModal.classList.contains('card__modal__lightbox__is-open')) {
  
  const addToWatched = document.querySelector('.card__btn__watched');
  const addToQueue = document.querySelector('.card__btn__queue');
  addToQueue.removeEventListener('click', openLoginForm);
  addToWatched.removeEventListener('click', openLoginForm);
  const refsModal = {};
  let queue = {};
  let watched = {};
  refsModal.watched = document.querySelector('.card__btn__watched');
  refsModal.queue = document.querySelector('.card__btn__queue');
  refsModal.queue.addEventListener('click', queue.addLocalStorage.bind(queue));
  refsModal.watched.addEventListener('click', watched.addLocalStorage.bind(watched));
  queue = new AddLocalStorage('queue', filmId, refsModal.queue, 'is__active');
  watched = new AddLocalStorage('watched', filmId, refsModal.watched, 'is__active', queue);
  } 
  else {return}
};

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

export default { firebase, openLoginForm };