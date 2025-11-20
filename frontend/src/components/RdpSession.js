import React, { useEffect, useRef } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

const RdpSession = ({ assetId }) => {
  const rdpContainerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // RDP oturumu başlatma ve yönetme mantığı burada olacak
    const ws = new WebSocket(`ws://localhost:8080/ws/rdp/${assetId}`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'disconnected') {
        navigate('/assets');
      }
    };

    return () => {
      ws.close();
    };
  }, [assetId, navigate]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#000',
        zIndex: 1300,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 48,
          backgroundColor: '#1a1a1a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          zIndex: 1,
        }}
      >
        <Typography variant="subtitle1" sx={{ color: '#fff' }}>
          RDP Oturumu
        </Typography>
        <IconButton
          onClick={() => navigate('/assets')}
          sx={{ color: '#fff' }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Box
        ref={rdpContainerRef}
        sx={{
          position: 'absolute',
          top: 48,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#000',
        }}
      >
        {/* RDP görüntüleme alanı burada olacak */}
      </Box>
    </Box>
  );
};

export default RdpSession; 