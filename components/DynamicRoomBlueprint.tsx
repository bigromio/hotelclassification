import React from 'react';
import { motion } from 'framer-motion';
import { useStandards } from '../context/StandardsContext';
import { BedDouble, Bath, Tv } from 'lucide-react';

export const DynamicRoomBlueprint = () => {
  const { rating } = useStandards();

  // Logic for dimensions based on rating
  // 1-2 stars: Small (200x200 scale)
  // 3-4 stars: Medium (250x250 scale)
  // 5 stars: Large (300x300 scale)
  
  const getRoomSize = () => {
    if (rating <= 2) return 200;
    if (rating <= 4) return 250;
    return 300;
  };

  const size = getRoomSize();
  const roomColor = rating === 5 ? '#F4E5B0' : '#E5E7EB';
  const strokeColor = rating === 5 ? '#D4AF37' : '#374151';

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-lg border border-gray-100 transition-all duration-500">
      <h3 className="mb-4 text-lg font-bold text-shg-blue">
        {rating} {rating === 1 ? 'Star' : 'Stars'} Blueprint Configuration
      </h3>
      
      <div className="relative overflow-visible" style={{ width: 320, height: 320 }}>
         {/* SVG Container */}
        <svg width="320" height="320" viewBox="0 0 320 320" className="mx-auto overflow-visible">
          {/* Room Boundary */}
          <motion.rect
            x={(320 - size) / 2}
            y={(320 - size) / 2}
            width={size}
            height={size}
            fill={roomColor}
            stroke={strokeColor}
            strokeWidth="4"
            rx="8"
            initial={false}
            animate={{ 
              width: size, 
              height: size, 
              x: (320 - size) / 2, 
              y: (320 - size) / 2,
              fill: roomColor,
              stroke: strokeColor
            }}
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
          />
          
          {/* Bed */}
          <motion.g
             animate={{ 
               x: (320 - size) / 2 + 20, 
               y: (320 - size) / 2 + 20 
             }}
          >
             <rect width={rating >= 4 ? 100 : 80} height={rating >= 4 ? 120 : 100} fill="white" stroke="#374151" strokeWidth="2" rx="4" />
             <rect x="5" y="10" width={rating >= 4 ? 40 : 30} height="20" fill="#CBD5E1" rx="2" />
             <rect x={rating >= 4 ? 55 : 45} y="10" width={rating >= 4 ? 40 : 30} height="20" fill="#CBD5E1" rx="2" />
             {/* Blanket */}
             <rect x="0" y={rating >= 4 ? 50 : 40} width={rating >= 4 ? 100 : 80} height={rating >= 4 ? 70 : 60} fill={rating === 5 ? '#D4AF37' : '#94A3B8'} opacity="0.5" rx="2" />
          </motion.g>

          {/* Bathroom Area */}
          <motion.g
            animate={{
              x: (320 + size) / 2 - (rating >= 3 ? 90 : 70),
              y: (320 - size) / 2 + 10
            }}
          >
             <rect width={rating >= 3 ? 80 : 60} height={rating >= 3 ? 80 : 60} fill="white" stroke="#374151" strokeWidth="2" rx="4" />
             <text x="10" y="30" fontSize="10" fill="#666">Bath</text>
          </motion.g>

          {/* TV Area */}
          <motion.g
             animate={{
                x: (320 - size) / 2 + size - 20,
                y: (320 + size) / 2 - 80
             }}
          >
             <rect width="10" height={rating * 10 + 20} fill="#1F2937" />
          </motion.g>

          {/* Living Area (Only 4-5 stars) */}
          {rating >= 4 && (
             <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, x: (320 - size) / 2 + 20, y: (320 + size) / 2 - 80 }}
             >
                <circle r="15" fill="#E2E8F0" stroke="#475569" />
                <rect x="-20" y="-5" width="40" height="10" fill="#94A3B8" rx="2" />
             </motion.g>
          )}

          {/* Dimensions Label */}
          <motion.text
            x="160"
            y={315}
            textAnchor="middle"
            fontSize="12"
            fontWeight="bold"
            fill="#374151"
          >
            {rating === 5 ? '30m² (Luxury)' : rating >= 3 ? '22m² (Standard)' : '16m² (Budget)'}
          </motion.text>
        </svg>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-4 w-full text-center text-sm text-gray-600">
        <div className="flex flex-col items-center">
            <BedDouble className="w-5 h-5 mb-1 text-shg-blue" />
            <span>{rating >= 4 ? 'King Bed' : 'Queen Bed'}</span>
        </div>
        <div className="flex flex-col items-center">
            <Bath className="w-5 h-5 mb-1 text-shg-blue" />
            <span>{rating >= 5 ? 'Shower & Tub' : 'Shower Only'}</span>
        </div>
        <div className="flex flex-col items-center">
            <Tv className="w-5 h-5 mb-1 text-shg-blue" />
            <span>{rating >= 3 ? 'Smart TV' : 'Standard TV'}</span>
        </div>
      </div>
    </div>
  );
};
