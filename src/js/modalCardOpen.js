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

// refs.watchBtn.addEventListener('click', )


const movieToWatched = getFromLocal(STORAGE_KEY_WATCHED);
const movieToQueue = getFromLocal(STORAGE_KEY_QUEUE);
console.log(movieToWatched);

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

    checkWatchBtnStyle(movie);
    checkqueueBtnStyle(movie);

console.log(movie);

}



function checkWatchBtnStyle(movie) {
    if (movieToWatched.length === 0) {
        // console.log(STORAGE_KEY_WATCHED);
        // console.log(watched);
        // console.log(refs.addToWatch);
        refs.watchBtn.classList.remove('is-active__Btn');
        refs.watchBtn.textContent = 'Add to watched';
        refs.watchBtn.addEventListener('click', saveToWatched(STORAGE_KEY_WATCHED, movie))
        return
    }
    if (movieToWatched.lenght !== 0 || movieToWatched.includes(movie)) {
        refs.addToWatch.classList.add('is-active__Btn');
        refs.addToWatch.textContent = 'Remove from watched';
        refs.watchBtn.addEventListener('click', removeFromWatched(STORAGE_KEY_WATCHED, movie))
        return
    }
}

function checkqueueBtnStyle(movie) {
    if (movieToQueue.length === 0) {
        refs.queueBtn.classList.remove('is-active__Btn');
        refs.queueBtn.textContent = 'Add to queue';
        return
    }
    if (movieToQueue.lenght !== 0 || movieToQueue.includes(movie)) {

        if(movieToQueue)
        refs.queueBtn.classList.add('is-active__Btn');
        refs.queueBtn.textContent = 'Remove from watched';
        
        return
    }
}


function saveToWatched(movie) {
    movieToWatched.push(movie);
    console.log(movieToWatched);
    saveOnLocalStorage(STORAGE_KEY_WATCHED, movieToWatched);
}

function removeFromWatched(movie) {
    movieToWatched.splice(movieToWatched[movie], 1)
    saveOnLocalStorage(STORAGE_KEY_WATCHED, movieToWatched);
}


