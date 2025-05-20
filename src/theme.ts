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
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined'
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& fieldset': {
            borderColor: '#0E5E89',
          },
        //   '&:hover fieldset': {
        //     borderColor: 'red'
        //   },
        //   '&.Mui-focused fieldset': {
        //     borderColor: 'red'
        //   },
          input: {
            color: 'black',
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
