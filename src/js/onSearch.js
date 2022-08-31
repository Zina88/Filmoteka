//Oksana Bulakh

import debounce from 'lodash/debounce';
import MovieApiService from './movieApiService';
import saveOnLocalStorage from './saveInLocalStorage';
import { totalMovieDisplay } from './pagination';
import { STORAGE_KEY_MOVIES, DEBOUNCE_DELAY } from './constants';
import { appendMoviesMarkup } from './markupCard';
import errorSearch from "./error-search.js "
import { updatePaginationBar } from './pagination';


const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  input: document.querySelector('.search_input'),
};

refs.searchForm.addEventListener("submit", onSearch);
const movieApiService = new MovieApiService();
refs.input.addEventListener("input", debounce(onInputClearn, DEBOUNCE_DELAY));


function onInputClearn() {
  if (refs.input.value.trim() === "") {
    totalMovieDisplay(1);
    errorSearch("Please, enter your search query.");
    return
  }
}

async function onSearch(e) {
  e.preventDefault();
  refs.gallery.innerHTML = "";
  const inputValue = e.currentTarget.elements.searchQuery.value.trim();

  if (inputValue === "") {
    errorSearch("Please, enter your search query.");
    totalMovieDisplay(1);
    return
  }

  movieApiService.query = inputValue;
  try {
    const response = await movieApiService.moviesBySearch();
    const moviesArray = response.results;

    if (moviesArray.length === 0) {
      errorSearch('Search result is not successful. Enter the correct movie name.');
      totalMovieDisplay(1);
      return
    }
    updatePaginationBar(response.page, response.total_pages);
    appendMoviesMarkup(moviesArray);
    saveOnLocalStorage(STORAGE_KEY_MOVIES, moviesArray);
  } catch (error) {
    console.log(error)
  }
  movieApiService.query = "";
}

