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
      first_date: firstDate,
      genre_ids: genresOfMovie,
      poster_path: poster = 'images/plug-image.png',
    }) => `<li class="card-item" id="${movieId}">
        <a class="card-link" id="${movieId}" href="https://image.tmdb.org/t/p/w500${poster}">
        <img class="card__image" id="${movieId}" src="https://image.tmdb.org/t/p/w500${poster}" alt="${title}">
        <div class="card-discr">
        <p class="card-title" id="${movieId}">${title ? title : name}</p>
        <ul class="box">
            <li class="card-genres" id="${movieId}">${getGenresFromLocal(genresOfMovie)}</li>
            <li class="card-data" id="${movieId}">${
              releaseDate ? releaseDate.slice(0, 4) : firstDate.slice(0, 4)
            }</li>
        </ul>
        </div>
        </a>    
    </li>`
  ).join('');
  return moviesMarkup;
}
//function makeToUpperCase(title) {
//  const upperTitle = title.toUpperCase();
//  return upperTitle;
//}