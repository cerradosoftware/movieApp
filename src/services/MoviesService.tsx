import {
    TRENDING_URL,
    NOW_URL,
    POPULAR_URL,
    UPCAMING_URL,
    BASE_URL,
    MOVIEDB_APIKEY
} from '../values/config';
import axios from 'axios';
import { Movie } from '../types/Movie';

class MoviesService {
    static async getUpcaming(callback: (r: Array<Movie>) => void) {
        try {
            MoviesService.doRequest(UPCAMING_URL, callback);
        } catch (error) {
            throw error;
        }
    }

    static async getTrending(callback: (r: Array<Movie>) => void) {
        try {
            MoviesService.doRequest(TRENDING_URL, callback);
        } catch (error) {
            throw error;
        }
    }

    static async getRelated(id: number, callback: (r: Array<Movie>) => void) {
        const SIMILAR_URL =
            BASE_URL +
            '/movie/' +
            id +
            '/similar?api_key=' +
            MOVIEDB_APIKEY +
            '&language=pt-BR';
        try {
            MoviesService.doRequest(SIMILAR_URL, callback);
        } catch (error) {
            throw error;
        }
    }

    static async getNow(callback: (r: Array<Movie>) => void) {
        try {
            MoviesService.doRequest(NOW_URL, callback);
        } catch (error) {
            throw error;
        }
    }

    static async getPopular(callback: (r: Array<Movie>) => void) {
        try {
            MoviesService.doRequest(POPULAR_URL, callback);
        } catch (error) {
            throw error;
        }
    }

    static async doRequest(url: string, callback: (r: Array<Movie>) => void) {
        const response = await axios.get(url);
        callback(response.data.results.slice(0, 10));
    }
}

export default MoviesService;
