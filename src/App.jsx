import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { ThemeContextProvider } from './context/ThemeContext';

// Components
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './components/Pages/Dashboard/Dashboard';
import Projects from './components/Pages/Projects/Projects';
import CV from './components/Pages/CV/CV';

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <ThemeContextProvider>
        <CssBaseline />
        <SnackbarProvider 
          maxSnack={3}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <Router>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="projects" element={<Projects />} />
                <Route path="cv" element={<CV />} />
              </Route>
            </Routes>
          </Router>
        </SnackbarProvider>
    </ThemeContextProvider>
  );
}

export default App;