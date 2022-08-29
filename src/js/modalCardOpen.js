//Oksana Bulakh

import { STORAGE_KEY_MOVIES } from './constants';
import getMovieFromLocal from './getMovieFromLocal';
import getGenresFromLocal from './getGenresFromLocal';

const ul = document.querySelector('.gallery');
const refs = {
    titleEl: document.querySelector('.movie__title'),
    voteEl: document.querySelector('.movie__info-wrap-item-vote'),
    popularityEl: document.querySelector('.movie__info-wrap-item-popularity'),
    origTitleEl: document.querySelector('.movie__info-wrap-item-name'),
    genreEl: document.querySelector('.movie__info-item'),
    aboutEl: document.querySelector('.movie-description'),
}


export function openMovieCard(evt) {
    
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
        title: titleMovie,
        vote_average: vote,
        vote_count: votes,
        popularity: popularity,
        original_title: originalTitle,
        genre_ids: genreIds,
        overview: about,
    } = movie;


    console.dir(refs.titleEl);
    refs.titleEl.textContent = titleMovie;
    refs.voteEl.textContent = `<span class="vote">${vote}</span> / ${votes}`;
    refs.popularityEl.textContent = popularity;
    refs.origTitleEl.textContent = originalTitle;
    refs.genreEl.textContent = getGenresFromLocal(genreIds);
    refs.aboutEl.textContent = about;
}


// $('parent_static').on('event', 'children_dinamic', handler);
 