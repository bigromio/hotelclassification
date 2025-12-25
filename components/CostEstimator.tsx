import React, { useState } from 'react';
import { useStandards } from '../context/StandardsContext';
import { StandardsData, StandardItem, CalculationRule } from '../types';
import { Calculator, ChevronDown, ChevronUp, Package, Box, AlertCircle } from 'lucide-react';

export const CostEstimator = () => {
  const { data, rating, unitMix, totalUnits, language } = useStandards();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Multiplier logic based on Star Rating
  const getQualityMultiplier = (r: number) => {
    switch (r) {
      case 1: return 1.0; 
      case 2: return 1.2;
      case 3: return 1.5;
      case 4: return 2.5; 
      case 5: return 4.0; // Significant jump for luxury
      default: return 1.0;
    }
  };

  const multiplier = getQualityMultiplier(rating);

  // --- CORE LOGIC: The Brain of the BoQ ---
  const calculateQuantity = (item: StandardItem): number => {
    // 1. Check if item is excluded for this star rating (value is '0' or '-')
    const ruleValue = item.valueByStar[rating];
    if (typeof ruleValue === 'string' && (ruleValue === '0' || ruleValue === '-' || ruleValue === '')) {
      return 0;
    }

    // 2. Determine base multiplier from the text (e.g., "2 sets" -> 2)
    let perItemBase = 1;
    if (typeof ruleValue === 'number') perItemBase = ruleValue;
    if (typeof ruleValue === 'string') {
        const match = ruleValue.match(/(\d+(\.\d+)?)/);
        if (match) perItemBase = parseFloat(match[0]);
    }

    // 3. Apply Calculation Rule
    const rule: CalculationRule = item.calcRule || 'per_unit';

    switch (rule) {
      case 'fixed':
        return perItemBase; // e.g., 1 Signage Package for the whole hotel

      case 'per_unit':
        return totalUnits * perItemBase; // e.g., Door locks

      case 'per_single_bed':
        // Needed for Single Rooms (1) and Twin Rooms (2)
        return (unitMix.single + (unitMix.twin * 2)) * perItemBase;

      case 'per_king_bed':
        // Needed for Double, Suite, VIP
        return (unitMix.double + unitMix.suite + unitMix.vip) * perItemBase;

      case 'per_guest_capacity':
        // Assume: Single(1), Double(2), Twin(2), Suite(2), VIP(2)
        const totalCapacity = unitMix.single + (unitMix.double * 2) + (unitMix.twin * 2) + (unitMix.suite * 2) + (unitMix.vip * 2);
        return totalCapacity * perItemBase;

      case 'per_suite_vip':
        return (unitMix.suite + unitMix.vip) * perItemBase;

      case 'per_bathroom':
        // Assume Suites have 1.5 or 2 baths? Lets assume 1 per unit for now, plus extra for suites if specified
        // Simplified: 1 per unit
        return totalUnits * perItemBase;

      case 'per_staff':
        // Rough estimate: 0.5 staff per room for 3 star, 1.5 for 5 star
        const staffRatio = rating <= 3 ? 0.5 : 1.2;
        return Math.ceil(totalUnits * staffRatio) * perItemBase;

      default:
        return totalUnits * perItemBase;
    }
  };

  const calculateItemCost = (item: StandardItem, quantity: number) => {
    if (!item.hasCost || !item.baseCost) return 0;
    return item.baseCost * multiplier * quantity;
  };

  const categories: {key: keyof StandardsData, labelAr: string, labelEn: string}[] = [
    { key: 'reception', labelAr: 'الاستقبال والبهو', labelEn: 'Reception & Lobby' },
    { key: 'room', labelAr: 'تجهيزات الغرف (FF&E)', labelEn: 'Room FF&E' },
    { key: 'kitchen', labelAr: 'تجهيزات المطابخ', labelEn: 'Kitchen Equipment' },
    { key: 'bath', labelAr: 'الحمامات', labelEn: 'Bathrooms' },
    { key: 'services', labelAr: 'التدبير الفندقي والخدمات', labelEn: 'Housekeeping & Services' },
    { key: 'safety', labelAr: 'الأمن والسلامة', labelEn: 'Safety & Security' },
    { key: 'building', labelAr: 'تجهيزات المبنى', labelEn: 'Building Specs' },
    { key: 'food_beverage', labelAr: 'المطاعم', labelEn: 'F&B Outlets' },
    { key: 'recreation', labelAr: 'الترفيه', labelEn: 'Recreation' },
  ];

  // Calculate totals
  let grandTotal = 0;
  const categoryTotals: Record<string, number> = {};

  categories.forEach(cat => {
    const items = data[cat.key] || [];
    let catSum = 0;
    items.forEach(item => {
      if (item.hasCost) {
        const qty = calculateQuantity(item);
        catSum += calculateItemCost(item, qty);
      }
    });
    categoryTotals[cat.key] = catSum;
    grandTotal += catSum;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: 'SAR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const toggleCategory = (key: string) => {
    setExpandedCategory(expandedCategory === key ? null : key);
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-shg-gold">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-shg-blue flex items-center gap-2">
              <Calculator className="w-6 h-6 text-shg-gold" />
              {language === 'ar' ? 'جدول الكميات الذكي (Smart BoQ)' : 'Smart BoQ Engine'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {language === 'ar' 
                ? 'يتم حساب الكميات بناءً على مزيج الغرف (مفرد، مزدوج، أجنحة) ومعايير التصنيف.' 
                : 'Quantities calculated based on Unit Mix (Single, Double, Suites) and Classification Standards.'}
            </p>
          </div>
          <div className="flex gap-2 text-sm bg-gray-100 p-2 rounded-lg">
             <div className="px-2 border-r border-gray-300">
                <span className="block text-xs text-gray-500">{language === 'ar' ? 'إجمالي الغرف' : 'Total Units'}</span>
                <span className="font-bold">{totalUnits}</span>
             </div>
             <div className="px-2 border-r border-gray-300">
                <span className="block text-xs text-gray-500">{language === 'ar' ? 'الأسرة المفردة' : 'Single Beds'}</span>
                <span className="font-bold">{unitMix.single + (unitMix.twin * 2)}</span>
             </div>
             <div className="px-2">
                <span className="block text-xs text-gray-500">{language === 'ar' ? 'الأسرة المزدوجة' : 'King Beds'}</span>
                <span className="font-bold">{unitMix.double + unitMix.suite + unitMix.vip}</span>
             </div>
          </div>
        </div>
        
        {/* Dashboard Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-shg-blue text-white p-4 rounded-lg shadow-md">
             <div className="text-xs text-shg-gold uppercase font-bold mb-1">{language === 'ar' ? 'إجمالي التكلفة التقديرية' : 'Grand Total Est.'}</div>
             <div className="text-2xl font-bold">{formatCurrency(grandTotal)}</div>
          </div>
          <div className="bg-white border border-gray-200 p-4 rounded-lg">
             <div className="text-xs text-gray-500 uppercase font-bold mb-1">{language === 'ar' ? 'متوسط تكلفة الغرفة' : 'Avg Cost Per Key'}</div>
             <div className="text-xl font-bold text-gray-800">{formatCurrency(totalUnits > 0 ? grandTotal / totalUnits : 0)}</div>
          </div>
           {/* FF&E vs OS&E summary could go here */}
        </div>

        {/* Detailed List */}
        <div className="space-y-4">
          {categories.map((cat) => {
            const catItems = (data[cat.key] || []).filter(i => i.hasCost);
            const total = categoryTotals[cat.key];
            
            if (catItems.length === 0) return null;
            
            const isExpanded = expandedCategory === cat.key;

            return (
              <div key={cat.key} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm transition-all duration-300">
                <button 
                  onClick={() => toggleCategory(cat.key)}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full transition-colors ${isExpanded ? 'bg-shg-blue text-white' : 'bg-gray-200 text-gray-500'}`}>
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                    <span className="font-bold text-gray-800 text-lg">
                      {language === 'ar' ? cat.labelAr : cat.labelEn}
                    </span>
                  </div>
                  <div className="font-bold text-green-700">
                    {formatCurrency(total)}
                  </div>
                </button>
                
                {isExpanded && (
                  <div className="p-4 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-gray-500 border-b bg-gray-50">
                          <th className="text-right p-3 font-medium w-1/3">{language === 'ar' ? 'البند والمواصفات' : 'Item & Specs'}</th>
                          <th className="text-center p-3 font-medium">{language === 'ar' ? 'قاعدة الحساب' : 'Logic'}</th>
                          <th className="text-center p-3 font-bold text-shg-blue">{language === 'ar' ? 'الكمية' : 'Qty'}</th>
                          <th className="text-right p-3 font-medium">{language === 'ar' ? 'سعر الوحدة' : 'Unit Price'}</th>
                          <th className="text-right p-3 font-medium">{language === 'ar' ? 'الإجمالي' : 'Total'}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {catItems.map((item) => {
                          const spec = item.specsByStar ? item.specsByStar[rating] : null;
                          const specText = spec ? (language === 'ar' ? spec.ar : spec.en) : '-';
                          const totalQty = calculateQuantity(item);
                          const unitPrice = (item.baseCost || 0) * multiplier;
                          const totalCost = unitPrice * totalQty;

                          if (totalQty === 0) return null;

                          // Translate Rule
                          let ruleLabel = item.calcRule;
                          if (language === 'ar') {
                            const map: Record<string, string> = {
                              'fixed': 'ثابت',
                              'per_unit': 'لكل وحدة',
                              'per_single_bed': 'لكل سرير مفرد',
                              'per_king_bed': 'لكل سرير مزدوج',
                              'per_guest_capacity': 'لكل ضيف',
                              'per_suite_vip': 'أجنحة فقط',
                              'per_staff': 'لكل موظف',
                              'per_bathroom': 'لكل حمام'
                            };
                            ruleLabel = map[item.calcRule || 'per_unit'] || item.calcRule;
                          }

                          return (
                            <tr key={item.id} className="border-b last:border-0 hover:bg-gray-50">
                              <td className="p-3">
                                <div className="font-bold text-gray-800 flex items-center gap-2">
                                   {item.itemType === 'ose' ? <Box className="w-3 h-3 text-orange-400"/> : <Package className="w-3 h-3 text-blue-400"/>}
                                   {language === 'ar' ? item.titleAr : item.titleEn}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">{specText}</div>
                              </td>
                              <td className="p-3 text-center text-xs text-gray-400">
                                <span className="bg-gray-100 px-2 py-1 rounded">{ruleLabel}</span>
                              </td>
                              <td className="p-3 text-center font-bold text-shg-blue text-base">
                                {totalQty.toLocaleString()}
                              </td>
                              <td className="p-3 text-right text-gray-600">
                                {formatCurrency(unitPrice)}
                              </td>
                              <td className="p-3 text-right font-bold text-green-700">
                                {formatCurrency(totalCost)}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
