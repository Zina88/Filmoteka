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

refs.watchedModal.addEventListener('click', addToWatched);

function addToWatched() {
  refs.watchedModal.classList.add('is-active__Btn');
  let watchedArr = [];
  let movieId = getFromLocal(STORAGE_KEY_MOVIEID);
  const movie = getMovieFromLocal(STORAGE_KEY_MOVIES, movieId);

  //   if (getFromLocal(STORAGE_KEY_WATCHED)) {
  //     watchedArr = getFromLocal(STORAGE_KEY_WATCHED);
  //   }

  watchedArr.push(movie);
  saveOnLocalStorage(STORAGE_KEY_WATCHED, JSON.stringify(watchedArr));

  refs.watchedModal.textContent = 'remove from watched';

  console.log(watchedArr);
}
