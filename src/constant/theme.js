import { createMuiTheme } from '@material-ui/core/styles';

export const lighttheme = createMuiTheme({
  palette: {
    primary: {
      light: '#c3fdff',
      main: '#90caf9',
      dark: '#5d99c6',
      contrastText: '#fafafa'
    },
    secondary: {
      light: '#ffffff',
      main: '#cfd8dc',
      dark: '#9ea7aa',
      contrastText: '#fafafa'
    }
  },
  typography: {
    fontFamily: "'Tajawal', 'Lato', 'Roboto', 'Helvetica', 'Arial', sans-serif"
  }
});

export const darktheme = createMuiTheme({
  palette: {
    primary: {
      light: '#62727b',
      main: '#37474f',
      dark: '#102027',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#6d6d6d',
      main: '#424242',
      dark: '#1b1b1b',
      contrastText: '#ffffff'
    }
  },
  typography: {
    fontFamily: "'Tajawal', 'Lato', 'Roboto', 'Helvetica', 'Arial', sans-serif"
  }
});
