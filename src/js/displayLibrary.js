import { STORAGE_KEY_WATCHED, STORAGE_KEY_QUEUE } from './constants';
import getFromLocal from './getFromLocal';
import createMoviesMarkupLibrary from './markupLibraryCard';

const refs = {
  libraryGalery: document.querySelector('.gallery-library'),
  watchedBtn: document.querySelector('.watched'),
  queueBtn: document.querySelector('.queue'),
};

refs.watchedBtn.addEventListener('click', displayWatched);
refs.queueBtn.addEventListener('click', displayQueue);

let movieToWatched = getFromLocal(STORAGE_KEY_WATCHED);
let movieToQueue = getFromLocal(STORAGE_KEY_QUEUE);

displayWatched();

function displayWatched() {
  watchedBtnIsActive();
  movieToWatched.length !== 0
    ? (refs.libraryGalery.innerHTML = createMoviesMarkupLibrary(movieToWatched))
    : (refs.libraryGalery.innerHTML =
        'Sorry, you have not added any movie to your watched list yet.');
}

function displayQueue() {
  queueBtnIsActive();
  movieToQueue.length !== 0
    ? (refs.libraryGalery.innerHTML = createMoviesMarkupLibrary(movieToQueue))
    : (refs.libraryGalery.innerHTML =
        'Sorry, you have not added any movie to your queue yet.');
}

function watchedBtnIsActive() {
  refs.watchedBtn.classList.add('is-active');
  refs.queueBtn.classList.remove('is-active');
  refs.watchedBtn.disabled = true;
  refs.queueBtn.disabled = false;
}

function queueBtnIsActive() {
  refs.queueBtn.classList.add('is-active');
  refs.watchedBtn.classList.remove('is-active');
  refs.watchedBtn.disabled = false;
  refs.queueBtn.disabled = true;
}
