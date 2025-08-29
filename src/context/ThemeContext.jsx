import React, { createContext, useContext, useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const ThemeContext = createContext();

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within a ThemeContextProvider');
  }
  return context;
};

const lightTheme = {
  palette: {
    mode: 'light',
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
    background: {
      default: '#F4F6F8',
      header: '#FFFFFF',
      paper: '#FFFFFF',
      sidebar: '#FFFCF2',
    },
    text: {
      primary: '#252422',
      secondary: '#403D39',
    },
  },
};

const darkTheme = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#EB5E28',
      light: '#FFD1BC',
      soft: '#2A1A0F',
      dark: '#C04410',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#E0E0E0',
      light: '#F5F5F5',
      soft: '#2A2A2A',
      dark: '#BDBDBD',
      contrastText: '#000000',
    },
    background: {
      default: '#0A0A0A',
      header: '#1E1E1E',
      paper: '#1E1E1E',
      sidebar: '#1A1A1A',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
    },
  },
};

export const ThemeContextProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const currentTheme = createTheme(isDarkMode ? darkTheme : lightTheme);

  const value = {
    isDarkMode,
    toggleTheme,
    theme: currentTheme,
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <ThemeContext.Provider value={value}>
        {children}
      </ThemeContext.Provider>
    </ThemeProvider>
  );
};