import { StandardsData, StandardItem, StarRating, CalculationRule } from '../types';

const createItem = (
  id: string,
  category: any,
  titleAr: string,
  titleEn: string,
  descAr: string,
  descEn: string,
  mandatoryMin: number, // 0 = not mandatory, 1=all, 3=from 3 stars
  points: number,
  values: any[], // 1,2,3,4,5
  cite: string,
  baseCost: number = 0,
  calcRule: CalculationRule = 'per_unit',
  itemType: 'ffe' | 'ose' | 'services' = 'ffe',
  subCategory: string = 'general', // Default subcategory
  specs?: Partial<Record<StarRating, { ar: string; en: string }>>
): StandardItem => {
  const mandatoryFor: StarRating[] = [];
  if (mandatoryMin > 0) {
      ([1, 2, 3, 4, 5] as StarRating[]).forEach(r => {
          if (r >= mandatoryMin) mandatoryFor.push(r);
      });
  }

  return {
    id,
    category,
    subCategory,
    titleAr,
    titleEn,
    descriptionAr: descAr,
    descriptionEn: descEn,
    mandatoryFor,
    points,
    valueByStar: {
      1: values[0],
      2: values[1],
      3: values[2],
      4: values[3],
      5: values[4],
    },
    citation: cite,
    hasCost: baseCost > 0,
    baseCost: baseCost,
    calcRule: calcRule,
    itemType: itemType,
    specsByStar: specs
  };
};

export const initialStandardsData: StandardsData = {
  // ==========================================
  // Zone C: المبنى والمرافق العامة (Fixed Assets)
  // ==========================================
  building: [
    createItem('1', 'building', 'التراخيص والشهادات الحكومية', 'Gov Licenses & Permits', 'الدفاع المدني، البلدية، السياحة.', 'Civil Defense, Municipality, Tourism.', 1, 2, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '1', 15000, 'fixed', 'services', 'general'),
    createItem('2', 'building', 'اللوحة الخارجية (3D Letters)', 'Exterior Signage (3D)', 'لوحة مضيئة حسب الهوية.', 'Illuminated 3D signage.', 1, 2, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '2', 25000, 'fixed', 'ffe', 'general'),
    createItem('23', 'building', 'مصاعد الركاب (Schindler/Otis)', 'Guest Elevators', 'عدد 2 مصعد (تقديري).', '2 Units approx.', 1, 10, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '23', 180000, 'fixed', 'ffe', 'general'), // Price per unit roughly, logic sets as fixed project cost
    createItem('32', 'building', 'مصعد خدمات (Service)', 'Service Elevator', 'للموظفين والتدبير.', 'For staff/HK.', 5, 5, ['-', '-', '-', 'إلزامي', 'إلزامي'], '32', 140000, 'fixed', 'ffe', 'general'),
    createItem('parking-sys', 'building', 'نظام مواقف السيارات (Borders)', 'Parking Barriers System', 'بوابات إلكترونية.', 'Electronic gates.', 3, 0, ['-', '-', 'إلزامي', 'إلزامي', 'إلزامي'], '15', 35000, 'fixed', 'ffe', 'general'),
  ],

  reception: [
    createItem('43', 'reception', 'كاونتر الاستقبال (رخام/خشب)', 'Reception Desk (Custom)', 'تصميم وتنفيذ.', 'Custom joinery.', 1, 2, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '43', 25000, 'fixed', 'ffe', 'reception_desk'),
    createItem('37', 'reception', 'أجهزة كمبيوتر وبرنامج PMS', 'PMS Hardware & Software', 'سيرفر + طرفيات.', 'Server + Terminals.', 1, 2, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '37', 15000, 'fixed', 'ffe', 'reception_desk'),
    createItem('45', 'reception', 'أثاث اللوبي (طقم كامل)', 'Lobby Furniture Set', 'كنب، طاولات، إكسسوارات.', 'Sofas, tables, decor.', 1, 2, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '45', 45000, 'fixed', 'ffe', 'reception_lobby'),
    createItem('65', 'reception', 'عربات نقل الأمتعة (Bird Cage)', 'Luggage Trolleys', 'ستانلس ستيل ذهبي/فضي.', 'SS Gold/Silver.', 3, 2, ['-', '-', 'إلزامي', 'إلزامي', 'إلزامي'], '65', 2500, 'fixed', 'ffe', 'reception_lobby'), // Fixed qty (e.g. 2)
  ],

  // ==========================================
  // Zone A: الغرف (Variable Costs - Per Unit/Bed)
  // ==========================================
  room: [
    // Sleeping Area
    createItem('128', 'room', 'مرتبة فندقية (Pocket Spring)', 'Hotel Mattress (Pocket Spring)', 'مواصفات فندقية عالية.', 'High grade specs.', 1, 3, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '128', 1800, 'per_single_bed', 'ffe', 'bedroom'),
    createItem('128-base', 'room', 'قاعدة سرير (Divan Base)', 'Bed Base', 'قاعدة منجدة.', 'Upholstered base.', 1, 0, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '129', 900, 'per_single_bed', 'ffe', 'bedroom'),
    createItem('128-head', 'room', 'ظهر سرير (Headboard)', 'Headboard', 'تنجيد أو خشب.', 'Upholstered/Wood.', 1, 0, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '129', 1200, 'per_single_bed', 'ffe', 'bedroom'),
    createItem('146', 'room', 'بياضات السرير (Par 3)', 'Bed Linen (Par 3)', '3 أطقم كاملة لكل سرير.', '3 full sets per bed.', 1, 2, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '146', 600, 'per_single_bed', 'ose', 'bedroom'),
    createItem('155', 'room', 'ستائر تعتيم (Blackout)', 'Curtains (Sheer+Blackout)', 'طبقتين + سكة.', '2 Layers + Track.', 1, 1, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '155', 2000, 'per_bedroom', 'ffe', 'bedroom'),
    
    // Furniture & Tech
    createItem('162', 'room', 'خزانة ملابس (Built-in)', 'Wardrobe (Joinery)', 'تصنيع حسب المقاس.', 'Custom joinery.', 1, 1, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '162', 2500, 'per_bedroom', 'ffe', 'bedroom'),
    createItem('202', 'room', 'تلفزيون ذكي 50 بوصة', 'Smart TV 50 Inch', 'مع دعامة تعليق.', 'With bracket.', 3, 2, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '202', 1800, 'per_unit', 'ffe', 'living'),
    createItem('203', 'room', 'خزنة إلكترونية (Laptop Size)', 'Digital Safe', 'مقاس لابتوب.', 'Laptop size.', 1, 1, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '203', 450, 'per_unit', 'ffe', 'bedroom'),
    createItem('169', 'room', 'طقم جلوس (Sofa + Table)', 'Seating Area Set', 'كرسيين وطاولة.', '2 chairs + table.', 3, 5, ['-', '-', 'إلزامي', 'إلزامي', 'إلزامي'], '169', 3000, 'per_unit', 'ffe', 'living'),
    createItem('219', 'room', 'هاتف فندقي', 'Hotel IP Phone', 'قابل للبرمجة.', 'Programmable.', 1, 2, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '219', 350, 'per_unit', 'ffe', 'bedroom'),
  ],

  kitchen: [
    // Zone A: In-Unit Kitchenettes (Domestic Grade)
    createItem('unit-fridge', 'kitchen', 'ثلاجة منزلية (300L)', 'Domestic Fridge (300L)', 'للاستخدام الشخصي.', 'Personal use.', 1, 2, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '187', 1600, 'per_unit', 'ffe', 'unit_kitchen'),
    createItem('unit-micro', 'kitchen', 'مايكروويف منزلي', 'Domestic Microwave', 'تسخين.', 'Heating.', 1, 2, ['-', '-', 'إلزامي', 'إلزامي', 'إلزامي'], '190', 400, 'per_unit', 'ffe', 'unit_kitchen'),
    createItem('unit-hob', 'kitchen', 'موقد كهربائي سيراميك (2 عين)', 'Ceramic Hob (2 Burner)', 'بلت ان.', 'Built-in.', 1, 2, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '183', 850, 'per_unit', 'ffe', 'unit_kitchen'),
    createItem('unit-kettle', 'kitchen', 'غلاية كهربائية + صينية', 'Kettle & Tray Set', 'ضيافة.', 'Hospitality.', 1, 1, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '240', 250, 'per_unit', 'ose', 'unit_kitchen'),
    createItem('unit-wash', 'kitchen', 'غسالة ملابس (أتوماتيك)', 'Washing Machine (Auto)', 'للأجنحة فقط.', 'Suites only.', 4, 2, ['-', '-', '-', 'إلزامي', 'إلزامي'], '191', 2200, 'per_suite_vip', 'ffe', 'unit_kitchen'),
    createItem('unit-ose', 'kitchen', 'أدوات المائدة والطبخ (OS&E)', 'Cutlery & Crockery Set', 'طقم 4 أشخاص.', 'Set for 4.', 1, 1, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '192', 600, 'per_unit', 'ose', 'unit_kitchen'),
  ],

  bath: [
    // Zone A: In-Unit Bathrooms
    createItem('bath-hair', 'bath', 'مجفف شعر (Wall Mounted)', 'Hair Dryer (Wall)', 'مثبت بالحائط.', 'Wall mounted.', 3, 2, ['-', '-', 'إلزامي', 'إلزامي', 'إلزامي'], '286', 180, 'per_bathroom', 'ffe', 'unit_bath'),
    createItem('bath-mirror', 'bath', 'مرآة مغسلة بإضاءة', 'Vanity Mirror w/ Light', 'ليد خلفي.', 'Backlit LED.', 1, 1, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '261', 600, 'per_bathroom', 'ffe', 'unit_bath'),
    createItem('bath-towels', 'bath', 'طقم مناشف (Par 3)', 'Terry Towels (Par 3)', '3 أطقم لكل ضيف.', '3 sets/guest.', 1, 1, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '279', 250, 'per_guest_capacity', 'ose', 'unit_bath'),
    createItem('bath-amenities', 'bath', 'إكسسوارات الحمام', 'Bath Accessories', 'حامل صابون، مناديل.', 'Holders, bins.', 1, 1, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '247', 300, 'per_bathroom', 'ffe', 'unit_bath'),
  ],

  // ==========================================
  // Zone B: المطابخ المركزية والمطاعم (Commercial Grade - Fixed Assets)
  // ==========================================
  food_beverage: [
    // 1. Central Kitchen (The Heart of Operations)
    createItem('ck-hood', 'food_beverage', 'نظام تهوية وشفط (Fresh/Exhaust)', 'Commercial Hood System', 'شامل الفلاتر والمراوح.', 'Incl fans & filters.', 4, 10, ['-', '-', '-', 'إلزامي', 'إلزامي'], '313', 55000, 'fixed', 'ffe', 'central_kitchen'),
    createItem('ck-cool', 'food_beverage', 'غرف تبريد وتجميد (Walk-in)', 'Walk-in Chiller/Freezer', 'وحدتين (تبريد + تجميد).', '2 Units.', 4, 10, ['-', '-', '-', 'إلزامي', 'إلزامي'], '313', 60000, 'fixed', 'ffe', 'central_kitchen'),
    createItem('ck-oven', 'food_beverage', 'فرن كومبي (Rational/Unox)', 'Combi Oven (10 Trays)', 'قلب المطبخ.', 'Kitchen heart.', 4, 10, ['-', '-', '-', 'إلزامي', 'إلزامي'], '313', 45000, 'fixed', 'ffe', 'central_kitchen'),
    createItem('ck-range', 'food_beverage', 'خط طبخ (4 عيون + جريل)', 'Cooking Range (Heavy Duty)', 'غاز.', 'Gas.', 4, 10, ['-', '-', '-', 'إلزامي', 'إلزامي'], '313', 28000, 'fixed', 'ffe', 'central_kitchen'),
    createItem('ck-prep', 'food_beverage', 'طاولات تحضير وأحواض (SS 304)', 'SS Prep Tables & Sinks', 'ستانلس ستيل غذائي.', 'Food grade SS.', 4, 10, ['-', '-', '-', 'إلزامي', 'إلزامي'], '313', 20000, 'fixed', 'ffe', 'central_kitchen'),
    createItem('ck-dish', 'food_beverage', 'غسالة صحون (Hood Type)', 'Dishwasher (Hood Type)', 'صناعية.', 'Industrial.', 4, 10, ['-', '-', '-', 'إلزامي', 'إلزامي'], '313', 32000, 'fixed', 'ffe', 'central_kitchen'),

    // 2. Restaurant (FOH)
    createItem('rest-tables', 'food_beverage', 'طاولات وكراسي المطعم', 'Dining Tables & Chairs', 'سعة 60 شخص.', '60 Pax capacity.', 4, 10, ['-', '-', '-', 'إلزامي', 'إلزامي'], '313', 75000, 'fixed', 'ffe', 'restaurant'),
    createItem('rest-buffet', 'food_beverage', 'محطات البوفيه (Sneeze Guard)', 'Buffet Counters', 'ساخن وبارد.', 'Hot & Cold.', 4, 10, ['-', '-', '-', 'إلزامي', 'إلزامي'], '307', 40000, 'fixed', 'ffe', 'restaurant'),
    createItem('rest-coffee', 'food_beverage', 'ركن القهوة والمشروبات', 'Beverage Station', 'ماكينة قهوة، عصير.', 'Coffee, Juice.', 4, 5, ['-', '-', '-', 'إلزامي', 'إلزامي'], '318', 30000, 'fixed', 'ffe', 'restaurant'),

    // 3. Room Service
    createItem('rs-trolley', 'food_beverage', 'عربات خدمة الغرف (Hot Box)', 'RS Trolleys w/ Warmer', 'حفظ الحرارة.', 'With heating box.', 4, 5, ['-', '-', '-', 'إلزامي', 'إلزامي'], '311', 4500, 'fixed', 'ffe', 'room_service'), // e.g. 2 units
  ],

  // ==========================================
  // Zone C: مناطق الخدمات والمرافق الأخرى
  // ==========================================
  conferences: [
    createItem('conf-av', 'conferences', 'نظام الصوتيات والمرئيات', 'AV System (Projector/Sound)', 'لقاعة الاجتماعات.', 'Meeting room.', 4, 10, ['-', '-', '-', '10', '20'], '329', 25000, 'fixed', 'ffe', 'meeting'),
    createItem('conf-furn', 'conferences', 'أثاث قاعات الاجتماعات', 'Conference Furniture', 'طاولة اجتماعات وكراسي.', 'Meeting table/chairs.', 4, 10, ['-', '-', '-', '10', '20'], '329', 20000, 'fixed', 'ffe', 'meeting'),
  ],

  recreation: [
    createItem('gym-tread', 'recreation', 'أجهزة كارديو (سير/دراجة)', 'Cardio Machines (Pro)', 'معدات تجارية.', 'Commercial grade.', 4, 4, ['-', '-', '-', 'إلزامي', '8'], '348', 45000, 'fixed', 'ffe', 'gym'), // Package of 2-3 items
    createItem('gym-strength', 'recreation', 'أجهزة قوة وأوزان', 'Strength & Weights', 'دامبلز وبنش.', 'Dumbbells/Bench.', 4, 4, ['-', '-', '-', 'إلزامي', '8'], '348', 25000, 'fixed', 'ffe', 'gym'),
    createItem('pool-mech', 'recreation', 'مضخات وفلاتر المسبح', 'Pool Filtration System', 'غرفة المضخات.', 'Pump room.', 4, 10, ['-', '-', '-', 'إلزامي', 'إلزامي'], '358', 55000, 'fixed', 'ffe', 'pool'),
    createItem('kids-play', 'recreation', 'هيكل ألعاب أطفال', 'Soft Play Structure', 'آمن ومبطن.', 'Safe padding.', 1, 4, ['-', '4', '4', '4', '4'], '363', 25000, 'fixed', 'ffe', 'kids'),
  ],

  services: [
    // Housekeeping
    createItem('hk-cart', 'services', 'عربة تدبير الغرف', 'Housekeeping Trolley', 'لكل 14 غرفة.', '1 per 14 rooms.', 1, 5, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], 'hk-trolley', 2800, 'per_staff', 'ffe', 'housekeeping'),
    createItem('hk-vac', 'services', 'مكنسة صناعية (Dry/Wet)', 'Industrial Vacuum', 'لكل طابق.', 'Per floor.', 1, 5, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], 'hk-vac', 1500, 'per_staff', 'ffe', 'housekeeping'),
    
    // Laundry (Major Investment)
    createItem('laundry-wash', 'services', 'غسالات مركزية (Hard Mount)', 'Commercial Washers', 'سعة عالية.', 'High capacity.', 5, 10, ['-', '-', '-', '10', '10'], '36', 120000, 'fixed', 'ffe', 'laundry'), // Package estimate
    createItem('laundry-dry', 'services', 'نشافات مركزية', 'Commercial Dryers', 'سعة عالية.', 'High capacity.', 5, 10, ['-', '-', '-', '10', '10'], '36', 80000, 'fixed', 'ffe', 'laundry'),
  ],

  safety: [
    createItem('safe-cam', 'safety', 'نظام كاميرات المراقبة (CCTV)', 'CCTV System (IP)', 'تغطية كاملة للممرات.', 'Full coverage.', 1, 2, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '40', 60000, 'fixed', 'ffe', 'general'),
    createItem('safe-fire', 'safety', 'طفايات وخراطيم الحريق', 'Fire Extinguishers/Hoses', 'حسب الدفاع المدني.', 'Civil Defense req.', 1, 2, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '226', 300, 'per_unit', 'ose', 'general'), // Per unit + corridors
  ],

  quality: []
};