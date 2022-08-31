//Oksana Bulakh

import MovieApiService from './movieApiService';
import saveOnLocalStorage from './saveInLocalStorage';
import { STORAGE_KEY_GENRES, STORAGE_KEY_WATCHED, STORAGE_KEY_QUEUE } from './constants';

const movieApiService = new MovieApiService();

export default async function saveAllGenres() {
  try {
    const genresArray = await movieApiService.allGenres();
    saveOnLocalStorage(STORAGE_KEY_GENRES, genresArray);
    return genresArray;
  } catch (error) {
    console.log(error);
  }
}
