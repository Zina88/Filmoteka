// імпорт запитів до API
import MovieApiService from "./movieApiService";

// посилання на елементи 
const refs = {
    searchForm: document.querySelector("#search-form")
}

refs.searchForm.addEventListener("submit", onSearch);

// створюємо екземпляр класу MovieApiService для запитів на сервер
const movieApiService = new MovieApiService();

// при першому відвідуванні сайту робимо запит за популярними і зберігаємо їх в локал
async function getPopularMovies() {
        
    try {
        const result = await movieApiService.popularMovies();
    
        const {
            page: currentPage,
            results: moviesArray,
            total_page: totalPage,
            total_results: totalResults } = result;

        saveOnLocalStorage("moviesArrayOnLocal", moviesArray);
    } catch (error){
        console.log(error)
    }
}

function saveOnLocalStorage(key, value) {
    localStorage.setItem("key", JSON.stringify(value));
}

// витягуємо дані з локал та рендеримо в розмітку популярних фільмів
showPopularMovies();

function showPopularMovies() {

    const moviesArrayFromLocal = JSON.parse(localStorage.getItem("moviesArrayOnLocal"));
         
    // додаємо в розмітку популярні фільми (Аня підготує цю функцію)
    appendMoviesMarkup(moviesArrayFromLocal)
};


function appendMoviesMarkup(Array) {
    refs.gallery.insertAdjacentHTML("beforeend", creatMoviesMarkup(Array));
}

function creatMoviesMarkup(Array) {
    const moviesMarkup = Array.map(({
        title,
        name,
        release_date: releaseDate,
        first_date: firstDate,
        genre_ids: genresOfMovie,
        poster_path: poster = "images/plug-image.png",
        poster: poster = "images/"
    }) => `......`).joing("")
    return moviesMarkup
}


async function onSearch(e) {
    e.preventDefault();
    const inputValue = e.currentTarget.elements.searchQuery.value.trim();

    // робимо запит популярних фільмів і зберігаємо кожну сторінку в локал
    
    async function getMoviesBySearch() {
        const result = await movieApiService.MoviesBySearch();
    
        const {
            page: currentPage,
            results: movieArray,
            total_page: totalPage,
            total_results: totalResults } = result;

        saveOnLocalStorage("movieArrayOnLocal", movieArray);
    }

    appendMoviesMarkup(moviesArrayFromLocal)
      
}

