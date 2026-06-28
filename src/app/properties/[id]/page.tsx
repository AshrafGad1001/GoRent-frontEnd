"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { propertyService } from '@/services/property';
import { Property } from '@/types/property';
import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import PropertyHero from '@/components/property/PropertyHero';
import PropertyFeatures from '@/components/property/PropertyFeatures';
import PropertyContact from '@/components/property/PropertyContact';
import PropertyReviews from '@/components/property/PropertyReviews';

const PropertyMap = dynamic(() => import("@/components/home/PropertyMap"), { ssr: false });

export default function PropertyDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      propertyService.fetchPropertyById(id)
        .then((data) => {
          setProperty(data.property);
        })
        .catch((err) => {
          console.error("Failed to fetch property details", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', bgcolor: 'background.default' }}>
        <CircularProgress size={48} />
      </Box>
    );
  }

  if (!property) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          bgcolor: 'background.default',
          gap: 3,
        }}
      >
        <Box
          sx={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            bgcolor: (theme) => theme.palette.mode === 'light' ? 'rgba(220, 38, 38, 0.08)' : 'rgba(248, 113, 113, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed',
            borderColor: 'error.main',
            mb: 2,
          }}
        >
          <MapOutlinedIcon sx={{ fontSize: 40, color: 'error.main', opacity: 0.7 }} />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          العقار غير موجود
        </Typography>
        <Button
          variant="contained"
          startIcon={<ArrowForwardIcon />}
          onClick={() => router.push('/')}
          sx={{ px: 4, py: 1.5, borderRadius: 1.5 }}
        >
          العودة للرئيسية
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 10 }}>
      {/* Header Image Section */}
      <PropertyHero property={property} />

      {/* Main Content */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 3 }, mt: 6 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 6 }}>

          {/* Right Column: Details (RTL so flex: 2 is on the right) */}
          <Box sx={{ width: '100%', flex: { lg: 2 } }}>

            {/* Key Features Bar */}
            <PropertyFeatures property={property} />

            {/* Description */}
            <Box sx={{ mb: 6 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 2 }}>
                حول هذا العقار
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  lineHeight: 1.8,
                  whiteSpace: 'pre-line',
                }}
              >
                {property.description}
              </Typography>
            </Box>

            {/* Map */}
            <Box sx={{ mb: 6 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 2 }}>
                الموقع
              </Typography>
              {property.location?.coordinates?.length >= 2 ? (
                <Box sx={{ height: 400, width: '100%', borderRadius: 2, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
                  <PropertyMap
                    properties={[property]}
                    searchCenter={{ lat: property.location.coordinates[1], lng: property.location.coordinates[0] }}
                  />
                </Box>
              ) : (
                <Box
                  sx={{
                    bgcolor: 'background.default',
                    p: 4,
                    borderRadius: 2,
                    textAlign: 'center',
                    color: 'text.secondary',
                    border: '1px dashed',
                    borderColor: 'divider',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <MapOutlinedIcon sx={{ fontSize: 40, opacity: 0.4 }} />
                  <Typography>موقع الخريطة غير متوفر.</Typography>
                </Box>
              )}
            </Box>

            {/* Reviews */}
            <Box>
              <PropertyReviews propertyId={property._id} />
            </Box>

          </Box>

          {/* Left Column: Sidebar Contact */}
          <Box sx={{ width: '100%', flex: { lg: 1 } }}>
            <PropertyContact property={property} />
          </Box>

        </Box>
      </Box>
    </Box>
  );
}