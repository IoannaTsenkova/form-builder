import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0E5E89'
    },
    secondary: {
      main: '#43944A'
    },
    background: {
      default: '#F8F9FA'
    },
    text: {
      primary: '#0E5E89'
    }
  },
  typography: {
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
    h5: {
      fontWeight: 600
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500
    }
  },
  components: {
    MuiInputAdornment: {
      styleOverrides: {
        positionEnd: {
          '& svg': {
            color: '#0E5E89'
          }
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined'
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& fieldset': {
            borderColor: '#0E5E89'
          },
          input: {
            color: 'black'
          }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#0E5E89'
        }
      }
    }
  }
});

export default theme;
