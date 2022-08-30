//Oksana Bulakh

import getFromLocal from './getFromLocal';
import { STORAGE_KEY_GENRES } from './constants';



export default function getGenresFromLocal(genreIdsArray) {
  try {
    const genresArrayFromLocal = getFromLocal(STORAGE_KEY_GENRES);
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
