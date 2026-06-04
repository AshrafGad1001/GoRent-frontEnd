'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { useAuth } from '../../hooks/useAuth';

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  const menuItems = [
    {
      title: 'الرئيسية',
      icon: <HomeOutlinedIcon />,
      href: '/dashboard/user',
    },
    {
      title: 'المحادثات',
      icon: <ChatBubbleOutlineOutlinedIcon />,
      href: '/dashboard/user/messages',
    },
    {
      title: 'الملف الشخصي',
      icon: <PersonOutlineOutlinedIcon />,
      href: '/dashboard/user/settings',
    },
    {
      title: 'عقاراتي',
      icon: <BusinessOutlinedIcon />,
      href: '/dashboard/user/properties',
    },
    {
      title: 'إدارة العقود',
      icon: <DescriptionOutlinedIcon />,
      href: '/dashboard/user/contracts',
    },
    {
      title: 'التقارير المالية',
      icon: <BarChartOutlinedIcon />,
      href: '/dashboard/user/reviews',
    },
  ];

  return (
    <Box
      sx={{
        width: 260,
        bgcolor: 'white',
        borderLeft: '1px solid',
        borderColor: 'grey.100',
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 70px)',
        position: 'sticky',
        top: 70,
        p: 2,
        boxSizing: 'border-box',
      }}
    >
      <List sx={{ flexGrow: 1, p: 0 }}>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <ListItemButton
              key={item.title}
              component={Link}
              href={item.href}
              sx={{
                borderRadius: 2.5,
                mb: 0.75,
                py: 1.25,
                px: 2,
                color: isActive ? 'primary.main' : 'text.secondary',
                bgcolor: isActive ? 'rgba(25, 118, 210, 0.06)' : 'transparent',
                '&:hover': {
                  bgcolor: isActive ? 'rgba(25, 118, 210, 0.08)' : 'grey.50',
                  color: isActive ? 'primary.main' : 'text.primary',
                },
                transition: 'all 0.2s ease',
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: isActive ? 'primary.main' : 'text.secondary',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography sx={{ fontWeight: isActive ? 700 : 500, fontSize: '0.95rem' }}>
                    {item.title}
                  </Typography>
                }
              />
            </ListItemButton>
          );
        })}
      </List>

      <Box sx={{ borderTop: '1px solid', borderColor: 'grey.100', pt: 2 }}>
        <ListItemButton
          onClick={logout}
          sx={{
            borderRadius: 2.5,
            py: 1.25,
            px: 2,
            color: 'error.main',
            '&:hover': {
              bgcolor: 'error.lighter',
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 40, color: 'error.main' }}>
            <ExitToAppOutlinedIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography sx={{ fontWeight: 600, fontSize: '0.95rem' }}>
                تسجيل الخروج
              </Typography>
            }
          />
        </ListItemButton>
      </Box>
    </Box>
  );
}
