import React, { useState } from 'react';
import { useStandards } from '../context/StandardsContext';
import { StandardsData, StandardItem } from '../types';
import { Calculator, DollarSign, Package, ChevronDown, ChevronUp, Layers, Archive, Box } from 'lucide-react';

export const CostEstimator = () => {
  const { data, rating, unitCount, language } = useStandards();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Multiplier logic based on Star Rating (Higher stars = Higher quality/cost per item)
  const getQualityMultiplier = (r: number) => {
    switch (r) {
      case 1: return 1.0; // Base
      case 2: return 1.2;
      case 3: return 1.5;
      case 4: return 2.2;
      case 5: return 3.5; // Luxury materials are significantly more expensive
      default: return 1.0;
    }
  };

  const multiplier = getQualityMultiplier(rating);

  // Helper to extract numeric quantity from string (e.g., "4 sets" -> 4)
  const parseQuantityRule = (rule: string | number | boolean): number => {
    if (typeof rule === 'number') return rule;
    if (typeof rule === 'string') {
      const match = rule.match(/(\d+(\.\d+)?)/);
      if (match) return parseFloat(match[0]);
    }
    return 1; // Default to 1 if no number found
  };

  const calculateTotalQuantity = (item: StandardItem): number => {
    const rule = item.valueByStar[rating];
    const qtyPerUnit = parseQuantityRule(rule);
    
    // If text explicitly says "0", quantity is 0
    if (typeof rule === 'string' && (rule.startsWith('0') || rule === '-')) return 0;

    if (item.costType === 'per_room') {
      return qtyPerUnit * unitCount;
    } else if (item.costType === 'per_guest') {
      // Assuming avg 2 guests per unit for estimation
      return qtyPerUnit * unitCount * 2;
    } else {
      // Fixed cost (items usually 1 or small number, logic handled by baseCost scaling in cost calc, but for QTY display we use raw number)
      return qtyPerUnit; 
    }
  };

  const calculateItemTotalCost = (item: StandardItem) => {
    if (!item.hasCost || !item.baseCost) return 0;
    const itemCost = item.baseCost * multiplier;
    
    // Cost calculation logic (abstracted estimate)
    if (item.costType === 'per_room') {
      return itemCost * unitCount;
    } else if (item.costType === 'per_guest') {
      return itemCost * unitCount * 2;
    } else {
      // Fixed cost scaling slightly with size
      return itemCost * (1 + (unitCount / 100)); 
    }
  };

  const calculateCategoryTotal = (items: StandardItem[]) => {
    return items.reduce((total, item) => total + calculateItemTotalCost(item), 0);
  };

  const categories: {key: keyof StandardsData, labelAr: string, labelEn: string}[] = [
    { key: 'reception', labelAr: 'الاستقبال والبهو', labelEn: 'Reception & Lobby' },
    { key: 'room', labelAr: 'تجهيزات الغرف (FF&E/OS&E)', labelEn: 'Room Equipment' },
    { key: 'kitchen', labelAr: 'المطابخ والأواني', labelEn: 'Kitchens & Cutlery' },
    { key: 'bath', labelAr: 'الحمامات والمستلزمات', labelEn: 'Bath & Amenities' },
    { key: 'food_beverage', labelAr: 'الأغذية والمشروبات', labelEn: 'Food & Beverage' },
    { key: 'recreation', labelAr: 'الترفيه والصحة', labelEn: 'Recreation & Health' },
    { key: 'building', labelAr: 'تجهيزات المبنى والمصاعد', labelEn: 'Building & Elevators' },
    { key: 'safety', labelAr: 'الأنظمة والأمن', labelEn: 'Systems & Security' },
  ];

  const grandTotal = categories.reduce((sum, cat) => sum + calculateCategoryTotal(data[cat.key]), 0);

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
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-green-600">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-shg-blue flex items-center gap-2">
              <Calculator className="w-6 h-6 text-green-600" />
              {language === 'ar' ? 'جدول الكميات والتكاليف (BoQ)' : 'Bill of Quantities & Costs (BoQ)'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {language === 'ar' 
                ? 'حساب الكميات الدقيقة (الملاعق، المناشف، الأثاث) بناءً على عدد الوحدات ومعايير التصنيف.' 
                : 'Calculating exact quantities (Spoons, Towels, Furniture) based on unit count and classification standards.'}
            </p>
          </div>
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-bold text-xl">
             {rating} {language === 'ar' ? 'نجوم' : 'Stars'}
          </div>
        </div>
        
        {/* Dashboard Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
             <div className="text-xs text-green-600 uppercase font-bold mb-1">{language === 'ar' ? 'إجمالي التكلفة التقديرية' : 'Grand Total Est.'}</div>
             <div className="text-3xl font-bold text-green-800">{formatCurrency(grandTotal)}</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
             <div className="text-xs text-blue-600 uppercase font-bold mb-1">{language === 'ar' ? 'التكلفة لكل غرفة' : 'Cost Per Key'}</div>
             <div className="text-2xl font-bold text-blue-800">{formatCurrency(grandTotal / unitCount)}</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
             <div className="text-xs text-purple-600 uppercase font-bold mb-1">{language === 'ar' ? 'إجمالي الوحدات' : 'Total Units'}</div>
             <div className="text-2xl font-bold text-purple-800">{unitCount}</div>
          </div>
        </div>

        {/* Detailed List */}
        <div className="space-y-4">
          {categories.map((cat) => {
            const catItems = data[cat.key].filter(i => i.hasCost);
            const total = calculateCategoryTotal(catItems);
            
            // Allow showing category even if 0 cost if items exist (to show quantity 0)
            if (catItems.length === 0) return null;
            
            const isExpanded = expandedCategory === cat.key;

            return (
              <div key={cat.key} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                <button 
                  onClick={() => toggleCategory(cat.key)}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${isExpanded ? 'bg-shg-gold text-white' : 'bg-gray-200 text-gray-500'}`}>
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
                          <th className="text-right p-3 font-medium w-1/4">{language === 'ar' ? 'البند' : 'Item'}</th>
                          <th className="text-right p-3 font-medium w-1/4">{language === 'ar' ? 'المواصفات' : 'Specs'}</th>
                          <th className="text-center p-3 font-medium">{language === 'ar' ? 'قاعدة الحساب' : 'Basis'}</th>
                          <th className="text-center p-3 font-bold text-shg-blue">{language === 'ar' ? 'الكمية الإجمالية' : 'Total Qty'}</th>
                          <th className="text-right p-3 font-medium">{language === 'ar' ? 'التكلفة' : 'Cost'}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {catItems.map((item) => {
                          const spec = item.specsByStar ? item.specsByStar[rating] : null;
                          const specText = spec ? (language === 'ar' ? spec.ar : spec.en) : '-';
                          const totalQty = calculateTotalQuantity(item);
                          const quantityRule = item.valueByStar[rating];
                          
                          // Skip items with 0 quantity
                          if (totalQty === 0) return null;

                          return (
                            <tr key={item.id} className="border-b last:border-0 hover:bg-gray-50">
                              <td className="p-3 font-medium text-gray-800">
                                <div className="flex items-center gap-2">
                                   {item.itemType === 'ose' && <Box className="w-4 h-4 text-orange-400" />}
                                   {item.itemType === 'ffe' && <Package className="w-4 h-4 text-blue-400" />}
                                   {language === 'ar' ? item.titleAr : item.titleEn}
                                </div>
                              </td>
                              <td className="p-3 text-gray-600 text-xs">
                                {specText}
                              </td>
                              <td className="p-3 text-center text-xs text-gray-500">
                                <span className="bg-gray-100 px-2 py-1 rounded">
                                   {quantityRule}
                                </span>
                              </td>
                              <td className="p-3 text-center font-bold text-lg text-shg-blue bg-blue-50">
                                {totalQty.toLocaleString()}
                              </td>
                              <td className="p-3 text-right font-bold text-green-700">
                                {formatCurrency(calculateItemTotalCost(item))}
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
