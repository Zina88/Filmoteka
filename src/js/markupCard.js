import checkAmountGenres from './checkAmountGenres';

const refs = {
  gallery: document.querySelector('.gallery'),
};

export async function appendMoviesMarkup(array) {
  refs.gallery.insertAdjacentHTML('beforeend', await createMoviesMarkup(array));
}
export async function createMoviesMarkup(array) {
  let moviesMarkup = array.map(
    async ({
      id: movieId,
      title,
      name,
      release_date: releaseDate,
      first_date: firstDate,
      genre_ids: genresIdsArray,
      poster_path,
    }) => {
      const poster = `https://image.tmdb.org/t/p/w500${poster_path}`;
      const placeholderImg =
        'https://image.tmdb.org/t/p/w500/AcKVlWaNVVVFQwro3nLXqPljcYA.jpg';

      const genres = checkAmountGenres(genresIdsArray);
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
            <li class="card-genres" id="${movieId}">${genres}</li>
            <li class="card-data" id="${movieId}">${
        releaseDate ? releaseDate.slice(0, 4) : firstDate.slice(0, 4)
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
