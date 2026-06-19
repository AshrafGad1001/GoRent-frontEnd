import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Property } from '@/types/property';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface PropertyHeroProps {
  property: Property;
}

export default function PropertyHero({ property }: PropertyHeroProps) {
  const router = useRouter();
  const imageUrl = property.images && property.images.length > 0
    ? property.images[0]
    : 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=2000&q=80';

  // Translate type to Arabic
  const propertyTypeMap: Record<string, string> = {
    'RESIDENTIAL': 'سكني',
    'COMMERCIAL': 'تجاري',
    'APARTMENT': 'شقة',
    'VILLA': 'فيلا',
    'HOUSE': 'منزل',
  };
  const typeAr = propertyTypeMap[property.type] || property.type;

  return (
    <div className="relative w-full h-[50vh] min-h-[400px]">
      <Image 
        src={imageUrl} 
        alt={property.title} 
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      
      <button 
        onClick={() => router.back()}
        className="absolute top-6 right-6 bg-white/20 hover:bg-white/40 backdrop-blur-md transition-colors text-white p-2 rounded-full"
      >
        <ArrowBackIcon sx={{ transform: 'scaleX(-1)' }} />
      </button>

      <div className="absolute bottom-8 right-0 w-full">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-3 inline-block">
                {typeAr}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{property.title}</h1>
              {property.location?.coordinates?.length >= 2 && (
                <p className="text-zinc-200 flex items-center gap-1">
                  <LocationOnIcon fontSize="small" /> 
                  إحداثيات الموقع: {property.location.coordinates[0]}, {property.location.coordinates[1]}
                </p>
              )}
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl">
              <p className="text-zinc-300 text-sm mb-1 uppercase tracking-wider font-semibold">الإيجار الشهري</p>
              <p className="text-4xl font-bold text-white">{property.pricePerMonth.toLocaleString()} ج.م</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
