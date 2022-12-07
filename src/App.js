import './App.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { appTheme } from './themes/theme';
import { Movies } from './pages/movies/movies';
import { Home } from './pages/home/home';
import { MovieDetails } from './pages/movie-details/movie-details';
import { useState } from 'react';

function App() {
	/**
	 * Could have used global state in order not to pass props through every component
	 * My first option would be useContext to implement this
	 */

	const [searchPhrase, setSearchPhrase] = useState('');
	const [page, setPage] = useState(1);
	const [searchResult, setSearchResult] = useState([]);
	const [searchHappened, setSearchHappened] = useState(false);
	const [totalPages, setTotalPages] = useState(0);
	const [searchInput, setSearchInput] = useState('');

	return (
		<ThemeProvider theme={appTheme}>
			<CssBaseline enableColorScheme />
			<Router>
				<div className="App">
					<Routes>
						<Route
							exact
							path="/"
							element={
								<Home
									setSearchPhrase={setSearchPhrase}
									page={page}
									setPage={setPage}
									setTotalPages={setTotalPages}
									setSearchResult={setSearchResult}
									setSearchHappened={setSearchHappened}
									searchInput={searchInput}
									setSearchInput={setSearchInput}
								/>
							}
						></Route>
						<Route
							exact
							path="/movies"
							element={
								<Movies
									searchPhrase={searchPhrase}
									setSearchPhrase={setSearchPhrase}
									page={page}
									setPage={setPage}
									totalPages={totalPages}
									setTotalPages={setTotalPages}
									searchResult={searchResult}
									setSearchResult={setSearchResult}
									searchHappened={searchHappened}
									setSearchHappened={setSearchHappened}
									searchInput={searchInput}
									setSearchInput={setSearchInput}
								/>
							}
						></Route>
						<Route
							exact
							path="/movie-details"
							element={
								<MovieDetails
									searchPhrase={searchPhrase}
									setSearchResult={setSearchResult}
									setTotalPages={setTotalPages}
									page={page}
								/>
							}
						></Route>
					</Routes>
				</div>
			</Router>
		</ThemeProvider>
	);
}

export default App;
