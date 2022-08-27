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
    }) => `<a href="https://image.tmdb.org/t/p/w500${poster}">
    <li>
        <img class="card__image" src="https://image.tmdb.org/t/p/w500${poster}" alt="${title}">
        <p>${title ? title : name}</p>
        <div>
            <p>${getGenresFromLocal(genresOfMovie)}</p>
            <p>${releaseDate ? releaseDate.slice(0,4) : firstDate.slice(0,4)}</p>
        </div>    
    </li>
</a>`).join("")
    return moviesMarkup;
}
