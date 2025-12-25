import React from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import { useStandards } from '../context/StandardsContext';

export const ScorecardMatrix = () => {
  const { rating, language } = useStandards();

  // Mock score calculations based on rating
  const maxPoints = 500;
  const requiredPoints = rating * 100 - 50; // Simple algo: 1=50, 2=150, 3=250, 4=350, 5=450
  
  const data = [
    {
      name: language === 'ar' ? 'الحد الأقصى' : 'Maximum',
      uv: maxPoints,
      fill: '#e5e7eb',
    },
    {
      name: language === 'ar' ? 'المطلوب' : 'Required',
      uv: requiredPoints,
      fill: rating === 5 ? '#D4AF37' : '#0A192F',
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <h3 className="text-xl font-bold text-shg-blue mb-2 text-center">
        {language === 'ar' ? 'مصفوفة النقاط' : 'Score Matrix'}
      </h3>
      <div className="h-64 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart 
            cx="50%" 
            cy="50%" 
            innerRadius="30%" 
            outerRadius="90%" 
            barSize={20} 
            data={data}
            startAngle={180}
            endAngle={0}
          >
            <RadialBar
              label={{ position: 'insideStart', fill: '#fff' }}
              background
              dataKey="uv"
            />
            <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={{top: '50%', right: 0, transform: 'translate(0, -50%)'}} />
            <Tooltip />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-8 text-center">
            <div className="text-3xl font-bold text-shg-blue">{requiredPoints}</div>
            <div className="text-xs text-gray-500">{language === 'ar' ? 'نقاط' : 'Points'}</div>
        </div>
      </div>
      <p className="text-center text-sm text-gray-600 mt-4">
        {language === 'ar' 
          ? `لتحقيق تصنيف ${rating} نجوم، يجب تحقيق ${requiredPoints} نقطة كحد أدنى.`
          : `To achieve ${rating} stars, a minimum of ${requiredPoints} points is required.`}
      </p>
    </div>
  );
};
