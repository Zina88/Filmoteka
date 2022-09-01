import getGenresFromLocal from './getGenresFromLocal';
import { STORAGE_KEY_GENRES, STORAGE_KEY_WATCHED, STORAGE_KEY_QUEUE } from './constants';
import saveOnLocalStorage from './saveInLocalStorage';

const refs = {
  gallery: document.querySelector('.gallery'),
};


export async function appendMoviesMarkup(Array) {
  refs.gallery.insertAdjacentHTML('beforeend', await createMoviesMarkup(Array));
}
export async function createMoviesMarkup(Array) {
  let moviesMarkup = Array.map(
    async ({
      id: movieId,
      title,
      name,
      release_date: releaseDate,
      genre_ids: genresIdsArray,
      poster_path,
    }) => {
      const poster = `https://image.tmdb.org/t/p/w500${poster_path}`;
      const placeholderImg =
        'https://image.tmdb.org/t/p/w500/AcKVlWaNVVVFQwro3nLXqPljcYA.jpg';

      const genresOfMovie = await getGenresFromLocal(genresIdsArray);
      let genres;
      if (genresOfMovie.length > 3) {
        genres = `${genresOfMovie.slice(0, 3).join(', ')}, ...other`;
        return;
      }
      genres = genresOfMovie.join(', ');
      const movieMarkup = `<li class="card-item" id="${movieId}">
        <a class="card-link" id="${movieId}" href="${
        poster_path !== null ? poster : placeholderImg
      }">
        <img class="card__image" id="${movieId}" src="${
        poster_path !== null ? poster : placeholderImg
      }" alt="${title}">
        <div class="card-discr">
        <p class="card-title" id="${movieId}">${title ? title : name}</p>
        <ul class="box">
            <li class="card-genres" id="${movieId}">${
        genres ? genres : 'Unknown'
      }</li>
            <li class="card-data" id="${movieId}">${
        // releaseDate ? releaseDate.slice(0, 4) : firstDate.slice(0, 4)
        releaseDate ? releaseDate.slice(0, 4) : 'Unknown'
      }</li>
        </ul>
        </div>
        </a>    
    </li>`;
      return movieMarkup;
    }
  );
  moviesMarkup = await Promise.all(moviesMarkup);
  moviesMarkup = moviesMarkup.join('');
  return moviesMarkup;
}

