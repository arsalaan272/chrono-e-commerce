import { createTheme } from '@mui/material/styles';

const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: '#2E3B55', // Deep blue
      light: '#4F5B75',
      dark: '#1E2B45',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#F50057', // Pink accent
      light: '#FF4081',
      dark: '#C51162',
      contrastText: '#ffffff',
    },
    background: {
      default: mode === 'light' ? '#f5f5f7' : '#121212',
      paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
    },
    text: {
      primary: mode === 'light' ? '#333333' : '#ffffff',
      secondary: mode === 'light' ? '#666666' : '#b0b0b0',
    },
    divider: mode === 'light' ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)',
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          padding: '8px 24px',
          boxShadow: mode === 'light' 
            ? '0 4px 10px rgba(0, 0, 0, 0.15)' 
            : '0 4px 10px rgba(0, 0, 0, 0.4)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: mode === 'light'
              ? '0 6px 15px rgba(0, 0, 0, 0.2)'
              : '0 6px 15px rgba(0, 0, 0, 0.5)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #2E3B55 30%, #4F5B75 90%)',
        },
        containedSecondary: {
          background: 'linear-gradient(45deg, #F50057 30%, #FF4081 90%)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: mode === 'light'
            ? '0 8px 24px rgba(0, 0, 0, 0.1)'
            : '0 8px 24px rgba(0, 0, 0, 0.4)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: mode === 'light'
              ? '0 12px 30px rgba(0, 0, 0, 0.15)'
              : '0 12px 30px rgba(0, 0, 0, 0.5)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: mode === 'light'
            ? '0 4px 20px rgba(0, 0, 0, 0.1)'
            : '0 4px 20px rgba(0, 0, 0, 0.3)',
          backgroundColor: mode === 'light' 
            ? 'rgba(255, 255, 255, 0.8)' 
            : 'rgba(30, 30, 30, 0.8)',
          backdropFilter: 'blur(10px)',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          transition: 'background-color 0.3s ease, color 0.3s ease',
        },
      },
    },
  },
});

export default getTheme; 