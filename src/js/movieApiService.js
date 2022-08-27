import axios from 'axios';
import { API_KEY, BASE_URL } from './constants';


export default class MovieApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async popularMovies() {
    const urlPopular = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`;

    const response = await axios.get(urlPopular);
    return response.data;
  }
  async moviesBySearch() {
    const urlSearch = `${BASE_URL}search/movie?language=en-US&include_adult=false&api_key=${API_KEY}&query=${this.searchQuery}&page=${this.page}`;

    const response = await axios.get(urlSearch);
    return response.data;
  }
  async allGenres() {
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
