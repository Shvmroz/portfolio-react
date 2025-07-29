import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#EB5E28',
      light: '#FFD1BC',
      soft: '#FFF3EB',
      dark: '#C04410',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#403D39',
      light: '#6E6B67',
      soft: '#E7E5E3',
      dark: '#252422',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#4CAF50',
      light: '#E3F5E4',
      soft: '#F9FCF9',
      dark: '#388E3C',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#3B82F6',
      light: '#BFDBFE',
      soft: '#F3F6FF',
      dark: '#1E40AF',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#FFA726',
      light: '#FFECB3',
      soft: '#FFF9EB',
      dark: '#F57C00',
      contrastText: '#2E2E2E',
    },
    error: {
      main: '#B71C1C',
      contrastText: '#FFFFFF',
    },
    text: {
      primary: '#252422',
      secondary: '#403D39',
      light: '#FFFFFF',
    },
    background: {
      default: '#F4F6F8',
      header: '#FFFFFF',
      paper: '#FFFFFF',
    },
    divider: '#CCC5B9',
  },

  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      fontSize: '2rem',
      color: '#252422',
      '@media (max-width:600px)': {
        fontSize: '1.3rem',
      },
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.75rem',
      color: '#252422',
      '@media (max-width:600px)': {
        fontSize: '1.2rem',
      },
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.5rem',
      color: '#252422',
      '@media (max-width:600px)': {
        fontSize: '1rem',
      },
    },
    body1: {
      fontSize: '1rem',
      '@media (max-width:600px)': {
        fontSize: '0.85rem',
      },
    },
    body2: {
      fontSize: '0.875rem',
      '@media (max-width:600px)': {
        fontSize: '0.75rem',
      },
    },
    button: {
      fontWeight: 500,
      textTransform: 'uppercase',
      color: '#252422',
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: '4px 12px',
          boxShadow: "none",
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#FFF3EB',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
          backgroundColor: '#FFFFFF',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: 'none',
          boxShadow: '2px 0 8px rgba(0,0,0,0.06)',
          backgroundColor: '#FFFCF2',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: '16px 24px',
          [theme.breakpoints.down('sm')]: {
            padding: '12px 16px',
          },
        }),
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: '16px 24px',
          [theme.breakpoints.down('sm')]: {
            padding: '12px 16px',
          },
        }),
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: '12px 24px',
          [theme.breakpoints.down('sm')]: {
            padding: '8px 16px',
          },
        }),
      },
    },


  },
});