import { yellow } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
	palette: {
		common: {
			main: '#fff',
		},
		secondary: {
			main: yellow[900],
		},
	},
});
