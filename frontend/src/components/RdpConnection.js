import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RdpConnection = ({ asset }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConnect = async () => {
    try {
      setLoading(true);
      setError('');
      
      // RDP bağlantısı için WebSocket bağlantısı kurulacak
      const ws = new WebSocket(`ws://localhost:8080/ws/rdp/${asset.id}`);
      
      ws.onopen = () => {
        ws.send(JSON.stringify({
          type: 'connect',
          credentials: {
            ...credentials,
            ipAddress: asset.ipAddress,
            port: asset.port || 3389,
          },
        }));
      };

      ws.onmessage = (event) => {
        const response = JSON.parse(event.data);
        if (response.type === 'error') {
          setError(response.message);
          setLoading(false);
        } else if (response.type === 'connected') {
          // RDP oturumu başlat
          navigate(`/rdp-session/${asset.id}`);
        }
      };

      ws.onerror = (error) => {
        setError('Bağlantı hatası oluştu');
        setLoading(false);
      };
    } catch (err) {
      setError('Bağlantı kurulamadı');
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        backgroundColor: '#2c2c2c',
        color: '#fff',
        maxWidth: 400,
        mx: 'auto',
      }}
    >
      <Typography variant="h6" sx={{ mb: 3 }}>
        RDP Bağlantısı - {asset.hostname}
      </Typography>

      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="Kullanıcı Adı"
          name="username"
          value={credentials.username}
          onChange={handleInputChange}
          variant="outlined"
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              color: '#fff',
              '& fieldset': {
                borderColor: '#4a4a4a',
              },
              '&:hover fieldset': {
                borderColor: '#666',
              },
            },
            '& .MuiInputLabel-root': {
              color: '#999',
            },
          }}
        />

        <TextField
          fullWidth
          label="Şifre"
          name="password"
          type="password"
          value={credentials.password}
          onChange={handleInputChange}
          variant="outlined"
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              color: '#fff',
              '& fieldset': {
                borderColor: '#4a4a4a',
              },
              '&:hover fieldset': {
                borderColor: '#666',
              },
            },
            '& .MuiInputLabel-root': {
              color: '#999',
            },
          }}
        />
      </Box>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Button
        fullWidth
        variant="contained"
        onClick={handleConnect}
        disabled={loading || !credentials.username || !credentials.password}
        sx={{
          backgroundColor: '#1976d2',
          '&:hover': {
            backgroundColor: '#1565c0',
          },
        }}
      >
        {loading ? <CircularProgress size={24} /> : 'Bağlan'}
      </Button>
    </Paper>
  );
};

export default RdpConnection; 