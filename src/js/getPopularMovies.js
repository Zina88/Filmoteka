import MovieApiService from './movieApiService';
import saveOnLocalStorage from './saveMoviesOnLocal';
import { STORAGE_KEY_MOVIES } from './constants';
import { appendMoviesMarkup } from './markupCard';

const movieApiService = new MovieApiService();
getPopularMovies();

// при першому відвідуванні сайту робимо запит за популярними і зберігаємо їх в локал
export default async function getPopularMovies() {
  try {
    const result = await movieApiService.popularMovies();

    const {
      page: currentPage,
      results: moviesArray,
      total_page: totalPage,
      total_results: totalResults,
    } = result;
    
    appendMoviesMarkup(moviesArray);
    saveOnLocalStorage(STORAGE_KEY_MOVIES, moviesArray);
    
  } catch (error) {
    console.log(error);
  }
}
