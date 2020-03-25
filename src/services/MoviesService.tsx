import {
    TRENDING_URL,
    NOW_URL,
    POPULAR_URL,
    UPCAMING_URL,
    SIMILAR_URL,
    CREDITS_URL,
    SEARCH_URL,
    GENDERS_URL,
    DISCOVER_GENRE_URL
} from '../values/URLS';
import axios from 'axios';
import { Movie } from '../types/Movie';
import { Genre } from '../types/Genre';

class MoviesService {
    static async getUpcaming(callback: (r: Array<Movie>) => void) {
        try {
            MoviesService.doRequestToArrayData(UPCAMING_URL, callback);
        } catch (error) {
            throw error;
        }
    }

    static async getTrending(callback: (r: Array<Movie>) => void) {
        try {
            MoviesService.doRequestToArrayData(TRENDING_URL, callback);
        } catch (error) {
            throw error;
        }
    }

    static async getRelated(id: number, callback: (r: Array<Movie>) => void) {
        try {
            MoviesService.doRequestToArrayData(SIMILAR_URL(id), callback);
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

    static async getGenders(callback: (r: Array<Genre>) => void) {
        try {
            const response = await axios.get(GENDERS_URL);
            callback(response.data.genres);
        } catch (error) {
            throw error;
        }
    }

    static async getMoviesByGenre(
        id: number,
        callback: (r: Array<Movie>) => void
    ) {
        try {
            const response = await axios.get(DISCOVER_GENRE_URL(id));
            callback(response.data.results);
        } catch (error) {
            throw error;
        }
    }

    static async getNow(callback: (r: Array<Movie>) => void) {
        try {
            MoviesService.doRequestToArrayData(NOW_URL, callback);
        } catch (error) {
            throw error;
        }
    }

    static async getPopular(callback: (r: Array<Movie>) => void) {
        try {
            MoviesService.doRequestToArrayData(POPULAR_URL, callback);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Executa uma requesição em endpoints que retornem arrays dentro de um objeto results
     * Filtra para que valores invalidos passem.
     * @param url Endpoint
     * @param callback Função a ser executada após a requisição.
     */
    static async doRequestToArrayData(
        url: string,
        callback: (r: Array<Movie>) => void
    ) {
        const response = await axios.get(url);
        let data = response.data.results.filter((item: Movie) => {
            return item.overview && item.backdrop_path && item.poster_path;
        });
        callback(data.slice(0, 10));
    }
}

export default MoviesService;
