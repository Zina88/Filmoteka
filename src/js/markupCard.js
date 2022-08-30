import getGenresFromLocal from './getGenresFromLocal';
const refs = {
  gallery: document.querySelector('.gallery'),
};

export function appendMoviesMarkup(Array) {
  refs.gallery.insertAdjacentHTML('beforeend', createMoviesMarkup(Array));
}
export function createMoviesMarkup(Array) {
  const moviesMarkup = Array.map(
    ({
      id: movieId,
      title,
      name,
      release_date: releaseDate,
      genre_ids: genresOfMovie,
      poster_path,
    }) => {
      const poster = `https://image.tmdb.org/t/p/w500${poster_path}`;
      const placeholderImg =
        'https://image.tmdb.org/t/p/w500/AcKVlWaNVVVFQwro3nLXqPljcYA.jpg';
      // console.dir(poster);
      const movieMarkup = `<li class="card-item" id="${movieId}">
        <a class="card-link" id="${movieId}" href="${poster_path !== null ? poster : placeholderImg
        }">
        <img class="card__image" id="${movieId}" src="${poster_path !== null ? poster : placeholderImg
        }" alt="${title}">
        <div class="card-discr">
        <p class="card-title" id="${movieId}">${title ? title : name}</p>
        <ul class="box">
            <li class="card-genres" id="${movieId}">${getGenresFromLocal(
        genresOfMovie
      )}</li>
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
  ).join('');
  return moviesMarkup;
}

