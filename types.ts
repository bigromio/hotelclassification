export type StarRating = 1 | 2 | 3 | 4 | 5;

export type Language = 'ar' | 'en';

export type Category = 
  | 'building' 
  | 'reception'
  | 'room' 
  | 'kitchen' 
  | 'bath'
  | 'food_beverage'
  | 'services'
  | 'recreation'
  | 'safety';

export interface StandardItem {
  id: string;
  category: Category;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  mandatoryFor: StarRating[]; // Which ratings is this mandatory for?
  points: number;
  valueByStar: Record<StarRating, string | number | boolean>;
  citation: string; // The item number in the PDF (e.g., "14", "107")
  
  // Financial Estimation Data
  hasCost?: boolean; // Does this item have a monetary cost attached?
  baseCost?: number; // Estimated cost per unit in SAR (Base level)
  costType?: 'per_room' | 'fixed' | 'per_staff' | 'per_guest'; // Logic for calculation
  itemType?: 'ffe' | 'ose'; // FF&E (Furniture) or OS&E (Supplies/Spoons/Towels)
  
  // Material Specs per Star Rating
  specsByStar?: Record<StarRating, { ar: string; en: string }>;
}

export interface StandardsData {
  building: StandardItem[];
  reception: StandardItem[];
  room: StandardItem[];
  kitchen: StandardItem[];
  bath: StandardItem[];
  food_beverage: StandardItem[];
  services: StandardItem[];
  recreation: StandardItem[];
  safety: StandardItem[];
}

export interface AppState {
  rating: StarRating;
  language: Language;
  isAdmin: boolean;
  activeChapter: string;
  unitCount: number; // Number of apartments/rooms in the hotel
}

export interface StandardsContextType extends AppState {
  setRating: (rating: StarRating) => void;
  setLanguage: (lang: Language) => void;
  toggleAdmin: () => void;
  setAdminStatus: (status: boolean) => void;
  setActiveChapter: (chapter: string) => void;
  setUnitCount: (count: number) => void;
  data: StandardsData;
  updateDataItem: (category: keyof StandardsData, id: string, field: string, value: string) => void;
}
