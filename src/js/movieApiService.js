//Oksana Bulakh

import axios from 'axios';
import { API_KEY, BASE_URL } from './constants';

export default class MovieApiService {
  
  static searchQuery = '';

  async popularMovies(pageNumber = 1) {
    const urlPopular = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${pageNumber}`;

    const response = await axios.get(urlPopular);
    return response.data;
  }
  async moviesBySearch(pageNumber = 1) {
    const urlSearch = `${BASE_URL}search/movie?language=en-US&include_adult=false&api_key=${API_KEY}&query=${MovieApiService.searchQuery}&page=${pageNumber}`;

    const response = await axios.get(urlSearch);
    return response.data;
  }

  async allGenres() {
    const urlGenres = `${BASE_URL}genre/movie/list?language=en-US&api_key=${API_KEY}`;

    const response = await axios.get(urlGenres);
    return response.data.genres;
  }

  get query() {
    return MovieApiService.searchQuery;
  }
  set query(newQuery) {
    MovieApiService.searchQuery = newQuery;
  }
}

