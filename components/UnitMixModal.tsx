import React from 'react';
import { useStandards } from '../context/StandardsContext';
import { X, BedDouble, User, Crown, LayoutDashboard, Grid } from 'lucide-react';

interface UnitMixModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UnitMixModal: React.FC<UnitMixModalProps> = ({ isOpen, onClose }) => {
  const { unitMix, updateUnitMix, totalUnits, language } = useStandards();

  if (!isOpen) return null;

  const Row = ({ label, subLabel, icon: Icon, value, field }: any) => (
    <div className="flex items-center justify-between p-3 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-3">
        <div className="bg-blue-50 p-2 rounded-lg text-shg-blue">
          <Icon size={20} />
        </div>
        <div>
          <div className="font-bold text-gray-800">{label}</div>
          <div className="text-xs text-gray-500">{subLabel}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <input 
          type="number" 
          value={value}
          onChange={(e) => updateUnitMix(field, parseInt(e.target.value) || 0)}
          className="w-20 text-center border border-gray-300 rounded-md py-1.5 px-2 font-bold text-lg focus:ring-2 focus:ring-shg-gold outline-none"
        />
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="bg-shg-blue p-4 flex justify-between items-center text-white">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <LayoutDashboard size={20} />
            {language === 'ar' ? 'تكوين وحدات الفندق' : 'Hotel Unit Configuration'}
          </h3>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full transition">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4">
          <div className="mb-4 bg-yellow-50 p-3 rounded-lg text-sm text-yellow-800 border border-yellow-200">
            {language === 'ar' 
              ? 'تحدد هذه الأرقام كميات الأثاث والمعدات (BoQ) تلقائياً.'
              : 'These numbers automatically determine your Furniture & Equipment (BoQ) quantities.'}
          </div>

          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <Row 
              label={language === 'ar' ? 'غرفة مفردة' : 'Single Room'} 
              subLabel={language === 'ar' ? 'سرير واحد (90-120سم)' : '1 Single Bed'}
              icon={User} 
              value={unitMix.single} 
              field="single" 
            />
            <Row 
              label={language === 'ar' ? 'غرفة مزدوجة' : 'Double Room'} 
              subLabel={language === 'ar' ? 'سرير مزدوج (King/Queen)' : '1 Large Bed'}
              icon={BedDouble} 
              value={unitMix.double} 
              field="double" 
            />
            <Row 
              label={language === 'ar' ? 'غرفة توأم' : 'Twin Room'} 
              subLabel={language === 'ar' ? 'سريرين منفصلين' : '2 Single Beds'}
              icon={Grid} 
              value={unitMix.twin} 
              field="twin" 
            />
            <Row 
              label={language === 'ar' ? 'جناح' : 'Suite'} 
              subLabel={language === 'ar' ? 'غرفة وصالة' : 'Bedroom + Living'}
              icon={LayoutDashboard} 
              value={unitMix.suite} 
              field="suite" 
            />
            <Row 
              label={language === 'ar' ? 'غرفة VIP / تنفيذية' : 'VIP / Executive'} 
              subLabel={language === 'ar' ? 'مساحة أكبر + خدمات' : 'Larger + Amenities'}
              icon={Crown} 
              value={unitMix.vip} 
              field="vip" 
            />
          </div>

          <div className="mt-6 flex justify-between items-center bg-gray-50 p-4 rounded-xl">
             <span className="text-gray-500 font-medium">
               {language === 'ar' ? 'إجمالي عدد المفاتيح' : 'Total Keys'}
             </span>
             <span className="text-2xl font-bold text-shg-blue">{totalUnits}</span>
          </div>

          <button 
            onClick={onClose}
            className="w-full mt-4 bg-shg-gold text-shg-blue font-bold py-3 rounded-xl hover:bg-yellow-500 transition shadow-md"
          >
            {language === 'ar' ? 'حفظ وتحديث الكميات' : 'Save & Update Quantities'}
          </button>
        </div>
      </div>
    </div>
  );
};
