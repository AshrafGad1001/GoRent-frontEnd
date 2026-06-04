'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LoginForm from '../../../components/auth/LoginForm';

export default function LoginPage() {
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
                background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2.5,
                boxShadow: '0 8px 24px rgba(25,118,210,0.3)',
              }}
            >
              <LoginOutlinedIcon sx={{ color: '#fff', fontSize: 32 }} />
            </Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(135deg, #1976d2, #1565c0)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
              gutterBottom
            >
              تسجيل الدخول
            </Typography>
            <Typography variant="body1" color="text.secondary">
              مرحباً بك مجدداً في GoRent
            </Typography>
          </Box>

          {/* Form Component */}
          <LoginForm />
        </Paper>
      </Fade>
    </Container>
  );
}