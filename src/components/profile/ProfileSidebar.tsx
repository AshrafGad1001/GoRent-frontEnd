'use client';

import React from 'react';
import {
  Box,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider
} from '@mui/material';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { User } from '../../types/user';

export type TabType = 'profile' | 'bookings' | 'contracts' | 'messages' | 'reviews' | 'settings';

interface ProfileSidebarProps {
  user: User;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onLogout: () => void;
}

export default function ProfileSidebar({ user, activeTab, onTabChange, onLogout }: ProfileSidebarProps) {
  const menuItems = [
    { id: 'bookings', label: 'حجوزاتي', icon: <EventAvailableIcon /> },
    { id: 'contracts', label: 'عقودي', icon: <DescriptionOutlinedIcon /> },
    { id: 'messages', label: 'الرسائل', icon: <ChatBubbleOutlinedIcon /> },
    { id: 'reviews', label: 'التقييمات', icon: <StarOutlinedIcon /> },
    { id: 'settings', label: 'الإعدادات', icon: <SettingsOutlinedIcon /> },
  ];

  return (
    <Paper elevation={0} sx={{ borderRadius: 4, overflow: 'hidden', border: '1px solid #eaeaea' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4, bgcolor: '#ffffff' }}>
        <Box sx={{ position: 'relative' }}>
          <Avatar
            sx={{ width: 100, height: 100, mb: 2, bgcolor: 'primary.main', fontSize: '2rem' }}
          >
            {user.name ? user.name[0].toUpperCase() : 'U'}
          </Avatar>
          <Box
            sx={{
              position: 'absolute',
              bottom: 16,
              right: -4,
              bgcolor: '#fff',
              borderRadius: '50%',
              p: 0.5,
              boxShadow: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <CameraAltIcon color="primary" fontSize="small" />
          </Box>
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{user.name}</Typography>
        <Typography variant="body2" color="text.secondary">مستأجر</Typography>
      </Box>

      <List sx={{ px: 2, pb: 2, pt: 0, bgcolor: '#ffffff' }}>
        {menuItems.map((item) => (
          <ListItem disablePadding sx={{ mb: 1 }} key={item.id}>
            <ListItemButton
              selected={activeTab === item.id}
              onClick={() => onTabChange(item.id as TabType)}
              sx={{
                borderRadius: 2,
                '&.Mui-selected': { bgcolor: 'primary.main', color: '#fff' },
                '&.Mui-selected:hover': { bgcolor: 'primary.dark' }
              }}
            >
              <ListItemIcon sx={{ color: activeTab === item.id ? '#fff' : 'inherit', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}

        <Divider sx={{ my: 1 }} />

        <ListItem disablePadding>
          <ListItemButton onClick={onLogout}>
            <ListItemIcon sx={{ color: 'error.main', minWidth: 40 }}>
              <LogoutOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="تسجيل خروج" sx={{ color: 'error.main' }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Paper>
  );
}
