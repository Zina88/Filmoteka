import MovieApiService from './movieApiService';
import getPopularMovies from './getPopularMovies';
import saveAllGenres from './saveAllGenres';
import getGenresFromLocal from './getGenresFromLocal';
import { STORAGE_KEY_MOVIES } from './constants';
import { appendMoviesMarkup, createMoviesMarkup } from './markupCard';
const refs = {
  gallery: document.querySelector(".gallery"),
  searchForm: document.querySelector('#search-form'),
  body: document.querySelector('body'),
};

const movieApiService = new MovieApiService();

// refs.searchForm.addEventListener("submit", onSearch);

getPopularMovies();
saveAllGenres();
// showPopularMovies();

// .............ТЕСТОВІ ФУНКЦІЇ..................
function showPopularMovies() {
  const moviesArrayFromLocal = JSON.parse(
    localStorage.getItem(STORAGE_KEY_MOVIES)
  );

  // console.log(moviesArrayFromLocal);
  // додаємо в розмітку популярні фільми (Аня підготує цю функцію)
  appendMoviesMarkup(moviesArrayFromLocal);
}

function appendMoviesMarkup(Array) {
  refs.body.insertAdjacentHTML('beforeend', creatMoviesMarkup(Array));
}

function creatMoviesMarkup(Array) {
  const moviesMarkup = Array.map(
    ({
      title,
      name,
      release_date: releaseDate,
      first_date: firstDate,
      genre_ids: genreIdsArray,
      poster_path: poster = './src/images/plug-image.png',
    }) => {
      const genres = getGenresFromLocal(genreIdsArray);

      console.log(genres);
      const movieMarkup = `<div class="photo-card">
                <a href="" class="gallery-link">
                    <img src="https://image.tmdb.org/t/p/w500${poster}" alt="" loading = "lazy"/>
                        <div class="info">
                            <p class="title">
                                ${title}
                                
                            </p>
                            <p class="data">
                                ${releaseDate}
                            </p>
                            <p class="genres">
                                ${genres}
                            </p>
                        </div>
                </a>       
            </div>`;
      return movieMarkup;
    }
  ).join('');
  return moviesMarkup;
}

// async function onSearch(e) {
//     e.preventDefault();
//     const inputValue = e.currentTarget.elements.searchQuery.value.trim();

//     // робимо запит популярних фільмів і зберігаємо кожну сторінку в локал

//     async function getMoviesBySearch() {
//         const result = await movieApiService.MoviesBySearch();

//         const {
//             page: currentPage,
//             results: movieArray,
//             total_page: totalPage,
//             total_results: totalResults } = result;

//         saveOnLocalStorage("movieArrayOnLocal", movieArray);
//     }

//     appendMoviesMarkup(moviesArrayFromLocal)

// }
