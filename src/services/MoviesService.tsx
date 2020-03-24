import {
    TRENDING_URL,
    NOW_URL,
    POPULAR_URL,
    UPCAMING_URL,
    SIMILAR_URL,
    CREDITS_URL,
    SEARCH_URL
} from '../values/URLS';
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
        try {
            MoviesService.doRequest(SIMILAR_URL(id), callback);
        } catch (error) {
            throw error;
        }
    }

    static async getCast(id: number, callback: (r: Array<Movie>) => void) {
        try {
            const response = await axios.get(CREDITS_URL(id));
            callback(response.data.results);
        } catch (error) {
            throw error;
        }
    }

    static async search(query: string, callback: (r: Array<Movie>) => void) {
        try {
            const response = await axios.get(SEARCH_URL(query));
            callback(response.data.results);
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
