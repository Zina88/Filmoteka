//Oksana Bulakh

import MovieApiService from './movieApiService';
import saveOnLocalStorage from './saveMoviesOnLocal';
import { STORAGE_KEY_GENRES } from './constants';

const movieApiService = new MovieApiService();

export default async function saveAllGenres() {
  try {
    const genresArray = await movieApiService.allGenres();

    saveOnLocalStorage(STORAGE_KEY_GENRES, genresArray);
  } catch (error) {
    console.log(error);
  }
}
