import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Assets from './pages/Assets';
import AuditLogs from './pages/AuditLogs';
import SessionLogs from './pages/SessionLogs';
import CommandLogs from './pages/CommandLogs';
import FileTransferLogs from './pages/FileTransferLogs';
import Login from './pages/Login';
import './App.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7c3aed',
    },
    background: {
      default: '#1a1c2e',
      paper: '#262a3b',
    },
  },
});

const LocationLogger = () => {
  const location = useLocation();
  console.log("📍 Current path:", location.pathname);
  return null;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <LocationLogger />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <Box sx={{ display: 'flex', width: '100%' }}>
                    <Sidebar />
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                      <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/assets" element={<Assets />} />
                        <Route path="/audit-logs" element={<AuditLogs />} />
                        <Route path="/session-logs" element={<SessionLogs />} />
                        <Route path="/command-logs" element={<CommandLogs />} />
                        <Route path="/file-transfer-logs" element={<FileTransferLogs />} />
                        <Route path="*" element={<div>❌ 404 - Page not found</div>} />
                      </Routes>
                    </Box>
                  </Box>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
