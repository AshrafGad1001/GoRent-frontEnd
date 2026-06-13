'use client';

import React from 'react';
import { AppBar, Toolbar, Typography, Avatar, Box, Button } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import Link from 'next/link';

export default function Header() {
  const { user } = useAuth();

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar>
        <Typography 
          variant="h6" 
          component={Link} 
          href="/" 
          sx={{ flexGrow: 1, fontWeight: 'bold', color: 'primary.main', textDecoration: 'none' }}
        >
          GoRent
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body1" sx={{ display: { xs: 'none', sm: 'block' } }}>
            {user?.name}
          </Typography>
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            {user?.name ? user.name[0].toUpperCase() : 'U'}
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
