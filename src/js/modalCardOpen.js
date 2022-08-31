//Oksana Bulakh

import { STORAGE_KEY_MOVIES, STORAGE_KEY_MOVIE, STORAGE_KEY_WATCHED, STORAGE_KEY_QUEUE } from './constants';
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

    watchBtn: document.querySelector("#watchedModalBtn"),
    queueBtn: document.querySelector("#queueModalBtn"),
}

let movieToWatched = [];
let movieToQueue = [];


if (movieToWatched === null) {
    saveOnLocalStorage(STORAGE_KEY_WATCHED, movieToWatched);
    
} else if (movieToQueue === null) {
    console.log("Пустой массив записан");
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
    const genres = `${rawGenres.join(", ")}`;
    const moviePoster = `https://image.tmdb.org/t/p/w500${poster}`;
    document.img.src = moviePoster;
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



function checkWatchBtnStyle(movie, movieOfId) {
        movieToWatched = getFromLocal(STORAGE_KEY_WATCHED);
    const finedFilmFromWatch = movieToWatched.find(item => item.id === movieOfId);
    const indexfinedFilm = movieToWatched .indexOf(finedFilmFromWatch);
    
        if (finedFilmFromWatch) {
            refs.watchBtn.classList.add('is-active__Btn');
            refs.watchBtn.textContent = 'Remove from watched';
            refs.watchBtn.addEventListener('click', () => removeFromWatched(movie, indexfinedFilm))
            return
        } else {
            refs.watchBtn.classList.remove('is-active__Btn');
            refs.watchBtn.textContent = 'Add to watched';
            refs.watchBtn.addEventListener('click', () => saveToWatched(movie, indexfinedFilm))
            return
        }
    }


    function checkqueueBtnStyle(movie, movieOfId) {
        movieToQueue = getFromLocal(STORAGE_KEY_QUEUE);
        const finedFilmFromQueue = movieToQueue.find(item => item.id === movieOfId);
        const indexfinedFilm = movieToQueue.indexOf(finedFilmFromQueue);
    
        if (finedFilmFromQueue) {
            refs.queueBtn.classList.add('is-active__Btn');
            refs.queueBtn.textContent = 'Remove from queue';
            refs.queueBtn.addEventListener('click', () => removeFromQueue(movie, indexfinedFilm))
            return
        } else {
            refs.queueBtn.classList.remove('is-active__Btn');
            refs.queueBtn.textContent = 'Add to queue';
            refs.queueBtn.addEventListener('click', () => saveToQueue(movie, indexfinedFilm))
            return
        }
    }

function saveToWatched(movie, index) {
    movieToWatched.push(movie);
    saveOnLocalStorage(STORAGE_KEY_WATCHED, movieToWatched);
    refs.watchBtn.removeEventListener(movie, index);
    return
}

function removeFromWatched(movie, index) {
    movieToWatched.splice(index, 1)
    saveOnLocalStorage(STORAGE_KEY_WATCHED, movieToWatched);
    refs.watchBtn.removeEventListener(movie, index);
    console.log(index)
    return
}

function saveToQueue(movie) {
    movieToQueue.push(movie);
    saveOnLocalStorage(STORAGE_KEY_QUEUE, movieToQueue);
    refs.watchBtn.removeEventListener(movie, index);
    
    return
}

function removeFromQueue(movie, index) {
    movieToQueue.splice(index, 1)
    saveOnLocalStorage(STORAGE_KEY_QUEUE, movieToQueue);
    refs.watchBtn.removeEventListener(movie, index);
    console.log(index)
    return
}




