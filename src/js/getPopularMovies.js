//Oksana Bulakh

// import MovieApiService from './movieApiService';
// import saveOnLocalStorage from './saveInLocalStorage';
// import { STORAGE_KEY_MOVIES } from './constants';
// import { appendMoviesMarkup } from './markupCard';

// const movieApiService = new MovieApiService();
// // getPopularMovies();

// export default async function getPopularMovies() {
//   try {
//     const result = await movieApiService.popularMovies();

//     const {
//       page: currentPage,
//       results: moviesArray,
//       total_page: totalPage,
//       total_results: totalResults,
//     } = result;

//     appendMoviesMarkup(moviesArray);
//     // console.log(moviesArray);
//     saveOnLocalStorage(STORAGE_KEY_MOVIES, moviesArray);
    
//   } catch (error) {
//     console.log(error);
//   }
// }
