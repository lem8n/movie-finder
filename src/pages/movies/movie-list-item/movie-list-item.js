import './movie-list-item.css';
import {
	Button,
	Card,
	CardActions,
	CardContent,
	Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const MovieListItem = ({ searchResult, searchHappened }) => {
	const navigate = useNavigate();
	const handleMovieDetails = (movieId) => {
		navigate(`/movie-details?movieId=${movieId}`);
	};

	return (
		<>
			{searchResult.length > 0 &&
				searchResult.map((result, key) => (
					<div className="movie-item" key={key}>
						{result.poster_path && (
							<img
								className="movie-img"
								src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
								onClick={() => handleMovieDetails(result.id)}
							/>
						)}
						<Card
							className="movie-card"
							onClick={() => handleMovieDetails(result.id)}
						>
							<CardContent>
								<Typography
									gutterBottom
									variant="h5"
									component="div"
									className="movie-title"
								>
									{result.title}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									{result.overview}
								</Typography>
							</CardContent>
							<CardActions className="card-buttons">
								<Button
									size="small"
									color="secondary"
									onClick={() => handleMovieDetails(result.id)}
								>
									Learn More
								</Button>
							</CardActions>
						</Card>
					</div>
				))}
			{searchHappened && searchResult.length === 0 && (
				<Typography
					gutterBottom
					variant="h3"
					component="div"
					style={{
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					No movies found :(
				</Typography>
			)}
		</>
	);
};
