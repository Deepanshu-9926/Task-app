import { createTheme } from '@mui/material/styles'

export const gradient = 'linear-gradient(135deg, #f4a0b5 0%, #c5b3e6 50%, #a4c8e8 100%)'
export const gradientWarm = 'linear-gradient(135deg, #f4a0b5 0%, #f7c5a0 100%)'
export const gradientCool = 'linear-gradient(135deg, #c5b3e6 0%, #a4c8e8 100%)'

export const collectionColors = {
  pink: '#f4a0b5',
  teal: '#a8dbc5',
  purple: '#c5b3e6',
  gold: '#e8d98a',
  blue: '#a4c8e8',
  red: '#e8a0a0',
}

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#c5b3e6',
      light: '#ddd1f0',
      dark: '#9b85c9',
    },
    secondary: {
      main: '#f4a0b5',
      light: '#fce4ec',
      dark: '#d87a94',
    },
    background: {
      default: '#faf8f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a2e',
      secondary: '#6b6b80',
      disabled: '#b0b0be',
    },
    divider: 'rgba(0,0,0,0.06)',
    success: {
      main: '#a8dbc5',
    },
    warning: {
      main: '#f7c5a0',
    },
    error: {
      main: '#e8a0a0',
    },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: [
      "'Plus Jakarta Sans'",
      'system-ui',
      '-apple-system',
      'Segoe UI',
      'Roboto',
      'sans-serif',
    ].join(','),
    h1: { fontWeight: 800, letterSpacing: '-0.025em' },
    h2: { fontWeight: 700, letterSpacing: '-0.02em' },
    h3: { fontWeight: 700, letterSpacing: '-0.015em' },
    h4: { fontWeight: 700, letterSpacing: '-0.01em' },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    body1: { fontWeight: 400, lineHeight: 1.6 },
    body2: { fontWeight: 400, lineHeight: 1.5 },
    button: { textTransform: 'none', fontWeight: 600, letterSpacing: '0.01em' },
    caption: { fontWeight: 500, color: '#6b6b80' },
  },
  shadows: [
    'none',
    '0 1px 2px rgba(0,0,0,0.04)',
    '0 2px 8px rgba(0,0,0,0.06)',
    '0 4px 16px rgba(0,0,0,0.08)',
    '0 8px 32px rgba(0,0,0,0.1)',
    '0 16px 48px rgba(0,0,0,0.12)',
    ...Array(19).fill('0 16px 48px rgba(0,0,0,0.12)'),
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(0,0,0,0.12) transparent',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 16,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 20px',
          fontSize: '0.875rem',
          fontWeight: 600,
          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
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
          borderRadius: 12,
          backgroundColor: '#faf8f5',
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: '#f4f0ec',
          },
          '&.Mui-focused': {
            backgroundColor: '#ffffff',
          },
        },
        notchedOutline: {
          borderColor: 'rgba(0,0,0,0.08)',
          transition: 'border-color 0.2s ease',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#ffffff',
          backgroundImage: 'none',
          borderRadius: 20,
          boxShadow: '0 16px 48px rgba(0,0,0,0.12)',
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          border: '1px solid rgba(0,0,0,0.06)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          fontWeight: 600,
          transition: 'all 0.2s ease',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          fontSize: '0.8rem',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: 14,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          border: '1px solid rgba(0,0,0,0.06)',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '2px 6px',
          padding: '8px 12px',
          fontSize: '0.875rem',
          fontWeight: 500,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(0,0,0,0.06)',
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          '& .MuiPaper-root': {
            borderRadius: 12,
            backgroundColor: '#1a1a2e',
            color: '#fff',
            fontWeight: 500,
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          },
        },
      },
    },
  },
})
