'use client';

import React, { useState } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Property } from '@/types/property';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface PropertyHeroProps {
  property: Property;
}

export default function PropertyHero({ property }: PropertyHeroProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = property.images && property.images.length > 0
    ? property.images
    : ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=2000&q=80'];

  // Translate type to Arabic
  const propertyTypeMap: Record<string, string> = {
    'SHOP': 'تجاري',
    'APARTMENT': 'شقة',
  };
  const typeAr = propertyTypeMap[property.type] || property.type;

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.default', pt: 6 }}>
      <Box sx={{ maxWidth: 1152, mx: 'auto', px: { xs: 2, md: 3 } }}>

        {/* Header / Top Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Button
            startIcon={<ArrowForwardIcon />}
            onClick={() => router.back()}
            sx={{
              bgcolor: 'background.paper',
              color: 'text.primary',
              borderColor: 'divider',
              px: 2,
              py: 1,
              borderRadius: 1,
              boxShadow: 1,
              '&:hover': { bgcolor: 'background.paper', color: 'text.primary' }
            }}
            variant="outlined"
          >
            عودة
          </Button>
          <Box
            sx={{
              bgcolor: 'info.light',
              color: 'info.dark',
              border: '1px solid',
              borderColor: 'info.light',
              px: 2,
              py: 0.75,
              borderRadius: '50px',
              fontSize: '0.875rem',
              fontWeight: 'bold',
            }}
          >
            {typeAr}
          </Box>
        </Box>

        {/* Title & Price Section */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'flex-start', md: 'flex-end' }, justifyContent: 'space-between', gap: 2, mb: 4 }}>
          <Box>
            <Typography variant="h3" sx={{ color: 'text.primary', mb: 0.5, fontSize: { xs: '2rem', md: '2.5rem' } }}>
              {property.title}
            </Typography>
            {property.location?.coordinates?.length >= 2 && (
              <Typography sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 0.5, fontWeight: 500 }}>
                <LocationOnIcon sx={{ fontSize: 20 }} />
                إحداثيات الموقع: {property.location.coordinates[0]}, {property.location.coordinates[1]}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              p: 2,
              borderRadius: 2,
              boxShadow: 1,
              minWidth: 200,
              textAlign: 'start',
            }}
          >
            <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem', mb: 0.5, textTransform: 'uppercase', fontWeight: 600 }}>
              الإيجار الشهري
            </Typography>
            <Typography sx={{ color: 'info.main', fontSize: '1.875rem', fontWeight: 'bold' }}>
              {property.pricePerMonth.toLocaleString()}{' '}
              <Typography component="span" sx={{ fontSize: '1.25rem', color: 'text.secondary', fontWeight: 500 }}>
                ج.م
              </Typography>
            </Typography>
          </Box>
        </Box>

        {/* Main Image Carousel */}
        <Box
          className="group"
          sx={{
            position: 'relative',
            width: '100%',
            aspectRatio: { xs: '4/3', md: '21/9' },
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: 8,
            bgcolor: 'background.default',
          }}
        >
          <Image
            src={images[currentIndex]}
            alt={`${property.title} - Image ${currentIndex + 1}`}
            fill
            className="object-cover transition-opacity duration-300"
            priority
          />

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              {/* Left Arrow (Visually Next in RTL) */}
              <Box
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                sx={{
                  position: 'absolute',
                  left: 16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                  color: 'text.primary',
                  p: 1.5,
                  borderRadius: '50%',
                  boxShadow: 4,
                  backdropFilter: 'blur(4px)',
                  opacity: { xs: 1, md: 0 },
                  transition: 'opacity 0.2s',
                  cursor: 'pointer',
                  '.group:hover &': { opacity: 1 },
                  '&:hover': { bgcolor: '#ffffff' },
                  zIndex: 10,
                }}
              >
                <ArrowForwardIosIcon sx={{ fontSize: 20 }} />
              </Box>

              {/* Right Arrow (Visually Prev in RTL) */}
              <Box
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                sx={{
                  position: 'absolute',
                  right: 16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                  color: 'text.primary',
                  p: 1.5,
                  borderRadius: '50%',
                  boxShadow: 4,
                  backdropFilter: 'blur(4px)',
                  opacity: { xs: 1, md: 0 },
                  transition: 'opacity 0.2s',
                  cursor: 'pointer',
                  '.group:hover &': { opacity: 1 },
                  '&:hover': { bgcolor: '#ffffff' },
                  zIndex: 10,
                }}
              >
                <ArrowBackIosNewIcon sx={{ fontSize: 20 }} />
              </Box>

              {/* Dots */}
              <Box sx={{ position: 'absolute', bottom: 24, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 1, zIndex: 10 }}>
                {images.map((_, idx) => (
                  <Box
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    sx={{
                      height: 10,
                      borderRadius: '50px',
                      transition: 'all 0.3s',
                      boxShadow: 2,
                      cursor: 'pointer',
                      width: idx === currentIndex ? 32 : 10,
                      bgcolor: idx === currentIndex ? 'secondary.main' : 'rgba(161, 161, 170, 0.8)',
                      '&:hover': { bgcolor: idx === currentIndex ? 'secondary.main' : '#ffffff' },
                    }}
                  />
                ))}
              </Box>
            </>
          )}
        </Box>

        {/* Thumbnails below */}
        {images.length > 1 && (
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              mt: 3,
              overflowX: 'auto',
              pb: 2,
              scrollbarWidth: 'none',
              '&::-webkitScrollbar': { display: 'none' },
            }}
          >
            {images.map((img, idx) => (
              <Box
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                sx={{
                  position: 'relative',
                  width: 112,
                  height: 112,
                  flexShrink: 0,
                  borderRadius: 2,
                  overflow: 'hidden',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                  opacity: idx === currentIndex ? 1 : 0.7,
                  outline: idx === currentIndex ? '3px solid' : 'none',
                  outlineColor: 'secondary.light',
                  outlineOffset: 2,
                  border: idx === currentIndex ? 'none' : '1px solid',
                  borderColor: 'divider',
                  '&:hover': { opacity: 1 },
                }}
              >
                <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
              </Box>
            ))}
          </Box>
        )}

      </Box>
    </Box>
  );
}