import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Chip,
  Rating,
} from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import BedIcon from '@mui/icons-material/KingBedOutlined';
import BathtubIcon from '@mui/icons-material/BathtubOutlined';
import SquareFootIcon from '@mui/icons-material/SquareFootOutlined';
import StorefrontIcon from '@mui/icons-material/StorefrontOutlined';
import { PropertyCardProps } from '../../types/property';
import { reviewService } from '@/services/review';

function PropertyRating({ propertyId, ownerId }: { propertyId: string, ownerId: string }) {
  const [rating, setRating] = useState<number | null>(null);
  const [reviewCount, setReviewCount] = useState<number>(0);

  useEffect(() => {
    // Fetch reviews by propertyId (targetType: PROPERTY)
    reviewService.fetchReviews({ propertyId, targetType: 'PROPERTY' })
      .then(data => {
        if (data.reviews && data.reviews.length > 0) {
          const sum = data.reviews.reduce((acc, rev) => acc + rev.rating, 0);
          setRating(sum / data.reviews.length);
          setReviewCount(data.reviews.length);
        } else {
          setRating(0);
          setReviewCount(0);
        }
      })
      .catch(err => {
        console.error("Failed to fetch reviews for card", err);
      });
  }, [propertyId, ownerId]);

  if (rating === null) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Typography variant="body2" color="text.secondary">جاري التحميل...</Typography>
      </Box>
    );
  }

  if (rating === 0) {
    return (
      <Typography variant="body2" color="text.secondary">لا توجد تقييمات</Typography>
    );
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, direction: 'ltr' }}>
      <Rating
        value={Math.round(rating)}
        precision={1}
        readOnly
        size="small"
      />
      <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
        {rating.toFixed(1)}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
        ({reviewCount})
      </Typography>
    </Box>
  );
}

export default function PropertyCard({ property }: PropertyCardProps) {
  // Use a placeholder if images array is empty
  const imageUrl = property.images && property.images.length > 0
    ? property.images[0]
    : "/no-image-available.jpeg";

  const isApartment = property.type === 'APARTMENT';
  const bedrooms = property.specifications.apartment?.bedrooms;
  const bathrooms = property.specifications.apartment?.bathrooms;
  const footTrafficTier = property.specifications.shop?.footTrafficTier;

  const typeLabel = property.type === 'APARTMENT'
    ? 'شقة'
    : property.type === 'SHOP'
      ? 'محل تجاري'
      : property.type;

  return (
    <Link href={`/properties/${property._id}`} style={{ textDecoration: 'none', height: '100%', display: 'block' }}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.paper',
          borderRadius: 2,
          position: 'relative',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: 1,
          border: '1px solid',
          borderColor: 'divider',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-6px)',
            boxShadow: 6,
            '& .property-image': {
              transform: 'scale(1.08)',
            }
          },
        }}
      >
        <Box sx={{ position: 'relative', height: 220, width: '100%', overflow: 'hidden' }}>
          <Image
            src={imageUrl}
            alt={property.title}
            fill
            className="property-image object-cover"
            style={{ transition: 'transform 0.5s ease', filter: 'brightness(0.95)' }}
          />

          {/* Bottom Gradient Overlay for better text readability */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '50%',
              background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />

          {/* Featured Chip */}
          <Chip
            label="مميز"
            size="small"
            sx={{
              position: 'absolute',
              top: 16,
              left: 16,
              bgcolor: 'secondary.main',
              color: 'secondary.contrastText',
              fontWeight: 'bold',
              fontSize: '0.7rem',
              letterSpacing: 1,
              borderRadius: 1,
              height: 24,
              zIndex: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}
          />

          {/* Price Overlay — text stays white intentionally: it sits on top
              of the property photo, not on the theme background, so it must
              stay readable regardless of light/dark mode. */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 16,
              left: 16,
              display: 'flex',
              alignItems: 'baseline',
              color: 'white',
              textShadow: '0px 2px 4px rgba(0,0,0,0.5)',
              zIndex: 2,
            }}
          >
            <Typography variant="h5" component="span" sx={{ fontWeight: 'bold' }}>
              {property.pricePerMonth}
            </Typography>
            <Typography variant="body2" component="span" sx={{ ml: 0.5, mr: 0.5 }}>
              ج.م/شهر
            </Typography>
          </Box>

          {/* Owner Avatar */}
          <Avatar
            sx={{
              position: 'absolute',
              bottom: 12,
              right: 16,
              border: '3px solid white',
              width: 40,
              height: 40,
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              zIndex: 2,
              bgcolor: 'primary.main',
            }}
            alt={property.ownerId.name}
            src="/user-default.jpg"
          >
            {property.ownerId.name.charAt(0)}
          </Avatar>
        </Box>

        <CardContent sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
            <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 700, fontSize: '1.1rem', lineHeight: 1.3, flex: 1 }}>
              {property.title}
            </Typography>
            <Chip
              label={typeLabel}
              size="small"
              variant="outlined"
              sx={{
                height: 24,
                fontSize: '0.7rem',
                borderColor: 'divider',
                color: 'text.secondary',
                fontWeight: 600,
                flexShrink: 0,
                ml: 1
              }}
            />
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {property.description}
          </Typography>

          {/* Amenities as Premium Pills */}
          <Box sx={{ display: 'flex', gap: 1, mb: 'auto', flexWrap: 'wrap' }}>
            {isApartment ? (
              <>
                {bedrooms != null && (
                  <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'action.hover', px: 1.5, py: 0.5, borderRadius: 1, gap: 0.5, color: 'text.secondary' }}>
                    <BedIcon fontSize="small" sx={{ fontSize: 18 }} />
                    <Typography variant="body2" sx={{ fontSize: '0.8rem', fontWeight: 500 }}>{bedrooms} غرف</Typography>
                  </Box>
                )}
                {bathrooms != null && (
                  <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'action.hover', px: 1.5, py: 0.5, borderRadius: 1, gap: 0.5, color: 'text.secondary' }}>
                    <BathtubIcon fontSize="small" sx={{ fontSize: 18 }} />
                    <Typography variant="body2" sx={{ fontSize: '0.8rem', fontWeight: 500 }}>{bathrooms} حمام</Typography>
                  </Box>
                )}
              </>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'action.hover', px: 1.5, py: 0.5, borderRadius: 1, gap: 0.5, color: 'text.secondary' }}>
                <StorefrontIcon fontSize="small" sx={{ fontSize: 18 }} />
                <Typography variant="body2" sx={{ fontSize: '0.8rem', fontWeight: 500 }}>
                  {footTrafficTier ? `حركة عملاء: ${footTrafficTier}` : 'مساحة تجارية'}
                </Typography>
              </Box>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'action.hover', px: 1.5, py: 0.5, borderRadius: 1, gap: 0.5, color: 'text.secondary' }}>
              <SquareFootIcon fontSize="small" sx={{ fontSize: 18 }} />
              <Typography variant="body2" sx={{ fontSize: '0.8rem', fontWeight: 500 }}>{property.squareFootage} م²</Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2.5, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
            <PropertyRating propertyId={property._id} ownerId={property.ownerId._id} />
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
}