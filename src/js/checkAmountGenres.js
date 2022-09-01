//Oksana Bulakh

import getGenresFromLocal from './getGenresFromLocal';

export default  function checkAmountGenres(genresIdsArray) {
    const genresOfMovie = getGenresFromLocal(genresIdsArray);
    let genres;
    if (genresOfMovie.length > 3) {
        return genres = `${genresOfMovie.slice(0, 3).join(', ')}, ...other`;
    }else if  (genresOfMovie.length ===0 || genresOfMovie === null) {
       return genres = 'Unknown'
        
    }else {
         genres = genresOfMovie.join(', ');
    }
    return genres
}
