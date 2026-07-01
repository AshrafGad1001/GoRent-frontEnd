import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import PropertyReviews from '@/components/property/PropertyReviews';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export default function ReviewsTab() {
  const currentUser = useSelector((state: RootState) => state.auth.user);

  if (!currentUser) {
    return null;
  }

  return (
    <Paper elevation={0} sx={{ p: { xs: 2, md: 4 }, borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
        التقييمات الخاصة بي
      </Typography>
      <PropertyReviews targetUserId={currentUser._id} />
    </Paper>
  );
}