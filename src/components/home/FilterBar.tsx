"use client";

import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { PropertyFilters } from "@/types/property";
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import PaymentsIcon from '@mui/icons-material/Payments';

interface FilterBarProps {
  filters: PropertyFilters;
  onFilterChange: (key: keyof PropertyFilters, value: unknown) => void;
  onSearch: () => void;
}

// Small reusable wrapper so every filter "cell" shares the same label +
// icon + spacing layout without repeating it per field.
function FilterField({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: { xs: 1, md: 2 }, py: 1, width: '100%' }}>
      <Box sx={{ color: 'text.secondary', display: 'flex' }}>{icon}</Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
          {label}
        </Typography>
        {children}
      </Box>
    </Box>
  );
}

export default function FilterBar({ filters, onFilterChange, onSearch }: FilterBarProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 5,
        p: { xs: 2, md: 2.5 },
        width: '100%',
        maxWidth: '900px',
        boxShadow: (theme) =>
          theme.palette.mode === 'light'
            ? '0 10px 40px rgba(15, 23, 42, 0.18)'
            : '0 10px 40px rgba(0, 0, 0, 0.5)',
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
        }}
      >
        <FilterField icon={<HomeIcon fontSize="small" />} label="نوع العقار">
          <Select
            value={filters.type || ''}
            onChange={(e) => onFilterChange('type', e.target.value)}
            variant="standard"
            disableUnderline
            fullWidth
            sx={{ fontSize: '0.9rem', fontWeight: 500, color: 'text.primary' }}
          >
            <MenuItem value="">أي نوع</MenuItem>
            <MenuItem value="APARTMENT">شقة</MenuItem>
            <MenuItem value="COMMERCIAL">محل تجاري</MenuItem>
          </Select>
        </FilterField>

        <Divider orientation="vertical" flexItem sx={{ mx: 1, height: '70%' }} />

        <FilterField icon={<PaymentsIcon fontSize="small" />} label="نطاق السعر">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
            <InputBase
              type="number"
              placeholder="الأدنى"
              inputProps={{ min: 0 }}
              value={filters.minPrice ?? ''}
              onChange={(e) => {
                const raw = e.target.value;
                if (raw === '') {
                  onFilterChange('minPrice', undefined);
                  return;
                }
                const num = Math.max(0, Number(raw));
                onFilterChange('minPrice', num);
              }}
              sx={{
                fontSize: '0.9rem',
                fontWeight: 500,
                width: '50%',
                // Hide the native up/down spinner arrows on number inputs
                '& input[type=number]': { MozAppearance: 'textfield' },
                '& input[type=number]::-webkit-outer-spin-button': {
                  WebkitAppearance: 'none',
                  margin: 0,
                },
                '& input[type=number]::-webkit-inner-spin-button': {
                  WebkitAppearance: 'none',
                  margin: 0,
                },
              }}
            />
            <Typography color="text.disabled">-</Typography>
            <InputBase
              type="number"
              placeholder="الأقصى"
              inputProps={{ min: 0 }}
              value={filters.maxPrice ?? ''}
              onChange={(e) => {
                const raw = e.target.value;
                if (raw === '') {
                  onFilterChange('maxPrice', undefined);
                  return;
                }
                const num = Math.max(0, Number(raw));
                onFilterChange('maxPrice', num);
              }}
              sx={{
                fontSize: '0.9rem',
                fontWeight: 500,
                width: '50%',
                '& input[type=number]': { MozAppearance: 'textfield' },
                '& input[type=number]::-webkit-outer-spin-button': {
                  WebkitAppearance: 'none',
                  margin: 0,
                },
                '& input[type=number]::-webkit-inner-spin-button': {
                  WebkitAppearance: 'none',
                  margin: 0,
                },
              }}
            />
          </Box>
        </FilterField>
      </Box>

      <Divider sx={{ my: 1.5 }} />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: { xs: 1, md: 2 } }}>
        <Button
          onClick={onSearch}
          variant="contained"
          color="primary"
          startIcon={<SearchIcon fontSize="small" />}
          sx={{
            width: { xs: '100%', sm: 'auto' },
            borderRadius: 10,
            px: 4,
            py: 1.2,
            fontWeight: 600,
          }}
        >
          البحث عن عقارات
        </Button>
      </Box>
    </Paper>
  );
}