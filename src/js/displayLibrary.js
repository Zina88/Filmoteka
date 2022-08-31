import { STORAGE_KEY_GENRES } from './constants';
import getFromLocal from './getFromLocal';
import { STORAGE_KEY_MOVIEID } from './constants';
import { STORAGE_KEY_MOVIES } from './constants';
import { saveOnLocalStorage } from './saveInLocalStorage.js';
import getMovieFromLocal from './getMovieFromLocal';

const refs = {
  addToWatch: document.querySelector('#watchedModalBtn'),
  addToQueue: document.querySelector('#queueModalBtn'),
};

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
