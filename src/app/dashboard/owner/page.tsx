'use client';

import React from 'react';
import { Box, Typography, Paper, Grid, Button } from '@mui/material';
import { useAuth } from '../../../hooks/useAuth';

export default function OwnerDashboardOverview() {
  const { user } = useAuth();

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        مرحباً بك، {user?.name}
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Stats Cards */}
        <Grid size={{ xs: 12, sm: 4 }}>
          <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2, border: '1px solid #eaeaea', boxShadow: 'none' }}>
            <Typography variant="h6" color="text.secondary">إجمالي العقارات</Typography>
            <Typography variant="h3" color="primary" sx={{ mt: 1, fontWeight: 'bold' }}>0</Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2, border: '1px solid #eaeaea', boxShadow: 'none' }}>
            <Typography variant="h6" color="text.secondary">العقارات المؤجرة</Typography>
            <Typography variant="h3" color="success.main" sx={{ mt: 1, fontWeight: 'bold' }}>0</Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2, border: '1px solid #eaeaea', boxShadow: 'none' }}>
            <Typography variant="h6" color="text.secondary">الطلبات الجديدة</Typography>
            <Typography variant="h3" color="warning.main" sx={{ mt: 1, fontWeight: 'bold' }}>0</Typography>
          </Paper>
        </Grid>

        {/* Action Area */}
        <Grid size={12} sx={{ mt: 4 }}>
          <Paper sx={{ p: 4, borderRadius: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #eaeaea', boxShadow: 'none' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              إدارة العقارات الخاصة بك
            </Typography>
            <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 3 }}>
              من هنا يمكنك إضافة عقارات جديدة، تتبع حالة العقارات الحالية، ومراجعة عقود الإيجار الخاصة بك.
            </Typography>
            <Button variant="contained" size="large" sx={{ px: 4, py: 1.5, borderRadius: 2 }}>
              إضافة عقار جديد
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
