import { STORAGE_KEY_GENRES } from './constants';

export default function getGenresFromLocal(genreIdsArray) {
  const genresArrayFromLocal = JSON.parse(
    localStorage.getItem(STORAGE_KEY_GENRES)
  );
  let genresOfMovie = [];

  genreIdsArray.forEach(id => {

    const genreOfMovie = genresArrayFromLocal.find(genre => genre.id === id);
    genresOfMovie.push(genreOfMovie.name);
  });
  // console.log(genresOfMovie);
  return genresOfMovie.join(', ');
}
