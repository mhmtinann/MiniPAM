import React from 'react';
import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import TerminalIcon from '@mui/icons-material/Terminal';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';

const ConnectionTypeSelector = ({ connectionType, onConnectionTypeChange }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle1" sx={{ mb: 1, color: '#fff' }}>
        Bağlantı Türü
      </Typography>
      <ToggleButtonGroup
        value={connectionType}
        exclusive
        onChange={onConnectionTypeChange}
        aria-label="connection type"
        sx={{
          '& .MuiToggleButton-root': {
            color: '#fff',
            borderColor: '#4a4a4a',
            '&.Mui-selected': {
              backgroundColor: '#1976d2',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
            },
            '&:hover': {
              backgroundColor: '#2c2c2c',
            },
          },
        }}
      >
        <ToggleButton value="ssh" aria-label="ssh connection">
          <TerminalIcon sx={{ mr: 1 }} />
          SSH
        </ToggleButton>
        <ToggleButton value="rdp" aria-label="rdp connection">
          <DesktopWindowsIcon sx={{ mr: 1 }} />
          RDP
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default ConnectionTypeSelector; 