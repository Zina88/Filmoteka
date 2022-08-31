// import {
//   STORAGE_KEY_MOVIES,
//   STORAGE_KEY_WATCHED,
//   STORAGE_KEY_QUEUE,
//   STORAGE_KEY_MOVIE,
// } from './constants';

// import getFromLocal from './getFromLocal';
// import getMovieFromLocal from './getMovieFromLocal';
// import saveOnLocalStorage from './saveInLocalStorage';

// const refs = {
//   addToWatch: document.querySelector('#watchedModalBtn'),
//   addToQueue: document.querySelector('#queueModalBtn'),
// };

// refs.addToWatch.addEventListener('click', onAddToWatchClick);
// // refs.addToQueue.addEventListener('click', onAddToQueueClick);

// let arrayFromLocal = getFromLocal(STORAGE_KEY_MOVIES);
// let movieId = '';
// let movie = '';
// // 
// // console.log(arrayFromLocal);
// // console.log(movie);
// // console.log(movieId);

// let arrayAddToWatch = [];
// // let arrayAddToQueue = [];

// if (localStorage.getItem('arrayAddToWatch') !== null) {
//   arrayAddToWatch = localStorage.getItem('arrayAddToWatch');
//   arrayAddToWatch = JSON.parse(arrayAddToWatch);
// }

// console.log(arrayAddToWatch);

// function onAddToWatchClick(e) {
//   refs.addToWatch.classList.add('is-active__Btn');
//   console.dir(e.currentTarget);
//   movieId = getFromLocal(STORAGE_KEY_MOVIE);
//   movie = getMovieFromLocal(STORAGE_KEY_MOVIES, movieId);
//   checkStorage();

//   if (refs.addToWatch.textContent === 'Remove from watched') {
//     removeFromWathed();
//   }
// }

// function checkStorage(movieId) {
//   if (arrayAddToWatch.includes(movieId)) {
//     console.log('уже есть в просмотренных');
//     refs.addToWatch.textContent = 'Remove from watched';
//   } else {
//     console.log('нет такого в просмотренных');
//     refs.addToWatch.textContent = 'Add to watched';
//     addToWatched();
//   }
// }

// // добавлениe фильмов в просмотренные
// function addToWatched() {
//   console.log(movieId);
//   arrayAddToWatch.push(movieId);
//   localStorage.setItem('arrayAddToWatch', JSON.stringify(arrayAddToWatch));
//   console.log(arrayAddToWatch);
//   refs.addToWatch.textContent = 'Remove from watched';
// }

// function removeFromWathed() {
//   const removeIndex = arrayAddToWatch.indexOf(movieId);
//   arrayAddToWatch.slice(removeIndex, 1);
//   localStorage.setItem('arrayAddToWatch', JSON.stringify(arrayAddToWatch));
// }
