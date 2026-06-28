"use client";

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Property } from '@/types/property';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';

// Fix Leaflet's default icon path issues with Next.js
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

interface PropertyMapProps {
  properties: Property[];
  searchCenter?: { lat: number; lng: number };
  searchRadius?: number; // in meters
  onMapClick?: (lat: number, lng: number, radius?: number) => void;
}

// A helper component to handle map clicks
function MapEvents({ onMapClick }: { onMapClick?: (lat: number, lng: number) => void }) {
  const map = useMap();

  useEffect(() => {
    if (!onMapClick) return;

    const handleClick = (e: L.LeafletMouseEvent) => {
      onMapClick(e.latlng.lat, e.latlng.lng);
    };

    map.on('click', handleClick);
    return () => {
      map.off('click', handleClick);
    };
  }, [map, onMapClick]);

  return null;
}

// A helper to recenter the map when searchCenter changes
function MapRecenter({ center }: { center?: { lat: number; lng: number } }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView([center.lat, center.lng], map.getZoom(), { animate: true });
    }
  }, [center, map]);

  return null;
}

export default function PropertyMap({ properties, searchCenter, searchRadius, onMapClick }: PropertyMapProps) {
  const theme = useTheme();
  // Default center
  const defaultCenter: [number, number] = [30.0444, 31.2357];

  const [searchQuery, setSearchQuery] = React.useState('');
  const [radiusInput, setRadiusInput] = React.useState(searchRadius || 5000);

  const handleSearchLocation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        if (onMapClick) {
          // Fake a map click to update the parent filters and center
          onMapClick(lat, lng, radiusInput);
        }
      } else {
        alert("تعذر العثور على الموقع");
      }
    } catch (err) {
      console.error("Geocoding failed", err);
    }
  };

  const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    setRadiusInput(val);
  };

  const applyRadius = () => {
    if (onMapClick && searchCenter) {
      onMapClick(searchCenter.lat, searchCenter.lng, radiusInput);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        minHeight: 500,
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: 8,
        border: '1px solid',
        borderColor: 'divider',
        zIndex: 0,
        position: 'relative',
      }}
    >
      {/* Overlay Controls */}
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          bgcolor: 'background.paper',
          borderRadius: 1,
          boxShadow: 8,
          p: 1.5,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2,
          alignItems: 'center',
          width: { xs: '90%', md: 'auto' },
        }}
      >
        <form onSubmit={handleSearchLocation} style={{ display: 'flex', gap: 8 }}>
          <TextField
            type="text"
            placeholder="ابحث عن موقع (مثل: القاهرة)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            sx={{ width: { xs: '100%', md: 256 } }}
          />
          <Button type="submit" variant="contained" size="small" sx={{ textTransform: 'none' }}>
            بحث
          </Button>
        </form>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            borderTop: { xs: '1px solid', md: 'none' },
            borderRight: { xs: 'none', md: '1px solid' },
            borderColor: 'divider',
            paddingTop: { xs: 1, md: 0 },
            paddingRight: { xs: 0, md: 2 },
            width: { xs: '100%', md: 'auto' },
          }}
        >
          <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', fontWeight: 500 }}>النطاق:</Typography>
          <input
            type="range"
            min="1000"
            max="50000"
            step="1000"
            value={radiusInput}
            onChange={handleRadiusChange}
            onMouseUp={applyRadius}
            onTouchEnd={applyRadius}
            className="w-24 md:w-32"
          />
          <Typography sx={{ fontSize: '0.75rem', fontWeight: 600 }}>{radiusInput / 1000} كم</Typography>
        </Box>
      </Box>

      <MapContainer
        center={searchCenter ? [searchCenter.lat, searchCenter.lng] : defaultCenter}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; Google Maps'
          url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=ar"
        />

        <MapEvents onMapClick={(lat, lng) => onMapClick && onMapClick(lat, lng, radiusInput)} />
        <MapRecenter center={searchCenter} />

        {searchCenter && searchRadius && (
          <Circle
            center={[searchCenter.lat, searchCenter.lng]}
            radius={searchRadius}
            pathOptions={{ color: theme.palette.info.main, fillColor: theme.palette.info.main, fillOpacity: 0.1 }}
          />
        )}

        {properties.map((property) => {
          if (!property.location?.coordinates || property.location.coordinates.length < 2) return null;
          // Note: GeoJSON uses [lng, lat], Leaflet uses [lat, lng]
          const [lng, lat] = property.location.coordinates;

          return (
            <Marker key={property._id} position={[lat, lng]} icon={icon}>
              <Popup>
                <div className="w-48">
                  {property.images && property.images.length > 0 && (
                    <div className="w-full h-24 relative mb-2 rounded-md overflow-hidden">
                      <Image
                        src={property.images[0]}
                        alt={property.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <h3 className="font-semibold text-gray-900 line-clamp-1">{property.title}</h3>
                  <p className="text-sm font-bold text-blue-600">{property.pricePerMonth} ج.م / شهر</p>
                  <p className="text-xs text-gray-500 capitalize">{property.type === 'APARTMENT' ? 'سكني' : property.type === 'SHOP' ? 'تجاري' : property.type}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </Box>
  );
}