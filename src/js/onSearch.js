//Oksana Bulakh

import MovieApiService from './movieApiService';
import saveOnLocalStorage from './saveInLocalStorage';
import { STORAGE_KEY_MOVIES } from './constants';
import { appendMoviesMarkup } from './markupCard';
import errorSearch from "./error-search.js "


const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
};

refs.searchForm.addEventListener("submit", onSearch);
const movieApiService = new MovieApiService();

async function onSearch(e) {
  e.preventDefault();
  refs.gallery.innerHTML = "";
  const inputValue = e.currentTarget.elements.searchQuery.value.trim();

  if (inputValue === "") {
    errorSearch("Please, enter your search query.");
    return
  }

  movieApiService.query = inputValue;
  try {
    const result = await movieApiService.moviesBySearch();
    console.log(result);

    const {
      page: currentPage,
      results: moviesArray,
      total_page: totalPage,
      total_results: totalResults,
    } = result;

    if (moviesArray.length === 0) {
      errorSearch('Search result is not successful. Enter the correct movie name.')
      return
    }

    appendMoviesMarkup(moviesArray);
    saveOnLocalStorage(STORAGE_KEY_MOVIES, moviesArray);
  } catch (error) {
    console.log(error)
  }
}

