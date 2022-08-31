import { STORAGE_KEY_WATCHED, STORAGE_KEY_QUEUE } from './constants';
import getFromLocal from './getFromLocal';
import createMoviesMarkupLibrary from './markupLibraryCard';

const refs = {
  libraryGallery: document.querySelector('.gallery-library'),
  libraryMessage: document.querySelector('.gallery-text'),
  watchedBtn: document.querySelector('.watched'),
  queueBtn: document.querySelector('.queue'),
};

refs.watchedBtn.addEventListener('click', displeyWatched);
refs.queueBtn.addEventListener('click', displeyQueue);

function displeyWatched() {
  refs.watchedBtn.classList.add('is-active');
  refs.queueBtn.classList.remove('is-active');
  let getWathed = getFromLocal(STORAGE_KEY_WATCHED);
  if (STORAGE_KEY_WATCHED === null || getWathed.lenght === 0) {
    refs.libraryMessage.textContent =
      'Sorry, you have not added any movie to your watched list yet.';
  } else {
    refs.libraryMessage.classList.add('is-hidden');
    refs.libraryGallery.insertAdjacentHTML(
      'beforeend',
      createMoviesMarkupLibrary(getWathed)
    );
  }
}

function displeyQueue() {
  refs.queueBtn.classList.add('is-active');
  refs.watchedBtn.classList.remove('is-active');
  let getQueue = getFromLocal(STORAGE_KEY_QUEUE);
  if (STORAGE_KEY_QUEUE === null || getQueue.lenght === 0) {
    refs.libraryMessage.textContent =
      'Sorry, you have not added any movie to your queue yet.';
  } else {
    refs.libraryMessage.classList.add('is-hidden');
    refs.libraryGallery.insertAdjacentHTML(
      'beforeend',
      createMoviesMarkupLibrary(getQueue)
    );
  }
}
