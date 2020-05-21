import {
    TRENDING_URL,
    NOW_URL,
    POPULAR_URL,
    UPCAMING_URL,
    SIMILAR_URL,
    CREDITS_URL,
    SEARCH_URL,
    GENDERS_URL,
    DISCOVER_GENRE_URL,
    VIDEOS_URL,
    IMAGES_URL
} from '../values/URLS';
import axios from 'axios';
import { Movie } from '../types/Movie';
import { Genre } from '../types/Genre';
import { Video } from '../types/Video';
import MoviesRest from './MoviesRest';

class MoviesService {
    static getUpcaming = () => {
        return MoviesService.doRequestToArrayData(UPCAMING_URL);
    };

    static getTrending = () => {
        return MoviesService.doRequestToArrayData(TRENDING_URL);
    };

    static getRelated = (id: number) => {
        return MoviesService.doRequestToArrayData(SIMILAR_URL(id));
    };

    static getVideos = (id: number) =>
        new Promise((resolve, reject) => {
            axios
                .get(VIDEOS_URL(id))
                .then((response) => resolve(response.data.results))
                .catch((err) => reject(err.message));
        });

    static getImages = (id: number) =>
        new Promise((resolve, reject) => {
            axios
                .get(IMAGES_URL(id))
                .then((response) => resolve(response.data.backdrops))
                .catch((err) => reject(err.message));
        });

    static search = (query: string) =>
        new Promise((resolve, reject) => {
            axios
                .get(SEARCH_URL(query))
                .then((response) => resolve(response.data.results))
                .catch((err) => reject(err.message));
        });

    static getGenders = () =>
        new Promise((resolve, reject) => {
            axios
                .get(GENDERS_URL)
                .then((response) => resolve(response.data.genres))
                .catch((err) => reject(err.message));
        });
    static getMoviesByGenre = (id: number) =>
        new Promise((resolve, reject) => {
            axios
                .get(DISCOVER_GENRE_URL(id))
                .then((response) => {
                    const data = MoviesService.cleanResult(
                        response.data.results
                    );
                    resolve(data);
                })
                .catch((err) => reject(err.message));
        });

    static getNow = () => {
        return MoviesService.doRequestToArrayData(NOW_URL);
    };

    static getPopular() {
        return MoviesService.doRequestToArrayData(POPULAR_URL);
    }

    /**
     * Executa uma requesição em endpoints que retornem arrays dentro de um objeto results
     * Filtra para que valores invalidos passem.
     * @param url Endpoint
     */
    static doRequestToArrayData = (url: string) =>
        new Promise((resolve, reject) => {
            MoviesRest.makeRequest(url)
                .then((response) => {
                    let data = MoviesService.cleanResult(
                        JSON.parse(response).results
                    );
                    resolve(data.slice(0, 10));
                })
                .catch((err) => reject(err.message));
        });

    private static cleanResult(results: Array<Movie>) {
        return results.filter((item: Movie) => {
            return item.overview && item.backdrop_path && item.poster_path;
        });
    }
}

export default MoviesService;
