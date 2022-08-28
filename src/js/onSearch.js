import MovieApiService from './movieApiService';
import saveOnLocalStorage from './saveMoviesOnLocal';
import { STORAGE_KEY_MOVIES } from './constants';
import { appendMoviesMarkup } from './markupCard';


const refs = {
  searchForm: document.querySelector('#search-form'),
};

refs.searchForm.addEventListener("submit", onSearch);
const movieApiService = new MovieApiService();

async function onSearch(e) {
  e.preventDefault();
  const inputValue = e.currentTarget.elements.searchQuery.value.trim();

  if (inputValue === "") {
    // .......Notification
    console.log("input search query!")
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

    appendMoviesMarkup(moviesArray);
    saveOnLocalStorage(STORAGE_KEY_MOVIES, moviesArray);
  } catch (error) {
    console.log(error)
  }
}

