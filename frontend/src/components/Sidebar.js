import React from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StorageIcon from '@mui/icons-material/Storage';
import GroupIcon from '@mui/icons-material/Group';
import PolicyIcon from '@mui/icons-material/Policy';
import ListAltIcon from '@mui/icons-material/ListAlt';
import TerminalIcon from '@mui/icons-material/Terminal';
import FolderIcon from '@mui/icons-material/Folder';
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Assets', icon: <StorageIcon />, path: '/assets' },
    { text: 'Audit Logs', icon: <HistoryIcon />, path: '/audit-logs' },
    { text: 'Session Logs', icon: <ListAltIcon />, path: '/session-logs' },
    { text: 'Command Logs', icon: <TerminalIcon />, path: '/command-logs' },
    { text: 'File Transfer Logs', icon: <FolderIcon />, path: '/file-transfer-logs' },
  ];

  // Admin-only menu items
  const adminMenuItems = [
    { text: 'Accounts', icon: <GroupIcon />, path: '/accounts' },
    { text: 'Policies', icon: <PolicyIcon />, path: '/policies' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 220,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 220,
          boxSizing: 'border-box',
          background: '#23263a',
          color: '#fff',
        },
      }}
    >
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              background: location.pathname === item.path ? '#282c3f' : 'inherit',
              color: location.pathname === item.path ? '#7c3aed' : '#fff',
            }}
          >
            <ListItemIcon sx={{ color: location.pathname === item.path ? '#7c3aed' : '#8f93b2' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}

        {isAdmin() && (
          <>
            <Divider sx={{ my: 2, borderColor: '#404040' }} />
            {adminMenuItems.map((item) => (
              <ListItemButton
                key={item.text}
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  background: location.pathname === item.path ? '#282c3f' : 'inherit',
                  color: location.pathname === item.path ? '#7c3aed' : '#fff',
                }}
              >
                <ListItemIcon sx={{ color: location.pathname === item.path ? '#7c3aed' : '#8f93b2' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            ))}
          </>
        )}

        <Divider sx={{ my: 2, borderColor: '#404040' }} />
        <ListItemButton
          onClick={handleLogout}
          sx={{
            color: '#ff4444',
            '&:hover': {
              background: 'rgba(255, 68, 68, 0.1)',
            },
          }}
        >
          <ListItemIcon sx={{ color: '#ff4444' }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;