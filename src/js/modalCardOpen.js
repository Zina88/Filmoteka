//Oksana Bulakh

import {
  STORAGE_KEY_MOVIES,
  STORAGE_KEY_MOVIE,
  STORAGE_KEY_WATCHED,
  STORAGE_KEY_QUEUE,
} from './constants';
import getMovieFromLocal from './getMovieFromLocal';
import getFromLocal from './getFromLocal';
import saveOnLocalStorage from './saveInLocalStorage';
import getGenresFromLocal from './getGenresFromLocal';

const refs = {
  titleEl: document.querySelector('.movie__title'),
  voteEl: document.querySelector('.vote-value'),
  votesEl: document.querySelector('.votes-value'),
  popularityEl: document.querySelector('.movie__info-wrap-item-popularity'),
  origTitleEl: document.querySelector('.movie__info-wrap-item-name'),
  genreEl: document.querySelector('.movie__info-item'),
  aboutEl: document.querySelector('.movie-description'),

  watchBtn: document.querySelector('#watchedModalBtn'),
  queueBtn: document.querySelector('#queueModalBtn'),
};

export let watchButtonListener = null;
export let queueButtonSaveListener = null;
export let queueButtonDeleteListener = null;

let movieToWatched = [];
let movieToQueue = [];

if (
  getFromLocal(STORAGE_KEY_WATCHED) === null &&
  getFromLocal(STORAGE_KEY_QUEUE) === null
) {
  saveOnLocalStorage(STORAGE_KEY_WATCHED, movieToWatched);
  saveOnLocalStorage(STORAGE_KEY_QUEUE, movieToQueue);
}

export async function openMovieCard(evt) {
  const clickOnCard = evt.target;
  const movieId = Number(clickOnCard.id);
  const movie = getMovieFromLocal(STORAGE_KEY_MOVIES, movieId);

  const {
    id: movieOfId,
    poster_path: poster,
    title: titleMovie,
    vote_average: vote,
    vote_count: votes,
    popularity: popularity,
    original_title: originalTitle,
    genre_ids: genreIds,
    overview: about,
  } = movie;

  saveOnLocalStorage(STORAGE_KEY_MOVIE, movie);
  const rawGenres = await getGenresFromLocal(genreIds);
  const genres = `${rawGenres.join(', ')}`;
  const moviePoster = `https://image.tmdb.org/t/p/w500${poster}`;
  img.src = moviePoster;
  refs.titleEl.textContent = titleMovie;
  refs.voteEl.textContent = vote;
  refs.votesEl.textContent = votes;
  refs.popularityEl.textContent = popularity;
  refs.origTitleEl.textContent = originalTitle;
  refs.genreEl.textContent = genres;
  refs.aboutEl.textContent = about;

  checkWatchBtnStyle(movie, movieOfId);
  checkqueueBtnStyle(movie, movieOfId);
}

export function toggleWatched(movie) {
  const currentWatched = getFromLocal(STORAGE_KEY_WATCHED);
  const isMovieInWatchedList = currentWatched.some(
    watchedMovie => watchedMovie.id === movie.id
  );
  if (isMovieInWatchedList) {
    removeFromWatched(movie);
  } else {
    saveToWatched(movie);
  }
}

function checkWatchBtnStyle(movie, movieOfId) {
  try {
    movieToWatched = getFromLocal(STORAGE_KEY_WATCHED);
    const finedFilmFromWatch = movieToWatched.find(
      item => item.id === movieOfId
    );
    const indexfinedFilm = movieToWatched.indexOf(finedFilmFromWatch);

    // console.log("index checkWatchBtnStyle", movie);

    if (finedFilmFromWatch) {
      refs.watchBtn.classList.add('is-active__Btn');
      refs.watchBtn.textContent = 'Remove from watched';
    } else {
      refs.watchBtn.classList.remove('is-active__Btn');
      refs.watchBtn.textContent = 'Add to watched';
    }

    if (watchButtonListener !== null) {
      refs.watchBtn.removeEventListener('click', watchButtonListener);
      watchButtonListener = null;
    }
    watchButtonListener = () => toggleWatched(movie);
    refs.watchBtn.addEventListener('click', watchButtonListener);
  } catch (error) {
    console.log(error);
  }
}

function checkqueueBtnStyle(movie, movieOfId) {
  try {
    movieToQueue = getFromLocal(STORAGE_KEY_QUEUE);
    const finedFilmFromQueue = movieToQueue.find(item => item.id === movieOfId);
    const indexfinedFilm = movieToQueue.indexOf(finedFilmFromQueue);

    if (finedFilmFromQueue) {
      refs.queueBtn.classList.add('is-active__Btn');
      refs.queueBtn.textContent = 'Remove from queue';
      queueButtonDeleteListener = () => removeFromQueue(movie, indexfinedFilm);

      refs.queueBtn.addEventListener('click', queueButtonDeleteListener);
      return;
    } else {
      refs.queueBtn.classList.remove('is-active__Btn');
      refs.queueBtn.textContent = 'Add to queue';
      queueButtonSaveListener = () => saveToQueue(movie, indexfinedFilm);
      refs.queueBtn.addEventListener('click', queueButtonSaveListener);
      return;
    }
  } catch (error) {
    console.log(error);
  }
}

export function saveToWatched(movie) {
  const watched = getFromLocal(STORAGE_KEY_WATCHED);

  watched.push(movie);
  saveOnLocalStorage(STORAGE_KEY_WATCHED, watched);
  refs.watchBtn.classList.add('is-active__Btn');
  refs.watchBtn.textContent = 'Remove from watched';
}

export function removeFromWatched(movie) {
  console.log('ebala');

  movieToWatched = movieToWatched.filter(
    watchedMovie => watchedMovie.id !== movie.id
  );
  saveOnLocalStorage(STORAGE_KEY_WATCHED, movieToWatched);
  refs.watchBtn.classList.remove('is-active__Btn');
  refs.watchBtn.textContent = 'Add to watched';
}

export function saveToQueue(movie, index) {
  movieToQueue.push(movie);

  saveOnLocalStorage(STORAGE_KEY_QUEUE, movieToQueue);
  refs.queueBtn.removeEventListener('click', queueButtonSaveListener);
  refs.queueBtn.classList.add('is-active__Btn');
  refs.queueBtn.textContent = 'Remove from queue';
  queueButtonDeleteListener = () => removeFromQueue(movie, index);
  refs.queueBtn.addEventListener('click', queueButtonDeleteListener);
  return;
}

export function removeFromQueue(movie, index) {
  movieToQueue.splice(index, 1);
  saveOnLocalStorage(STORAGE_KEY_QUEUE, movieToQueue);
  refs.queueBtn.removeEventListener('click', queueButtonDeleteListener);
  refs.queueBtn.classList.remove('is-active__Btn');
  refs.queueBtn.textContent = 'Add to queue';
  queueButtonSaveListener = () => saveToQueue(movie, index);
  refs.queueBtn.addEventListener('click', queueButtonSaveListener);
window.location.reload();
  return;
}
