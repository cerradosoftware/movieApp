import {MOVIEDB_URL} from '../values/config';
import axios from 'axios';
import {Movie} from '../types/Movie';

class MoviesService {
  static async getTrending(callback: (r: Array<Movie>) => void) {
    try {
      const response = await axios.get(MOVIEDB_URL);
      callback(response.data.results.slice(0, 10));
    } catch (error) {
      throw error;
    }
  }
}

export default MoviesService;
