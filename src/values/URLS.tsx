export const MOVIEDB_APIKEY = '939aa0a9eaf07e10c4ef3861d933f669';
export const BASE_URL = 'https://api.themoviedb.org/3';
export const UPCAMING_URL =
    BASE_URL + '/movie/upcoming?api_key=' + MOVIEDB_APIKEY + '&language=pt-BR';
export const TRENDING_URL =
    BASE_URL +
    '/trending/movie/day?api_key=' +
    MOVIEDB_APIKEY +
    '&language=pt-BR';
export const NOW_URL =
    BASE_URL +
    '/movie/now_playing?api_key=' +
    MOVIEDB_APIKEY +
    '&language=pt-BR';
export const POPULAR_URL =
    BASE_URL + '/movie/popular?api_key=' + MOVIEDB_APIKEY + '&language=pt-BR';
export const SIMILAR_URL = (id: number) => {
    return `${BASE_URL}/movie/${id}/similar?api_key=${MOVIEDB_APIKEY}&language=pt-BR`;
};

export const CREDITS_URL = (id: number) => {
    return `${BASE_URL}/movie/${id}/credits?api_key=${MOVIEDB_APIKEY}&language=pt-BR`;
};

export const SEARCH_URL = (query: string) => {
    return `${BASE_URL}/search/movie?api_key=${MOVIEDB_APIKEY}&language=pt-BR&page=1&include_adult=false&query=${query}`;
};

export const GENDERS_URL = `${BASE_URL}/genre/movie/list?api_key=${MOVIEDB_APIKEY}&language=pt-BR`;

export const DISCOVER_GENRE_URL = (id: number) => {
    return `${BASE_URL}/discover/movie/?api_key=${MOVIEDB_APIKEY}&sort_by=popularity.desc&include_adult=false&page=1&with_genres=${id}&language=pt-BR`;
};

// /discover/movie?api_key={{apikey_movies}}&sort_by=popularity.desc&include_adult=false&page=1&with_genres=28&language=pt-BR

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500/';
