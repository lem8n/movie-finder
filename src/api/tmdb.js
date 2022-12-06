import axios from 'axios';
import { config } from './config';

// API Calls

const searchMovies = async (query, page) => {
	try {
		return await axios.get(
			`${config.baseUrl}/search/movie?api_key=${config.apiKey}&query=${query}&page=${page}`
		);
	} catch (error) {
		console.log(error.message);
	}
};

const fetchMovieDetails = async (movieId) => {
	try {
		return await axios.get(
			`${config.baseUrl}/movie/${movieId}?api_key=${config.apiKey}`
		);
	} catch (error) {
		console.log(error.message);
	}
};

export { searchMovies, fetchMovieDetails };
