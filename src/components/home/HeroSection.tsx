"use client";

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import FilterBar from './FilterBar';
import { PropertyFilters } from "@/types/property";

interface HeroSectionProps {
  filters: PropertyFilters;
  onFilterChange: (key: keyof PropertyFilters, value: unknown) => void;
  onSearch: () => void;
}

export default function HeroSection({ filters, onFilterChange, onSearch }: HeroSectionProps) {
  return (
    <Box
      className="relative w-full min-h-[600px] flex flex-col items-center justify-center bg-cover bg-center py-16"
      sx={{ backgroundImage: 'url("/hero-section.jpg")' }}
    >
      {/* Multi-stop gradient overlay for a professional, deep look */}
      <Box
        sx={(theme) => ({
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(
              to bottom,
              ${alpha('#000000', 0.5)} 0%,
              ${alpha(theme.palette.primary.main, 0.6)} 45%,
              ${alpha(theme.palette.primary.dark, 0.9)} 100%
            )
          `,
        })}
      />

      <Box className="relative z-10 flex flex-col items-center w-full max-w-6xl px-4 text-center mt-12 gap-10">
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
            fontWeight: 800,
            color: '#FFFFFF', 
            lineHeight: 1.2,
            textShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          }}
        >
          تصفح العقارات بكل سهولة
        </Typography>

        <FilterBar
          filters={filters}
          onFilterChange={onFilterChange}
          onSearch={onSearch}
        />
      </Box>
    </Box>
  );
}