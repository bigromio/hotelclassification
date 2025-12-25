import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppState, StandardsContextType, StandardsData, StarRating, Language } from '../types';
import { initialStandardsData } from '../data/standardsData';

const StandardsContext = createContext<StandardsContextType | undefined>(undefined);

export const StandardsProvider = ({ children }: { children?: ReactNode }) => {
  // State
  const [rating, setRating] = useState<StarRating>(3); // Default 3 stars
  const [language, setLanguage] = useState<Language>('ar');
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeChapter, setActiveChapter] = useState('hero');
  const [unitCount, setUnitCount] = useState(50); // Default 50 units
  
  // Data State (Persistence simulation)
  const [data, setData] = useState<StandardsData>(() => {
    const saved = localStorage.getItem('shg_data_v2'); // Versioned to force update with new data structure
    return saved ? JSON.parse(saved) : initialStandardsData;
  });

  // Persist data on change
  useEffect(() => {
    localStorage.setItem('shg_data_v2', JSON.stringify(data));
  }, [data]);

  const setAdminStatus = (status: boolean) => {
    setIsAdmin(status);
  };

  const toggleAdmin = () => {
    if (isAdmin) {
      setIsAdmin(false);
    } else {
      // In a real app, this would be a modal. Here we just set logic to trigger modal in UI
      // Handled by UI component usually, but basic toggle here
      setIsAdmin(!isAdmin);
    }
  };

  const updateDataItem = (category: keyof StandardsData, id: string, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      [category]: prev[category].map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  return (
    <StandardsContext.Provider value={{
      rating,
      language,
      isAdmin,
      activeChapter,
      unitCount,
      data,
      setRating,
      setLanguage,
      toggleAdmin,
      setAdminStatus,
      setActiveChapter,
      updateDataItem,
      setUnitCount
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
