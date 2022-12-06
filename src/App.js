import './App.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { appTheme } from './themes/theme';
import { Home } from './pages/home/home';
import { MovieDetails } from './pages/movie-details/movie-details';

function App() {
	return (
		<ThemeProvider theme={appTheme}>
			<CssBaseline enableColorScheme />
			<Router>
				<div className="App">
					<Routes>
						<Route exact path="/" element={<Home />}></Route>
						<Route
							exact
							path="/movie-details"
							element={<MovieDetails />}
						></Route>
					</Routes>
				</div>
			</Router>
		</ThemeProvider>
	);
}

export default App;
