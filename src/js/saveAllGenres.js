//Oksana Bulakh

import MovieApiService from './movieApiService';
import saveOnLocalStorage from './saveInLocalStorage';
import getFromLocal from './getFromLocal';
import { STORAGE_KEY_GENRES } from './constants';

const movieApiService = new MovieApiService();
saveAllGenres();

export default async function saveAllGenres() {
  try {
    let genresArray = [];
    if (getFromLocal(STORAGE_KEY_GENRES) === null) {
       saveOnLocalStorage(STORAGE_KEY_GENRES, genresArray);
    }
    genresArray = await movieApiService.allGenres();
    saveOnLocalStorage(STORAGE_KEY_GENRES, genresArray);
    return genresArray;
  } catch (error) {
    console.log(error);
  }
}

