import React, { useState } from 'react';
import { useStandards } from '../context/StandardsContext';
import { StandardsData, StandardItem, CalculationRule } from '../types';
import { Calculator, ChevronDown, ChevronUp, Package, Box, Warehouse, LayoutTemplate, Coffee, Utensils, ChefHat, BedDouble, Bath } from 'lucide-react';

export const CostEstimator = () => {
  const { data, rating, unitMix, totalUnits, language } = useStandards();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Multiplier logic based on Star Rating
  const getQualityMultiplier = (r: number) => {
    switch (r) {
      case 1: return 1.0; 
      case 2: return 1.1;
      case 3: return 1.3;
      case 4: return 1.8; 
      case 5: return 2.5;
      default: return 1.0;
    }
  };

  const multiplier = getQualityMultiplier(rating);

  const calculateQuantity = (item: StandardItem): number => {
    const ruleValue = item.valueByStar[rating];
    if (typeof ruleValue === 'string' && (ruleValue === '0' || ruleValue === '-' || ruleValue === '')) {
      return 0;
    }

    let perItemBase = 1;
    if (typeof ruleValue === 'number') perItemBase = ruleValue;
    if (typeof ruleValue === 'string') {
        const match = ruleValue.match(/(\d+(\.\d+)?)/);
        if (match) {
          perItemBase = parseFloat(match[0]);
        }
    }

    const rule: CalculationRule = item.calcRule || 'per_unit';

    switch (rule) {
      case 'fixed': return perItemBase; 
      case 'per_unit': return totalUnits * perItemBase;
      case 'per_standard_room': return (unitMix.single + unitMix.double + unitMix.twin) * perItemBase;
      case 'per_single_bed': return (unitMix.single + (unitMix.twin * 2)) * perItemBase;
      case 'per_king_bed': return (unitMix.double + unitMix.suite + unitMix.vip) * perItemBase;
      case 'per_guest_capacity': return (unitMix.single + (unitMix.double * 2) + (unitMix.twin * 2) + (unitMix.suite * 2) + (unitMix.vip * 2)) * perItemBase;
      case 'per_suite_vip': return (unitMix.suite + unitMix.vip) * perItemBase;
      case 'per_bathroom': return (totalUnits + unitMix.vip) * perItemBase;
      case 'per_staff': return Math.max(1, Math.ceil(totalUnits / 15)) * perItemBase;
      default: return totalUnits * perItemBase;
    }
  };

  const calculateItemCost = (item: StandardItem, quantity: number) => {
    if (!item.hasCost || !item.baseCost) return 0;
    return item.baseCost * multiplier * quantity;
  };

  // Define strictly separated sections
  const sections = [
    { 
      id: 'central_kitchen', 
      labelAr: 'المطبخ المركزي (معدات تجارية)', 
      labelEn: 'Central Kitchen (Commercial)', 
      sourceCat: 'kitchen', 
      filterSub: 'central_kitchen',
      icon: ChefHat,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    { 
      id: 'restaurant', 
      labelAr: 'المطعم الرئيسي (أثاث وتشغيل)', 
      labelEn: 'Main Restaurant (FF&E)', 
      sourceCat: 'food_beverage', 
      filterSub: 'restaurant',
      icon: Utensils,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    { 
      id: 'coffee_shop', 
      labelAr: 'الكوفي شوب (معدات وثلاجات)', 
      labelEn: 'Coffee Shop Equipment', 
      sourceCat: 'food_beverage', // Also check reception if needed
      filterSub: 'coffee_shop',
      icon: Coffee,
      color: 'text-amber-700',
      bgColor: 'bg-amber-50'
    },
    { 
      id: 'room_service', 
      labelAr: 'خدمة الغرف (عربات وصواني)', 
      labelEn: 'Room Service', 
      sourceCat: 'food_beverage', 
      filterSub: 'room_service',
      icon: LayoutTemplate,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
    },
    { 
      id: 'unit_kitchen', 
      labelAr: 'مطابخ الغرف والأجنحة', 
      labelEn: 'In-Unit Kitchenettes', 
      sourceCat: 'kitchen', 
      filterSub: 'unit_kitchen',
      icon: Box,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    { 
      id: 'bedroom', 
      labelAr: 'تجهيزات غرف النوم', 
      labelEn: 'Bedroom FF&E', 
      sourceCat: 'room', 
      filterSub: 'bedroom', // We need to ensure room items have subCategory, or fallback
      fallback: true, // Special flag to catch general room items
      icon: BedDouble,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    { 
      id: 'bathroom', 
      labelAr: 'الحمامات', 
      labelEn: 'Bathrooms', 
      sourceCat: 'bath', 
      filterSub: 'unit_bath',
      fallback: true,
      icon: Bath,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50'
    },
    // Add other generic sections
    { id: 'reception', labelAr: 'الاستقبال', labelEn: 'Reception', sourceCat: 'reception', fallback: true, icon: Warehouse },
    { id: 'recreation', labelAr: 'الترفيه', labelEn: 'Recreation', sourceCat: 'recreation', fallback: true, icon: Warehouse },
    { id: 'services', labelAr: 'الخدمات', labelEn: 'Services', sourceCat: 'services', fallback: true, icon: Warehouse },
  ];

  // Helper to fetch items based on section definition
  const getItemsForSection = (section: any) => {
    const sourceItems = data[section.sourceCat as keyof StandardsData] || [];
    
    if (section.filterSub) {
      const filtered = sourceItems.filter(item => item.subCategory === section.filterSub);
      // If fallback is true and filtered is empty, maybe return all? No, strictly follow filter if exists.
      // But for 'bedroom', I updated data to have subCategory.
      
      // Special case: if I want to catch items that might have missed the tag but belong to category
      if (filtered.length === 0 && section.fallback) {
         // return sourceItems; // Use with caution
         // Better: Filter items that DON'T have a specific conflicting subCategory
         return sourceItems.filter(i => !['central_kitchen', 'unit_kitchen', 'restaurant', 'coffee_shop', 'room_service'].includes(i.subCategory || ''));
      }
      return filtered;
    }
    
    // Default: return all in category
    return sourceItems;
  };

  // Calculate totals
  let grandTotal = 0;
  const sectionTotals: Record<string, number> = {};

  sections.forEach(sec => {
    const items = getItemsForSection(sec);
    let secSum = 0;
    items.forEach(item => {
      if (item.hasCost) {
        const qty = calculateQuantity(item);
        secSum += calculateItemCost(item, qty);
      }
    });
    sectionTotals[sec.id] = secSum;
    grandTotal += secSum;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: 'SAR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-shg-gold">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-shg-blue flex items-center gap-2">
              <Calculator className="w-6 h-6 text-shg-gold" />
              {language === 'ar' ? 'المقدر المالي التفصيلي' : 'Detailed Cost Estimator'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {language === 'ar' 
                ? 'تم فصل الأصول المركزية (المطابخ والمطاعم) عن أصول الوحدات السكنية بدقة.' 
                : 'Strict separation between Central Assets (Kitchens, Restaurants) and Unit Assets.'}
            </p>
          </div>
          <div className="flex gap-2 text-sm bg-gray-100 p-2 rounded-lg">
             <div className="px-2 border-r border-gray-300">
                <span className="block text-xs text-gray-500">{language === 'ar' ? 'إجمالي الغرف' : 'Total Units'}</span>
                <span className="font-bold">{totalUnits}</span>
             </div>
             <div className="px-2">
                <span className="block text-xs text-gray-500">{language === 'ar' ? 'الأجنحة' : 'Suites'}</span>
                <span className="font-bold">{unitMix.suite + unitMix.vip}</span>
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
        </div>

        {/* Detailed List */}
        <div className="space-y-4">
          {sections.map((sec) => {
            const secItems = getItemsForSection(sec).filter(i => i.hasCost);
            const total = sectionTotals[sec.id];
            
            if (secItems.length === 0) return null;
            
            const isExpanded = expandedSection === sec.id;
            const Icon = sec.icon || Package;

            return (
              <div key={sec.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm transition-all duration-300">
                <button 
                  onClick={() => toggleSection(sec.id)}
                  className={`w-full flex items-center justify-between p-4 transition-colors ${sec.bgColor || 'bg-gray-50'} hover:opacity-90`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full bg-white shadow-sm ${sec.color || 'text-gray-600'}`}>
                      {<Icon size={20} />}
                    </div>
                    <span className="font-bold text-gray-800 text-lg">
                      {language === 'ar' ? sec.labelAr : sec.labelEn}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="font-bold text-gray-700">
                        {formatCurrency(total)}
                     </div>
                     <div className={`text-gray-400 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                       <ChevronDown size={20} />
                     </div>
                  </div>
                </button>
                
                {isExpanded && (
                  <div className="p-4 overflow-x-auto bg-white border-t border-gray-100">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-gray-500 border-b bg-gray-50">
                          <th className="text-right p-3 font-medium w-1/3">{language === 'ar' ? 'البند والمواصفات' : 'Item & Specs'}</th>
                          <th className="text-center p-3 font-medium">{language === 'ar' ? 'نوع الأصل' : 'Asset Type'}</th>
                          <th className="text-center p-3 font-bold text-shg-blue">{language === 'ar' ? 'الكمية' : 'Qty'}</th>
                          <th className="text-right p-3 font-medium">{language === 'ar' ? 'سعر الوحدة' : 'Unit Price'}</th>
                          <th className="text-right p-3 font-medium">{language === 'ar' ? 'الإجمالي' : 'Total'}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {secItems.map((item) => {
                          const spec = item.specsByStar ? item.specsByStar[rating] : null;
                          const specText = spec ? (language === 'ar' ? spec.ar : spec.en) : '-';
                          const totalQty = calculateQuantity(item);
                          const unitPrice = (item.baseCost || 0) * multiplier;
                          const totalCost = unitPrice * totalQty;

                          if (totalQty === 0) return null;

                          // Translate Rule
                          let ruleLabel = item.calcRule;
                          let isCentral = item.calcRule === 'fixed';
                          
                          if (language === 'ar') {
                            const map: Record<string, string> = {
                              'fixed': 'أصل مركزي ثابت',
                              'per_unit': 'لكل وحدة',
                              'per_standard_room': 'غرف قياسية',
                              'per_single_bed': 'لكل سرير',
                              'per_king_bed': 'لكل سرير',
                              'per_guest_capacity': 'لكل ضيف',
                              'per_suite_vip': 'أجنحة فقط',
                              'per_staff': 'تشغيلي',
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
                              <td className="p-3 text-center">
                                <span className={`px-2 py-1 rounded text-xs flex items-center justify-center gap-1 mx-auto w-fit ${isCentral ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>
                                  {isCentral ? <Warehouse size={12} /> : <LayoutTemplate size={12} />}
                                  {ruleLabel}
                                </span>
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