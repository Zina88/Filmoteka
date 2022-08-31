import {
  STORAGE_KEY_MOVIES,
  STORAGE_KEY_WATCHED,
  STORAGE_KEY_QUEUE,
  STORAGE_KEY_MOVIEID,
} from './constants';

import getFromLocal from './getFromLocal';
import getMovieFromLocal from './getMovieFromLocal';
import saveOnLocalStorage from './saveInLocalStorage';

const refs = {
  watchedModal: document.querySelector('#watchedModalBtn'),
  queueModal: document.querySelector('#queueModalBtn'),
};

// refs.watchedModal.addEventListener('click', addToWatched);
// refs.queueModal.addEventListener('click', addToQueue);


refs.addToWatch.addEventListener('click', onAddToWatchClick);
// refs.addToQueue.addEventListener('click', onAddToQueueClick);

let arrayFromLocal = getFromLocal(STORAGE_KEY_MOVIES);

let movieId = '';
// let movieId = getFromLocal(STORAGE_KEY_MOVIEID);
let movie = '';
// const movie = getMovieFromLocal(STORAGE_KEY_MOVIES, movieId);

console.log(arrayFromLocal);
console.log(movie);
console.log(movieId);

let arrayAddToWatch = [];
// let arrayAddToQueue = [];

if (localStorage.getItem('arrayAddToWatch') !== null) {
  arrayAddToWatch = localStorage.getItem('arrayAddToWatch');
  arrayAddToWatch = JSON.parse(arrayAddToWatch);
}

function onAddToWatchClick(e) {
  console.dir(e.currentTarget);
  movieId = getFromLocal(STORAGE_KEY_MOVIEID);
  console.log(movieId);
  movie = getMovieFromLocal(STORAGE_KEY_MOVIES, movieId);
  console.log(movie);
  changeActiveOfBtns();
}

// Проверка наличия фильмов
function changeActiveOfBtns(movieId) {
  if (arrayAddToWatch.includes(movieId)) {
    console.log('уже есть в просмотренных');
    refs.addToWatch.textContent = 'Remove from watched';
  } else {
    console.log('нет такого в просмотренных');
    refs.addToWatch.textContent = 'Add to watched';
    addToWatched();
  }
}

// добавлениe фильмов в просмотренные
function addToWatched() {
  console.log(movieId);

  arrayAddToWatch.push(movieId);

  localStorage.setItem('arrayAddToWatch', JSON.stringify(arrayAddToWatch));
  console.log(arrayAddToWatch);
}



// function addToWatched() {
//   refs.watchedModal.classList.add('is-active__Btn');
//   let watchedArr = [];
//   let movieId = getFromLocal(STORAGE_KEY_MOVIEID);
//   const movie = getMovieFromLocal(STORAGE_KEY_MOVIES, movieId);

//     if (getFromLocal(STORAGE_KEY_WATCHED)) {
//       watchedArr = getFromLocal(STORAGE_KEY_WATCHED);
//     }

//   watchedArr.push(movie);
//   saveOnLocalStorage(STORAGE_KEY_WATCHED, JSON.stringify(watchedArr));

//   refs.watchedModal.textContent = 'remove from watched';

//   console.log(watchedArr);
// }
