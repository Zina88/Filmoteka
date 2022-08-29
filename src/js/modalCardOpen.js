//Oksana Bulakh

import { STORAGE_KEY_MOVIES } from './constants';
import getMovieFromLocal from './getFromLocal';
import getGenresFromLocal from './getGenresFromLocal';

const ul = document.querySelector('.gallery');
const refs = {
    imgEl: document.querySelector('img'),
    titleEl: document.querySelector('.movie__title'),
    voteEl: document.querySelector('.vote-value'),
    votesEl: document.querySelector('.votes-value'),
    popularityEl: document.querySelector('.movie__info-wrap-item-popularity'),
    origTitleEl: document.querySelector('.movie__info-wrap-item-name'),
    genreEl: document.querySelector('.movie__info-item'),
    aboutEl: document.querySelector('.movie-description'),
}

export function openMovieCard(evt) {
    console.dir(refs.imgEl);
    console.dir(refs.titleEl);
    const clickOnCard = evt.target;

    // if (evt.target.nodeName !== "IMG" && evt.target.nodeName !== "P" && evt.target.nodeName !== "LI") {
    //     return
    // }
    console.log(evt.target.nodeName)
    // console.log(clickOnCard)
    const movieId = Number(clickOnCard.id);
    // console.log(movieId)
    const movie = getMovieFromLocal(STORAGE_KEY_MOVIES, movieId);
    console.log(movie);
    const {
        id: movieIdFromLocal,
        poster_path: poster,
        title: titleMovie,
        vote_average: vote,
        vote_count: votes,
        popularity: popularity,
        original_title: originalTitle,
        genre_ids: genreIds,
        overview: about,
    } = movie;


    refs.imgEl.crs = `https://image.tmdb.org/t/p/w500${poster}`;
    console.log(refs.imgEl.crs);
    refs.titleEl.textContent = titleMovie;
    refs.voteEl.textContent = vote;
    refs.votesEl.textContent = votes;
    refs.popularityEl.textContent = popularity;
    refs.origTitleEl.textContent = originalTitle;
    refs.genreEl.textContent = getGenresFromLocal(genreIds);
    refs.aboutEl.textContent = about;
}

