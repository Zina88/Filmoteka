import { STORAGE_KEY_WATCHED, STORAGE_KEY_QUEUE } from './constants';
import getFromLocal from './getFromLocal';
import createMoviesMarkupLibrary from './markupLibraryCard';

const refs = {
  libraryMessage: document.querySelector('.library'),
  libraryGallery: document.querySelector('.gallery-library'),
  watchedBtn: document.querySelector('.watched'),
  queueBtn: document.querySelector('.queue'),
};

refs.watchedBtn.addEventListener('click', displeyWatched);
refs.queueBtn.addEventListener('click', displeyQueue);

let movieToWatched = getFromLocal(STORAGE_KEY_WATCHED);
let movieToQueue = getFromLocal(STORAGE_KEY_QUEUE);

console.log(movieToWatched);
console.log(movieToQueue);

displeyWatched();
console.log(refs.libraryGallery);

function displeyWatched() {
  refs.watchedBtn.classList.add('is-active');
  refs.queueBtn.classList.remove('is-active');
  refs.watchedBtn.disabled = true;
  refs.queueBtn.disabled = false;

  // refs.libraryGallery.innerHTML = '';

  if (movieToWatched.length !== 0) {
    console.log(createMoviesMarkupLibrary(movieToWatched));
    refs.libraryGallery.innerHTML = createMoviesMarkupLibrary(movieToWatched);
  } else {
    refs.libraryMessage.textContent =
      'Sorry, you have not added any movie to your watched list yet.';
  }
}

function displeyQueue() {
  refs.queueBtn.classList.add('is-active');
  refs.watchedBtn.classList.remove('is-active');
  refs.watchedBtn.disabled = false;
  refs.queueBtn.disabled = true;

  // refs.libraryGallery.innerHTML = '';

  if (movieToQueue.length !== 0) {
    refs.libraryGallery.innerHTML;
    createMoviesMarkupLibrary(movieToQueue);
  } else {
    refs.libraryMessage.textContent =
      'Sorry, you have not added any movie to your queue yet.';
  }
}
