import getFromLocal from "./getFromLocal"

export default function getMovieFromLocal(key, movieId) {
  const moviesArray = getFromLocal(key);
  const finedMovie = moviesArray.find(item => item.id === movieId);
  return finedMovie;
}
