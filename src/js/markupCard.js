import getGenresFromLocal from "./getGenresFromLocal";
export const refs = {
    gallery: document.querySelector(".gallery")
};
export function appendMoviesMarkup(Array) {
    refs.gallery.insertAdjacentHTML("beforeend", createMoviesMarkup(Array));   
}
export function createMoviesMarkup(Array) {
    const moviesMarkup = Array.map(({
        title,
        name,
        release_date: releaseDate,
        first_date: firstDate,
        genre_ids: genresOfMovie,
        poster_path: poster = "images/plug-image.png",
    }) => `<li class="card-item">
        <a class="card-link" href="https://image.tmdb.org/t/p/w500${poster}">
        <img class="card__image" src="https://image.tmdb.org/t/p/w500${poster}" alt="${title}">
        <p class="card-title">${title ? title : name}</p>
        <div class="box">
            <p class="card-genres">${getGenresFromLocal(genresOfMovie)}</p>
            <p class="card-data">${releaseDate ? releaseDate.slice(0,4) : firstDate.slice(0,4)}</p>
        </div>
        </a>    
    </li>`).join("")
    return moviesMarkup;
}
