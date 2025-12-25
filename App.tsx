import React, { useState } from 'react';
import { StandardsProvider, useStandards } from './context/StandardsContext';
import { DynamicRoomBlueprint } from './components/DynamicRoomBlueprint';
import { ScorecardMatrix } from './components/ScorecardMatrix';
import { EditableText } from './components/EditableText';
import { CostEstimator } from './components/CostEstimator';
import { UnitMixModal } from './components/UnitMixModal';
import { 
  Building2, 
  BedDouble, 
  Utensils, 
  Users, 
  Menu, 
  X, 
  Lock, 
  Unlock, 
  Globe, 
  Star,
  Coffee,
  Bath,
  Dumbbell,
  ShieldCheck,
  Calculator,
  LayoutGrid
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SidebarItem = ({ id, icon: Icon, label, active, onClick }: any) => (
  <button
    onClick={() => onClick(id)}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      active 
        ? 'bg-shg-blue text-white shadow-lg' 
        : 'text-gray-600 hover:bg-gray-100'
    }`}
  >
    <Icon className="w-5 h-5" />
    <span className="font-medium text-sm">{label}</span>
  </button>
);

const StarSelector = () => {
  const { rating, setRating, language } = useStandards();
  
  return (
    <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-full">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => setRating(star as any)}
          className={`flex items-center justify-center w-8 h-8 rounded-full transition-all ${
            rating >= star 
              ? 'bg-shg-gold text-white shadow-sm transform scale-105' 
              : 'text-gray-400 hover:text-shg-gold'
          }`}
        >
          <Star className={`w-4 h-4 ${rating >= star ? 'fill-current' : ''}`} />
        </button>
      ))}
      <span className="ml-2 px-2 text-xs font-bold text-shg-blue">
        {rating} {language === 'ar' ? 'نجوم' : 'Stars'}
      </span>
    </div>
  );
};

const UnitMixTrigger = ({ onClick }: { onClick: () => void }) => {
  const { totalUnits, language } = useStandards();
  
  return (
    <button 
      onClick={onClick}
      className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-gray-200 hover:border-shg-blue hover:text-shg-blue transition-colors group"
    >
      <LayoutGrid className="w-4 h-4 text-gray-400 group-hover:text-shg-blue" />
      <span className="text-xs text-gray-500 group-hover:text-shg-blue transition-colors">
        {language === 'ar' ? 'تكوين الوحدات:' : 'Config:'}
      </span>
      <span className="font-bold text-shg-blue">
        {totalUnits} {language === 'ar' ? 'وحدة' : 'Units'}
      </span>
    </button>
  );
};

const StandardRow = ({ item, rating, language }: any) => {
  const isMandatory = item.mandatoryFor.includes(rating);
  const currentValue = item.valueByStar[rating];
  
  // Highlighting logic
  const isBonus = !isMandatory && item.points > 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-lg border mb-3 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between ${
        isMandatory ? 'border-l-4 border-l-red-500 bg-white' : 
        isBonus ? 'border-l-4 border-l-green-500 bg-green-50' : 'bg-white border-gray-200'
      }`}
    >
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-bold text-lg text-gray-800">
             <EditableText 
               value={language === 'ar' ? item.titleAr : item.titleEn} 
               category={item.category} 
               id={item.id} 
               field={language === 'ar' ? 'titleAr' : 'titleEn'} 
             />
          </h4>
          {isMandatory && (
            <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">
              {language === 'ar' ? 'إلزامي' : 'Mandatory'}
            </span>
          )}
          {!isMandatory && item.points > 0 && (
             <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">
               +{item.points} {language === 'ar' ? 'نقطة' : 'Pts'}
             </span>
          )}
        </div>
        <p className="text-sm text-gray-500">
          <EditableText 
             value={language === 'ar' ? item.descriptionAr : item.descriptionEn} 
             category={item.category} 
             id={item.id} 
             field={language === 'ar' ? 'descriptionAr' : 'descriptionEn'} 
             multiline
           />
        </p>
        <div className="mt-1 text-xs text-gray-400">
           {language === 'ar' ? 'المرجع:' : 'Ref:'} [{item.citation}]
        </div>
      </div>
      
      <div className="bg-gray-50 px-4 py-2 rounded-lg min-w-[120px] text-center border border-gray-200">
        <div className="text-xs text-gray-500 mb-1">{language === 'ar' ? 'المتطلب' : 'Requirement'}</div>
        <div className="font-bold text-shg-blue text-lg">
          {currentValue}
        </div>
      </div>
    </motion.div>
  );
};

const AdminModal = ({ onClose }: { onClose: () => void }) => {
  const [pin, setPin] = useState('');
  const { setAdminStatus } = useStandards();
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '1234') {
      setAdminStatus(true);
      onClose();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm">
        <h3 className="text-xl font-bold mb-4">God Mode Access</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Enter Security PIN</label>
            <input 
              type="password" 
              className="w-full border rounded-lg p-2 text-center text-2xl tracking-widest"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="••••"
              autoFocus
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">Invalid PIN</p>}
          <div className="flex gap-2">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" className="flex-1 px-4 py-2 bg-shg-blue text-white rounded-lg">Unlock</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Layout = () => {
  const { 
    activeChapter, 
    setActiveChapter, 
    language, 
    setLanguage, 
    isAdmin, 
    toggleAdmin,
    data, 
    rating
  } = useStandards();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showMixModal, setShowMixModal] = useState(false);

  const handleAdminClick = () => {
    if (isAdmin) {
      toggleAdmin();
    } else {
      setShowAdminModal(true);
    }
  };

  const menuItems = [
    { id: 'hero', icon: Star, label: language === 'ar' ? 'الرئيسية' : 'Start' },
    { id: 'building', icon: Building2, label: language === 'ar' ? 'المبنى واللوبي' : 'Building & Lobby' },
    { id: 'reception', icon: Users, label: language === 'ar' ? 'الاستقبال والخدمات' : 'Reception & Services' },
    { id: 'room', icon: BedDouble, label: language === 'ar' ? 'الغرف والوحدات' : 'Rooms & Units' },
    { id: 'kitchen', icon: Utensils, label: language === 'ar' ? 'المطبخ' : 'Kitchen' },
    { id: 'bath', icon: Bath, label: language === 'ar' ? 'الحمامات' : 'Bathrooms' },
    { id: 'food_beverage', icon: Coffee, label: language === 'ar' ? 'الأغذية والمشروبات' : 'Food & Beverage' },
    { id: 'recreation', icon: Dumbbell, label: language === 'ar' ? 'الترفيه والصحة' : 'Recreation & Health' },
    { id: 'safety', icon: ShieldCheck, label: language === 'ar' ? 'الأمن والسلامة' : 'Safety & Security' },
    { id: 'finance', icon: Calculator, label: language === 'ar' ? 'المقدر المالي' : 'Cost Estimator' },
  ];

  const renderContent = () => {
    if (activeChapter === 'hero') {
      return (
        <div className="max-w-4xl mx-auto text-center py-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <div className="bg-shg-blue text-shg-gold p-8 rounded-2xl shadow-2xl inline-block">
              <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">
                {language === 'ar' ? 'موسوعة الفنادق الحية' : 'The Living Encyclopedia'}
              </h1>
              <p className="text-lg md:text-xl text-gray-300">
                {language === 'ar' 
                  ? 'دليلك التفاعلي لمعايير تصنيف الشقق الفندقية في المملكة العربية السعودية 2025' 
                  : 'Your interactive guide to Saudi Apartment Hotel Classification Criteria 2025'}
              </p>
            </div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-shg-gold">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Star className="text-shg-gold fill-current" />
                {language === 'ar' ? 'محرك النجوم' : 'The Star Engine'}
              </h3>
              <p className="text-gray-600 mb-4">
                {language === 'ar' 
                  ? 'اختر التصنيف المستهدف لترى المتطلبات تتغير بشكل ديناميكي أمام عينيك.'
                  : 'Select your target rating to watch requirements dynamically adapt before your eyes.'}
              </p>
              <div className="mb-4">
                <UnitMixTrigger onClick={() => setShowMixModal(true)} />
              </div>
              <button 
                onClick={() => setActiveChapter('room')} 
                className="bg-shg-blue text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition w-full"
              >
                {language === 'ar' ? 'ابدأ الرحلة' : 'Start the Journey'}
              </button>
            </div>
            <ScorecardMatrix />
          </div>
        </div>
      );
    }

    if (activeChapter === 'finance') {
      return (
        <div className="max-w-5xl mx-auto">
          <CostEstimator />
        </div>
      );
    }

    const chapterData = data[activeChapter as keyof typeof data];
    
    return (
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-shg-blue mb-2 flex items-center gap-3">
              {menuItems.find(m => m.id === activeChapter)?.icon && 
                React.createElement(menuItems.find(m => m.id === activeChapter)!.icon, { className: 'w-8 h-8' })}
              {menuItems.find(m => m.id === activeChapter)?.label}
            </h2>
            <p className="text-gray-500">
              {language === 'ar' 
                ? `متطلبات ${rating} نجوم لهذا القسم.` 
                : `${rating} Star requirements for this section.`}
            </p>
          </div>
          {/* Dynamic Visuals based on Chapter */}
          <div className="w-full md:w-auto flex justify-center">
             {activeChapter === 'room' && <DynamicRoomBlueprint />}
          </div>
        </div>

        <div className="space-y-4">
          {chapterData && chapterData.map((item) => (
            <StandardRow key={item.id} item={item} rating={rating} language={language} />
          ))}
          {!chapterData && <p className="text-center text-gray-400 py-10">Content under construction.</p>}
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen bg-[#F8F9FA] flex flex-col md:flex-row font-sans ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* Mobile Header */}
      <div className="md:hidden bg-white p-4 shadow-sm flex items-center justify-between sticky top-0 z-20">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
        <span className="font-serif font-bold text-shg-blue">SHG</span>
        <StarSelector />
      </div>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 z-30 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
        isMobileMenuOpen ? (language === 'ar' ? 'translate-x-0' : 'translate-x-0') : (language === 'ar' ? 'translate-x-full' : '-translate-x-full')
      }`}>
        <div className="p-6 border-b border-gray-100 flex flex-col items-center">
           <div className="flex gap-4 mb-4">
             {/* Branding Logos */}
             <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-500">UKRA</div>
             <div className="w-12 h-12 bg-shg-gold rounded-full flex items-center justify-center text-[10px] font-bold text-white">Ownara</div>
           </div>
           <h1 className="font-serif font-bold text-xl text-center text-shg-blue">
             Saudi Hotel<br/>Encyclopedia
           </h1>
        </div>

        <nav className="p-4 space-y-1 h-[calc(100vh-250px)] overflow-y-auto">
          {menuItems.map((item) => (
            <SidebarItem 
              key={item.id} 
              {...item} 
              active={activeChapter === item.id} 
              onClick={() => {
                setActiveChapter(item.id);
                setIsMobileMenuOpen(false);
              }} 
            />
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center justify-between mb-4">
             <button 
               onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
               className="flex items-center gap-2 text-sm text-gray-600 hover:text-shg-blue"
             >
               <Globe className="w-4 h-4" />
               {language === 'ar' ? 'English' : 'العربية'}
             </button>
             
             <button onClick={handleAdminClick} className="text-gray-400 hover:text-red-500 transition">
               {isAdmin ? <Unlock className="w-4 h-4 text-red-500" /> : <Lock className="w-4 h-4" />}
             </button>
          </div>
          <div className="text-[10px] text-center text-gray-400">
            Based on Saudi Tourism Ministry 2025
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-screen relative">
        {/* Desktop Header */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-gray-100">
          <div className="flex items-center gap-4 text-gray-400 text-sm">
             <div className="flex items-center gap-2">
               <span>{language === 'ar' ? 'المعيار الحالي:' : 'Current Standard:'}</span>
               <span className="font-bold text-shg-blue">{rating} Stars</span>
             </div>
             <div className="h-4 w-px bg-gray-300"></div>
             <UnitMixTrigger onClick={() => setShowMixModal(true)} />
          </div>
          <StarSelector />
        </header>

        <div className="p-4 md:p-8 pb-20">
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeChapter}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {showAdminModal && <AdminModal onClose={() => setShowAdminModal(false)} />}
      <UnitMixModal isOpen={showMixModal} onClose={() => setShowMixModal(false)} />
    </div>
  );
};

const App = () => {
  return (
    <StandardsProvider>
      <Layout />
    </StandardsProvider>
  );
};

export default App;
