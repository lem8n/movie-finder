import { Card, CardContent, IconButton, Typography } from '@mui/material';
import './movie-details.css';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchMovieDetails, searchMovies } from '../../api/tmdb';

export const MovieDetails = ({
	searchPhrase,
	page,
	setSearchResult,
	setTotalPages,
}) => {
	const location = useLocation();
	const movieId = location.search.split('=')[1];
	const [movieDetails, setMovieDetails] = useState({});
	const [movieGenres] = useState([]);
	const [productionCompanies] = useState([]);
	const [languages] = useState([]);
	const navigate = useNavigate();

	const handleBackPress = async () => {
		try {
			const movies = await searchMovies(searchPhrase, page);
			if (movies) {
				setSearchResult(movies.data.results);
				setTotalPages(movies.data.total_pages);
				navigate(`/movies?query=${searchPhrase}&page=${page}`);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchMovieDetails(movieId)
			.then((details) => {
				setMovieDetails(details.data);
				details.data.genres &&
					details.data.genres.map((genre) => {
						movieGenres.push(genre.name);
					});
				details.data.production_companies &&
					details.data.production_companies.map((company) => {
						productionCompanies.push(company.name);
					});
				details.data.spoken_languages &&
					details.data.spoken_languages.map((language) => {
						languages.push(language.english_name);
					});
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<div className="movie-container">
			<IconButton
				type="button"
				sx={{ p: '10px' }}
				className="back-button"
				onClick={handleBackPress}
			>
				<ArrowBack />
			</IconButton>
			<img
				src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
				className="poster"
			/>
			<Card className="details-card">
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{movieDetails.title}
					</Typography>
					<Typography
						variant="body2"
						color="text.secondary"
						className="description"
					>
						{movieDetails.overview}
					</Typography>
					<Typography variant="body2" color="secondary" className="details">
						<span style={{ color: '#000000' }}>Budget: </span>
						{movieDetails.budget}m
					</Typography>
					<Typography variant="body2" color="secondary" className="details">
						<span style={{ color: '#000000' }}>Rating: </span>
						{movieDetails.vote_average}
						{'/10 '}
						<span style={{ color: '#000000' }}>from a total of </span>
						{movieDetails.vote_count}
						<span style={{ color: '#000000' }}> votes</span>
					</Typography>
					{movieGenres.length > 0 && (
						<Typography variant="body2" color="secondary" className="details">
							<span style={{ color: '#000000' }}>Genres: </span>
							{movieGenres.join(', ')}
						</Typography>
					)}
					{productionCompanies.length > 0 && (
						<Typography variant="body2" color="secondary" className="details">
							<span style={{ color: '#000000' }}>Production Companies: </span>
							{productionCompanies.join(', ')}
						</Typography>
					)}
					{languages.length > 0 && (
						<Typography variant="body2" color="secondary" className="details">
							<span style={{ color: '#000000' }}>Languages: </span>
							{languages.join(', ')}
						</Typography>
					)}
				</CardContent>
			</Card>
		</div>
	);
};
