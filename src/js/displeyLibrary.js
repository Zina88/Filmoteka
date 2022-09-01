import { STORAGE_KEY_WATCHED, STORAGE_KEY_QUEUE } from './constants';
import getFromLocal from './getFromLocal';
import createMoviesMarkupLibrary from './markupLibraryCard';
import { appendMoviesMarkup } from './markupCard';

const refs = {
  libraryGallery: document.querySelector('.gallery-library'),
  libraryMessage: document.querySelector('.gallery-text'),
  watchedBtn: document.querySelector('.watched'),
  queueBtn: document.querySelector('.queue'),
};

refs.watchedBtn.addEventListener('click', displeyWatched);
refs.queueBtn.addEventListener('click', displeyQueue);


movieToWatched = getFromLocal(STORAGE_KEY_WATCHED);
movieToQueue = getFromLocal(STORAGE_KEY_QUEUE);
appendMoviesMarkup(STORAGE_KEY_WATCHED);

function displeyWatched() {
  refs.watchedBtn.classList.add('is-active');
  refs.queueBtn.classList.remove('is-active');

  refs.libraryGallery.innerHTML = "";
  appendMoviesMarkup(movieToWatched);

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
  refs.libraryGallery.innerHTML = "";
  appendMoviesMarkup(movieToQueue);

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
