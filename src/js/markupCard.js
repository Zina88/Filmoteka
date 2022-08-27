const refs = {
    gallery: document.querySelector(".gallery")
};
function appendMoviesMarkup(Array) {
    refs.gallery.insertAdjacentHTML("beforeend", createMoviesMarkup(Array));   
}
function createMoviesMarkup(Array) {
    const moviesMarkup = Array.map(({
        title,
        name,
        release_date: releaseDate,
        first_date: firstDate,
        genre_ids: genresOfMovie,
        poster_path: poster = "images/plug-image.png",
        poster: poster = "images/"
    }) => `<a href="${poster}">
    <li>
        <img class="card__image" src="${poster}" alt="${title}">
        <p>${title}</p>
        <div>
            <p>${genresOfMovie}</p>
            <p>${firstDate}</p>
        </div>
        
    </li>
</a>`).join("")
    return moviesMarkup;
}