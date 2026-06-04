'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import RegisterForm from '../../../components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <Container maxWidth="sm" sx={{ py: { xs: 4, sm: 8 } }}>
      <Fade in timeout={600}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 4,
            border: '1px solid',
            borderColor: 'grey.200',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #2e7d32, #66bb6a)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2.5,
                boxShadow: '0 8px 24px rgba(46,125,50,0.3)',
              }}
            >
              <HowToRegOutlinedIcon sx={{ color: '#fff', fontSize: 32 }} />
            </Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(135deg, #2e7d32, #1b5e20)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
              gutterBottom
            >
              إنشاء حساب جديد
            </Typography>
            <Typography variant="body1" color="text.secondary">
              انضم إلى GoRent وابدأ في استكشاف وإدارة العقارات
            </Typography>
          </Box>

          {/* Form Component */}
          <RegisterForm />
        </Paper>
      </Fade>
    </Container>
  );
}