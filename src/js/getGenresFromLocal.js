//Oksana Bulakh

import getFromLocal from './getFromLocal';
import { STORAGE_KEY_GENRES } from './constants';
import saveAllGenres from './saveAllGenres';

export default function getGenresFromLocal(genreIdsArray) {
  try {
      let genresArrayFromLocal = getFromLocal(STORAGE_KEY_GENRES);

      // const isGenresInLocalStorage = Boolean(genresArrayFromLocal);

      // if (!isGenresInLocalStorage) {
      //   genresArrayFromLocal = await saveAllGenres();
      // }

      let genresOfMovie = [];
      genreIdsArray.forEach(id => {
        const genreOfMovie = genresArrayFromLocal.find(genre => genre.id === id);
        genresOfMovie.push(genreOfMovie.name);
      });
      return genresOfMovie;
  } catch (error) {
      console.log(error);
  }
}
