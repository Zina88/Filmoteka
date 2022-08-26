import axios from "axios";

// Константи базові
const API_KEY = "8562b39677dad16e2334fc338fdc606e";
const BASE_URL = "https://api.themoviedb.org/3/";


export default class MovieApiService {
    constructor() {
        this.searchQuery = "";
        this.page = 1; 
    };

    async popularMovies() {
        const urlPopular = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`;

        const response = await axios.get(urlPopular);
        return response.data;
    }
     async MoviesBySearch() {
        const urlSearch = `${BASE_URL}search/movie?language=en-US&include_adult=false&api_key=${API_KEY}&query=${this.searchQuery}&page=${this.page}`;

        const response = await axios.get(urlSearch);
        return response.data;
    }
      async Genres() {
        const urlGenres = `${BASE_URL}genre/movie/list?language=en-US&api_key=${API_KEY}`;

        const response = await axios.get(urlGenres);
        return response.data.genres;
    }

    resetPage() {
        this.page = 1;
    }
    incrementPage() {
        this.page += 1;
    }
    
    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}





// НОТАТКИ
const movieApiService = new MovieApiService();

async function getPopular() {
    // const {
    //     page: currentPage,
    //     results: movieArray,
    //     total_page: totalPage,
    //     total_results: totalResults } = await movieApiService.getPopularMovies();
    const response = await movieApiService.popularMovies();
    console.log(response);
}

getPopular();


// const picsMarkup = movieArray.map(({
//     title,
//     name,
//     release_date: releaseDate,
//     first_date: firstDate,
//     genre_ids: genresOfMovie,
//     poster_path: poster = "images/plug-image.png",
//     poster: poster = "images/"
// }) => markup).joing("")

// async function MoviesBySearch() {
//     const response = await movieApiService.getMoviesBySearch();
//     console.log(response);
// }
// MoviesBySearch();

// async function Genres() {
//     // const response = await movieApiService.getGenres();
//     console.log(await movieApiService.getGenres());
// }
// Genres();

