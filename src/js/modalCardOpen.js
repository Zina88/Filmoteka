//Oksana Bulakh

import { STORAGE_KEY_MOVIES, STORAGE_KEY_MOVIE } from './constants';
import getMovieFromLocal from './getMovieFromLocal';
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
}