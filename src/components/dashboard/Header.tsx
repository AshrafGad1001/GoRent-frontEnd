'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';

export default function Header() {
  const { user } = useAuth();

  return (
    <Box
      sx={{
        height: 70,
        bgcolor: 'white',
        borderBottom: '1px solid',
        borderColor: 'grey.100',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 4,
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Right Side: Logo */}
      <Box
        component={Link}
        href="/"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          textDecoration: 'none',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            color: '#1976d2',
            letterSpacing: -0.5,
          }}
        >
          goRent
        </Typography>
        <Box
          sx={{
            width: 32,
            height: 32,
            bgcolor: '#1976d2',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
          }}
        >
          <HomeIcon sx={{ fontSize: 20 }} />
        </Box>
      </Box>

      {/* Left Side: Profile and Notification */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        {/* Notification Bell */}
        <IconButton sx={{ bgcolor: 'grey.50', p: 1 }}>
          <Badge
            color="error"
            variant="dot"
            overlap="circular"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <NotificationsNoneOutlinedIcon sx={{ color: 'text.secondary' }} />
          </Badge>
        </IconButton>

        {/* Profile Card */}
        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar
              sx={{
                width: 42,
                height: 42,
                bgcolor: 'primary.main',
                fontSize: '1rem',
                fontWeight: 700,
              }}
            >
              {user.name ? user.name[0].toUpperCase() : 'U'}
            </Avatar>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, color: 'text.primary', lineHeight: 1.2 }}
              >
                {user.name}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', fontWeight: 500 }}
              >
                {user.role === 'owner' ? 'مالك' : 'مستأجر'}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
