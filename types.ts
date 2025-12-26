export type StarRating = 1 | 2 | 3 | 4 | 5;

export type Language = 'ar' | 'en';

export type Category = 
  | 'building' 
  | 'reception'
  | 'room' 
  | 'kitchen' 
  | 'bath'
  | 'food_beverage'
  | 'conferences' 
  | 'recreation'
  | 'quality'
  | 'services'
  | 'safety';

// Precise logic for how many of an item are needed
export type CalculationRule = 
  | 'fixed'            // One time purchase (e.g., Signage, Main Restaurant)
  | 'per_unit'         // Every room gets one (e.g., Door lock)
  | 'per_standard_room' // Only for Single/Double/Twin (Non-Suites)
  | 'per_guest_capacity' // Based on total sleeping capacity (e.g., Towels)
  | 'per_single_bed'   // Only for Single/Twin rooms
  | 'per_king_bed'     // Only for Double/Suite/VIP
  | 'per_bedroom'      // Suites might have 2 bedrooms
  | 'per_bathroom'     // Suites might have 2 bathrooms
  | 'per_suite_vip'    // Luxury items only for Suites and VIP
  | 'per_staff'        // For HR/Uniforms (Calculated as 1 per 14 keys approx)
  | 'sqm_dependent';   // For flooring/curtains (simplified here)

export interface StandardItem {
  id: string;
  category: Category;
  subCategory?: string; // NEW: For granular grouping (e.g. 'central_kitchen' vs 'unit_kitchen')
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  mandatoryFor: StarRating[]; 
  points: number;
  valueByStar: Record<StarRating, string | number | boolean>;
  citation: string;
  
  // Financial & BoQ Data
  hasCost?: boolean;
  baseCost?: number;
  // logic: calculation rule overrides simple costType
  calcRule?: CalculationRule; 
  itemType?: 'ffe' | 'ose' | 'services';
  
  // Material Specs per Star Rating
  specsByStar?: Partial<Record<StarRating, { ar: string; en: string }>>;
}

export interface StandardsData {
  building: StandardItem[];
  reception: StandardItem[];
  room: StandardItem[];
  kitchen: StandardItem[];
  bath: StandardItem[];
  food_beverage: StandardItem[];
  conferences: StandardItem[]; 
  recreation: StandardItem[];
  quality: StandardItem[];
  services: StandardItem[];
  safety: StandardItem[];
}

export interface UnitMix {
  single: number;  // 1 Bed
  double: number;  // 1 King Bed
  twin: number;    // 2 Single Beds
  suite: number;   // 1 King + Living
  vip: number;     // 1 King + Upgraded Amenities
}

export interface AppState {
  rating: StarRating;
  language: Language;
  isAdmin: boolean;
  activeChapter: string;
  unitMix: UnitMix;
}

export interface StandardsContextType extends AppState {
  setRating: (rating: StarRating) => void;
  setLanguage: (lang: Language) => void;
  toggleAdmin: () => void;
  setAdminStatus: (status: boolean) => void;
  setActiveChapter: (chapter: string) => void;
  setUnitMix: (mix: UnitMix) => void;
  updateUnitMix: (key: keyof UnitMix, value: number) => void;
  totalUnits: number; // Computed property
  data: StandardsData;
  updateDataItem: (category: keyof StandardsData, id: string, field: string, value: string) => void;
}