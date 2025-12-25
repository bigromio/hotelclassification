import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { AppState, StandardsContextType, StandardsData, StarRating, Language, UnitMix } from '../types';
import { initialStandardsData } from '../data/standardsData';

const StandardsContext = createContext<StandardsContextType | undefined>(undefined);

export const StandardsProvider = ({ children }: { children?: ReactNode }) => {
  // State
  const [rating, setRating] = useState<StarRating>(3);
  const [language, setLanguage] = useState<Language>('ar');
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeChapter, setActiveChapter] = useState('hero');
  
  // Detailed Unit Mix
  const [unitMix, setUnitMix] = useState<UnitMix>({
    single: 0,
    double: 30,
    twin: 15,
    suite: 5,
    vip: 0
  });

  const totalUnits = useMemo(() => {
    return unitMix.single + unitMix.double + unitMix.twin + unitMix.suite + unitMix.vip;
  }, [unitMix]);
  
  // Data State
  const [data, setData] = useState<StandardsData>(() => {
    const saved = localStorage.getItem('shg_data_v3'); // Version 3
    return saved ? JSON.parse(saved) : initialStandardsData;
  });

  useEffect(() => {
    localStorage.setItem('shg_data_v3', JSON.stringify(data));
  }, [data]);

  const setAdminStatus = (status: boolean) => {
    setIsAdmin(status);
  };

  const toggleAdmin = () => {
    setIsAdmin(!isAdmin);
  };

  const updateDataItem = (category: keyof StandardsData, id: string, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      [category]: prev[category].map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const updateUnitMix = (key: keyof UnitMix, value: number) => {
    setUnitMix(prev => ({
      ...prev,
      [key]: Math.max(0, value)
    }));
  };

  return (
    <StandardsContext.Provider value={{
      rating,
      language,
      isAdmin,
      activeChapter,
      unitMix,
      totalUnits,
      data,
      setRating,
      setLanguage,
      toggleAdmin,
      setAdminStatus,
      setActiveChapter,
      updateDataItem,
      setUnitMix,
      updateUnitMix
    }}>
      {children}
    </StandardsContext.Provider>
  );
};

export const useStandards = () => {
  const context = useContext(StandardsContext);
  if (!context) {
    throw new Error('useStandards must be used within a StandardsProvider');
  }
  return context;
};
