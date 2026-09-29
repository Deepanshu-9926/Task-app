import { createTheme } from '@mui/material/styles'

export const gradient = 'linear-gradient(135deg, #ec4899 0%, #f97316 100%)'

export const collectionColors = {
  pink: '#ec4899',
  teal: '#14b8a6',
  purple: '#a855f7',
  gold: '#eab308',
  blue: '#3b82f6',
  red: '#f43f5e',
}

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ec4899',
      light: '#f472b6',
      dark: '#be185d',
    },
    secondary: {
      main: '#f97316',
    },
    background: {
      default: '#0c0c12',
      paper: '#15151f',
    },
    text: {
      primary: '#f5f5f7',
      secondary: '#9b99a8',
    },
    divider: 'rgba(255,255,255,0.08)',
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: [
      'Inter',
      'system-ui',
      '-apple-system',
      'Segoe UI',
      'Roboto',
      'sans-serif',
    ].join(','),
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: 'rgba(255,255,255,0.04)',
        },
        notchedOutline: {
          borderColor: 'rgba(255,255,255,0.1)',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#181820',
          backgroundImage: 'none',
        },
      },
    },
  },
})
