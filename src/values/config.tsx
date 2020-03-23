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
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500/';
