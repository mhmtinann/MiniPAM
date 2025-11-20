import React, { useState, useEffect } from 'react';
import {
  Box, Paper, Typography, Button, Snackbar, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TextField, Dialog, DialogTitle, DialogContent, DialogActions,
  Select, MenuItem, FormControl, InputLabel, CircularProgress
} from '@mui/material';
import SshTerminal from '../components/SshTerminal';
import RdpConnection from '../components/RdpConnection';
import assetService from '../services/assetService';

export default function Assets() {
  const [assets, setAssets] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newAsset, setNewAsset] = useState({ 
    hostname: '', ipAddress: '', port: 22,
    username: '', password: '', description: '',
    connectionType: 'SSH'
  });
  const [selectedAsset, setSelectedAsset] = useState(null);

  useEffect(() => {
    loadAssets();
  }, []);

  const loadAssets = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await assetService.getAllAssets();
      setAssets(data);
    } catch (error) {
      console.error('Error loading assets:', error);
      setError('Sunucular yüklenirken bir hata oluştu');
      showSnackbar('Sunucular yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (message) => {
    setSnackbar({ open: true, message });
  };

  const handleAddAsset = async () => {
    try {
      await assetService.createAsset(newAsset);
      showSnackbar('Sunucu başarıyla eklendi');
      setNewAsset({ 
        hostname: '', ipAddress: '', port: 22,
        username: '', password: '', description: '',
        connectionType: 'SSH'
      });
      setOpen(false);
      loadAssets();
    } catch (error) {
      console.error('Error adding asset:', error);
      showSnackbar('Sunucu eklenirken hata oluştu');
    }
  };

  const handleDeleteAsset = async (id) => {
    try {
      await assetService.deleteAsset(id);
      showSnackbar('Sunucu başarıyla silindi');
      loadAssets();
    } catch (error) {
      console.error('Error deleting asset:', error);
      showSnackbar('Sunucu silinirken hata oluştu');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">{error}</Typography>
        <Button onClick={loadAssets} sx={{ mt: 2 }}>Tekrar Dene</Button>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" sx={{ color: '#fff' }}>Assets</Typography>
        <Button variant="contained" sx={{ background: '#7c3aed' }} onClick={() => setOpen(true)}>
          + CREATE NEW
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ background: '#262a3b' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#fff' }}>Name</TableCell>
              <TableCell sx={{ color: '#fff' }}>IP</TableCell>
              <TableCell sx={{ color: '#fff' }}>Username</TableCell>
              <TableCell sx={{ color: '#fff' }}>Port</TableCell>
              <TableCell sx={{ color: '#fff' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assets.map((asset) => (
              <TableRow key={asset.id}>
                <TableCell sx={{ color: '#fff' }}>{asset.hostname}</TableCell>
                <TableCell sx={{ color: '#fff' }}>{asset.ipAddress}</TableCell>
                <TableCell sx={{ color: '#fff' }}>{asset.username}</TableCell>
                <TableCell sx={{ color: '#fff' }}>{asset.port}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => setSelectedAsset(asset)}
                    sx={{ mr: 1 }}
                  >
                    Bağlan
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteAsset(asset.id)}
                  >
                    Sil
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ open: false, message: '' })}
        message={snackbar.message}
      />

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Yeni Sunucu Ekle</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField label="Hostname" value={newAsset.hostname} onChange={e => setNewAsset({ ...newAsset, hostname: e.target.value })} />
          <TextField label="IP Address" value={newAsset.ipAddress} onChange={e => setNewAsset({ ...newAsset, ipAddress: e.target.value })} />
          <TextField label="Username" value={newAsset.username} onChange={e => setNewAsset({ ...newAsset, username: e.target.value })} />
          <TextField label="Password" type="password" value={newAsset.password} onChange={e => setNewAsset({ ...newAsset, password: e.target.value })} />
          <TextField label="Port" type="number" value={newAsset.port} onChange={e => setNewAsset({ ...newAsset, port: Number(e.target.value) })} />
          <FormControl fullWidth>
            <InputLabel>Connection Type</InputLabel>
            <Select
              value={newAsset.connectionType}
              label="Connection Type"
              onChange={e => setNewAsset({ ...newAsset, connectionType: e.target.value })}
            >
              <MenuItem value="SSH">SSH</MenuItem>
              <MenuItem value="RDP">RDP</MenuItem>
            </Select>
          </FormControl>
          <TextField label="Description" value={newAsset.description} onChange={e => setNewAsset({ ...newAsset, description: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>İptal</Button>
          <Button onClick={handleAddAsset} variant="contained">Ekle</Button>
        </DialogActions>
      </Dialog>

      {selectedAsset && (
        <Dialog open={true} onClose={() => setSelectedAsset(null)} maxWidth="md" fullWidth>
          <DialogTitle>
            {selectedAsset.connectionType === 'SSH' ? 'SSH Terminal' : 'RDP Connection'} - {selectedAsset.hostname}
          </DialogTitle>
          <DialogContent>
            {selectedAsset.connectionType === 'SSH' ? (
              <SshTerminal
                wsUrl="ws://localhost:8080/ws/ssh"
                sshInfo={{
                  ip: selectedAsset.ipAddress,
                  port: selectedAsset.port,
                  username: selectedAsset.username,
                  password: selectedAsset.password
                }}
              />
            ) : (
              <RdpConnection asset={selectedAsset} />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelectedAsset(null)}>Kapat</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}
