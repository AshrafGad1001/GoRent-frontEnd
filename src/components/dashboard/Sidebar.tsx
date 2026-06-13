'use client';

import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <Box sx={{ width: 250, display: { xs: 'none', md: 'block' }, flexShrink: 0 }}>
      <Paper elevation={0} sx={{ height: '100%', borderRadius: 0, borderLeft: '1px solid #e0e0e0' }}>
        <List sx={{ pt: 2 }}>
          <ListItem disablePadding>
            <ListItemButton component={Link} href="/dashboard/user">
              <ListItemIcon><DashboardIcon color="primary" /></ListItemIcon>
              <ListItemText primary="لوحة التحكم" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} href="/Profile">
              <ListItemIcon><ReceiptIcon color="primary" /></ListItemIcon>
              <ListItemText primary="عقودي" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} href="/Profile">
              <ListItemIcon><PersonIcon color="primary" /></ListItemIcon>
              <ListItemText primary="الملف الشخصي" />
            </ListItemButton>
          </ListItem>
          
          <Box sx={{ mt: 4 }}>
            <ListItem disablePadding>
              <ListItemButton onClick={logout} sx={{ color: 'error.main' }}>
                <ListItemIcon sx={{ color: 'error.main' }}><LogoutIcon /></ListItemIcon>
                <ListItemText primary="تسجيل الخروج" />
              </ListItemButton>
            </ListItem>
          </Box>
        </List>
      </Paper>
    </Box>
  );
}
