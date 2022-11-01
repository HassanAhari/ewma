import http from './axios.js'

export default {
    movies: (page) => http.get(`/discover/movie?api_key=${process.env.VUE_APP_API_KEY}&page=${page}`),
    genres: () => http.get(`/genre/movie/list?api_key=${process.env.VUE_APP_API_KEY}`),
    credits: (movie_id) => http.get(`/movie/${movie_id}/credits?api_key=${process.env.VUE_APP_API_KEY}`),
    details: (movie_id) => http.get(`/movie/${movie_id}?api_key=${process.env.VUE_APP_API_KEY}`),
}