//Oksana Bulakh

import getFromLocal from './getFromLocal';
import { STORAGE_KEY_GENRES } from './constants';

export default function getGenresFromLocal(genreIdsArray) {
  const genresArrayFromLocal = getFromLocal(STORAGE_KEY_GENRES);
 
  let genresOfMovie = [];

  genreIdsArray.forEach(id => {
    const genreOfMovie = genresArrayFromLocal.find(genre => genre.id === id);
    genresOfMovie.push(genreOfMovie.name);
  });
  // console.log(genresOfMovie);
  return genresOfMovie.join(', ');
}
