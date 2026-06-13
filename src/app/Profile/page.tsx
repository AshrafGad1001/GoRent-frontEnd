'use client';

import React, { useState } from 'react';
import { Box, Container, Grid, Typography, Paper } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import ProfileSidebar, { TabType } from '../../components/profile/ProfileSidebar';
import ProfileContent from '../../components/profile/ProfileContent';

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('profile');

  if (!isAuthenticated || !user) {
    return (
      <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
        <Typography variant="h5" align="center">يرجى تسجيل الدخول لعرض هذه الصفحة</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: '#f5f7fa', minHeight: 'calc(100vh - 64px)', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 3.5 }}>
            <ProfileSidebar 
              user={user} 
              activeTab={activeTab} 
              onTabChange={setActiveTab} 
              onLogout={logout} 
            />
          </Grid>
          <Grid size={{ xs: 12, md: 8.5 }}>
            <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, minHeight: '100%', border: '1px solid #eaeaea' }}>
              <ProfileContent user={user} activeTab={activeTab} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
