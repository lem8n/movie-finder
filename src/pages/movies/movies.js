import './movies.css';
import { IconButton, Stack, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { MovieListItem } from './movie-list-item/movie-list-item';
import { PaginationItem } from './pagination/pagination';
import { searchMovies } from '../../api/tmdb';
import { useNavigate } from 'react-router-dom';

export const Movies = ({
	searchPhrase,
	setSearchPhrase,
	totalPages,
	setTotalPages,
	page,
	setPage,
	searchResult,
	setSearchResult,
	searchInput,
	setSearchInput,
	searchHappened,
	setSearchHappened,
}) => {
	const navigate = useNavigate();
	const handleSearch = async (evt) => {
		// Don't trigger for any key except the enter key
		// If evt.keyCode is undefined means that it's a click on the search icon
		if (evt.keyCode && evt.keyCode !== 13) {
			return;
		}
		setSearchHappened(true); // Make sure not to show the No movies found text before any search happens
		/**
		 * I keep the searched phrase when entered separately in order to retain it during server side pagination
		 * if the user decides to change the search word but continue iterating through the pages of the previous search
		 */
		setSearchPhrase(searchInput);

		try {
			const movies = await searchMovies(searchInput, 1);
			if (movies) {
				setTotalPages(movies.data.total_pages);
				setPage(1);
				setSearchResult(movies.data.results);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<div className="search-container">
				<IconButton onClick={() => navigate('/')} className="logo-button">
					<img className="logo" src={`/assets/logo.png`} />
				</IconButton>
				<TextField
					InputProps={{
						endAdornment: (
							<IconButton
								type="button"
								sx={{ p: '10px' }}
								onClick={handleSearch}
							>
								<SearchIcon />
							</IconButton>
						),
					}}
					className="search-bar"
					label="Search for a movie..."
					variant="outlined"
					color="common"
					onChange={(evt) => setSearchInput(evt.target.value)}
					onKeyDown={handleSearch}
				/>
			</div>
			{searchResult.length > 0 && (
				<PaginationItem
					totalPages={totalPages}
					page={page}
					setPage={setPage}
					setSearchResult={setSearchResult}
					searchPhrase={searchPhrase}
				/>
			)}
			<Stack spacing={2} className="stack-container">
				<MovieListItem
					searchPhrase={searchPhrase}
					searchResult={searchResult}
					searchHappened={searchHappened}
				/>
			</Stack>
			{searchResult.length > 0 && (
				<PaginationItem
					totalPages={totalPages}
					page={page}
					setPage={setPage}
					setSearchResult={setSearchResult}
					searchPhrase={searchPhrase}
				/>
			)}
		</div>
	);
};
