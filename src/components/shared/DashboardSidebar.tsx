'use client';

import React from 'react';
import {
  Box,
  Paper,
  Avatar,
  Typography,
  Divider,
  ButtonBase,
} from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

export interface DashboardNavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: React.ReactNode;
}

interface DashboardSidebarProps {
  user: { name: string; profileImage?: string };
  roleLabel: string;
  menuItems: DashboardNavItem[];
  onLogout: () => void;
}

export default function DashboardSidebar({
  user,
  roleLabel,
  menuItems,
  onLogout,
}: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0px 2px 12px rgba(0,0,0,0.06)',
      }}
    >
      {/* User Info — Desktop */}
      <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column', alignItems: 'center', p: 4 }}>
        <Avatar
          src={user.profileImage}
          sx={{ width: 100, height: 100, mb: 2, bgcolor: 'primary.main', fontSize: '2rem' }}
        >
          {user.name ? user.name[0].toUpperCase() : 'U'}
        </Avatar>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{user.name}</Typography>
        <Typography variant="body2" color="text.secondary">{roleLabel}</Typography>
      </Box>

      {/* User Info — Mobile */}
      <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1.5, px: 2, py: 1.5 }}>
        <Avatar src={user.profileImage} sx={{ width: 40, height: 40, bgcolor: 'primary.main', fontSize: '1rem', flexShrink: 0 }}>
          {user.name ? user.name[0].toUpperCase() : 'U'}
        </Avatar>
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 'bold', lineHeight: 1.2 }}>{user.name}</Typography>
          <Typography variant="caption" color="text.secondary">{roleLabel}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* Nav Items */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'row', md: 'column' },
          overflowX: { xs: 'auto', md: 'unset' },
          px: { xs: 1, md: 2 },
          py: { xs: 1, md: 2 },
          gap: 1,
          bgcolor: 'background.paper',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <ButtonBase
              key={item.id}
              component={Link}
              href={item.href}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                gap: { xs: 0.5, md: 1.5 },
                px: { xs: 1.5, md: 2 },
                py: { xs: 1, md: 1.2 },
                borderRadius: 2,
                flexShrink: 0,
                bgcolor: isActive ? 'primary.main' : 'transparent',
                color: isActive ? 'primary.contrastText' : 'text.primary',
                transition: 'all 0.2s ease',
                '&:hover': { bgcolor: isActive ? 'primary.dark' : 'action.hover' },
              }}
            >
              <Box
                sx={{
                  color: isActive ? 'primary.contrastText' : 'text.secondary',
                  display: 'flex',
                  '& svg': { fontSize: { xs: '18px', md: '22px' } },
                }}
              >
                {item.icon}
              </Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: isActive ? 700 : 500, fontSize: { xs: '0.7rem', md: '0.875rem' } }}
              >
                {item.label}
              </Typography>
              {item.badge && (
                <Box sx={{ ml: { xs: 0, md: 'auto' } }}>{item.badge}</Box>
              )}
            </ButtonBase>
          );
        })}
      </Box>

      <Divider />

      {/* Logout */}
      <Box sx={{ px: { xs: 1, md: 2 }, py: 1, bgcolor: 'background.paper' }}>
        <ButtonBase
          onClick={onLogout}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: { xs: 0.5, md: 1.5 },
            px: { xs: 1.5, md: 2 },
            py: { xs: 1, md: 1.2 },
            borderRadius: 2,
            width: '100%',
            color: 'error.main',
            '&:hover': { bgcolor: 'action.hover' },
          }}
        >
          <LogoutOutlinedIcon sx={{ fontSize: { xs: '18px', md: '22px' } }} />
          <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: '0.7rem', md: '0.875rem' } }}>
            خروج
          </Typography>
        </ButtonBase>
      </Box>
    </Paper>
  );
}
