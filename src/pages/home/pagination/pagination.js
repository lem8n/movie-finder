import { Pagination } from '@mui/material';
import './pagination.css';
import { searchMovies } from '../../../api/tmdb';

export const PaginationItem = ({
	totalPages,
	setSearchResult,
	searchPhrase,
}) => {
	const handlePageChange = async (page) => {
		try {
			console.log(searchPhrase);
			const movies = await searchMovies(searchPhrase, page);
			window.scroll(0, 0);
			if (movies) {
				setSearchResult(movies.data.results);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Pagination
			count={totalPages}
			color="secondary"
			className="pagination"
			size="large"
			onChange={(evt, page) => {
				handlePageChange(page);
			}}
		/>
	);
};
