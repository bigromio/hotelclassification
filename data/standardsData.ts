import { StandardsData, StandardItem, StarRating, CalculationRule } from '../types';

// Helper to create items quickly
const createItem = (
  id: string,
  category: any,
  titleAr: string,
  titleEn: string,
  descAr: string,
  descEn: string,
  mandatoryMin: number,
  points: number,
  values: any[],
  cite: string,
  baseCost: number = 0,
  calcRule: CalculationRule = 'per_unit',
  itemType: 'ffe' | 'ose' = 'ffe',
  specs?: Partial<Record<StarRating, { ar: string; en: string }>>
): StandardItem => {
  return {
    id,
    category,
    titleAr,
    titleEn,
    descriptionAr: descAr,
    descriptionEn: descEn,
    mandatoryFor: mandatoryMin > 0 ? [1, 2, 3, 4, 5].filter(r => r >= mandatoryMin) as StarRating[] : [],
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
  // 1. BUILDING & GENERAL
  // ==========================================
  building: [
    createItem('b-sign-main', 'building', 'اللوحة الخارجية الرئيسية', 'Main Exterior Signage', 'لوحة اسم الفندق.', 'Hotel name signage.', 1, 5, ['1', '1', '1', '1', '1'], 'Gen', 12000, 'fixed', 'ffe', { 1: {ar: 'صندوق مضيء', en: 'Light Box'}, 3: {ar: 'حروف بارزة', en: '3D Letters'}, 5: {ar: 'نحاس/ذهبي فاخر', en: 'Luxury Brass/Gold'} }),
    createItem('b-sign-way', 'building', 'لوحات التوجيه الداخلية', 'Wayfinding Signage', 'لكل طابق.', 'Per floor.', 1, 5, ['1 set', '1 set', '1 set', '1 set', '1 set'], 'Gen', 3000, 'fixed', 'ffe'),
    createItem('b-elev', 'building', 'المصاعد', 'Elevators', 'مصاعد الركاب.', 'Passenger Elevators.', 1, 10, ['1', '1', '2', '2', '4'], '23', 150000, 'fixed', 'ffe'),
    createItem('b-gen', 'building', 'مولد كهربائي احتياطي', 'Backup Generator', 'للطوارئ.', 'Emergency power.', 3, 5, ['0', '0', '1', '1', '1'], 'Eng', 85000, 'fixed', 'ffe'),
    createItem('b-flag', 'building', 'سارية العلم', 'Flag Poles', 'أعلام الدولة والفندق.', 'Flag poles.', 1, 2, ['1', '1', '3', '3', '3'], 'Gen', 1500, 'fixed', 'ffe'),
    createItem('b-mat', 'building', 'دعاسة المدخل', 'Entrance Mat', 'مدخل اللوبي.', 'Lobby entrance.', 1, 2, ['1', '1', '1', '1', '1'], 'Gen', 800, 'fixed', 'ose')
  ],

  // ==========================================
  // 2. RECEPTION & LOBBY
  // ==========================================
  reception: [
    createItem('rec-desk', 'reception', 'كاونتر الاستقبال', 'Reception Desk', 'المكتب الرئيسي.', 'Main desk.', 1, 5, ['1', '1', '1', '1', '2'], '43', 15000, 'fixed', 'ffe', {1: {ar: 'خشب صناعي', en: 'HPL'}, 4: {ar: 'رخام صناعي', en: 'Corian'}, 5: {ar: 'رخام طبيعي', en: 'Natural Marble'}}),
    createItem('rec-chair-staff', 'reception', 'كرسي موظف استقبال', 'Front Desk Chair', 'مريح للعمل.', 'Ergonomic.', 1, 5, ['1', '1', '2', '2', '3'], 'HR', 1200, 'fixed', 'ffe'),
    createItem('rec-sofa', 'reception', 'طقم كنب اللوبي', 'Lobby Seating', 'منطقة الانتظار.', 'Waiting area.', 1, 10, ['4 seats', '6 seats', '10 seats', '15 seats', '25 seats'], '42', 20000, 'fixed', 'ffe'),
    createItem('rec-pc', 'reception', 'كمبيوتر الاستقبال', 'Reception PC', 'نظام PMS.', 'PMS Workstation.', 1, 5, ['1', '1', '2', '2', '3'], 'IT', 3500, 'fixed', 'ffe'),
    createItem('rec-printer', 'reception', 'طابعة متعددة المهام', 'MFP Printer', 'سكانر وطباعة.', 'Scanner/Print.', 1, 2, ['1', '1', '1', '1', '2'], 'IT', 2000, 'fixed', 'ffe'),
    createItem('rec-key', 'reception', 'جهاز كروت المفاتيح', 'Key Encoder', 'برمجة الكروت.', 'RFID Encoder.', 1, 5, ['1', '1', '1', '2', '2'], 'IT', 1800, 'fixed', 'ffe'),
    createItem('rec-cart', 'reception', 'عربة حقائب (Birdcage)', 'Bellboy Trolley', 'نقل الحقائب.', 'Luggage cart.', 3, 5, ['0', '0', '1', '2', '2'], '66', 2500, 'fixed', 'ose', {3: {ar: 'ستيل فضي', en: 'Silver Steel'}, 5: {ar: 'ذهبي فاخر', en: 'Gold Plated'}}),
    createItem('rec-phone', 'reception', 'هاتف الاستقبال', 'IP Phone', 'هاتف رئيسي.', 'Master phone.', 1, 2, ['1', '1', '2', '2', '3'], 'IT', 800, 'fixed', 'ffe'),
    createItem('rec-scent', 'reception', 'جهاز تعطير', 'Scent Diffuser', 'رائحة اللوبي.', 'Lobby scent.', 4, 2, ['0', '0', '0', '1', '2'], 'Amb', 1500, 'fixed', 'ose')
  ],

  // ==========================================
  // 3. ROOM FF&E (Furniture)
  // ==========================================
  room: [
    // BEDS - SPLIT BY LOGIC
    createItem('rm-bed-king', 'room', 'سرير مزدوج (قاعدة + رأسية)', 'King Bed Set', 'للغرف المزدوجة والأجنحة.', 'Double/Suite/VIP.', 1, 15, ['1', '1', '1', '1', '1'], '128', 3500, 'per_king_bed', 'ffe', {1: {ar: 'خشب بسيط', en: 'Simple Wood'}, 3: {ar: 'منجد قماش', en: 'Upholstered'}, 5: {ar: 'تصميم فاخر مخصص', en: 'Custom Luxury'}}),
    createItem('rm-bed-sgl', 'room', 'سرير مفرد (قاعدة + رأسية)', 'Single Bed Set', 'للغرف التوين والمفردة.', 'Twin/Single.', 1, 15, ['1', '1', '1', '1', '1'], '128', 2200, 'per_single_bed', 'ffe'),
    
    // MATTRESSES - SPLIT BY LOGIC
    createItem('rm-mat-king', 'room', 'مرتبة كينج', 'King Mattress', '200x200cm.', '200x200cm.', 1, 15, ['1', '1', '1', '1', '1'], '129', 2500, 'per_king_bed', 'ffe', {1: {ar: 'نوابض 20سم', en: 'Spring 20cm'}, 3: {ar: 'بوكيت 25سم', en: 'Pocket 25cm'}, 5: {ar: 'فندقية 32سم+', en: 'Hotel Grade 32cm+'}}),
    createItem('rm-mat-sgl', 'room', 'مرتبة مفردة', 'Single Mattress', '100x200cm.', '100x200cm.', 1, 15, ['1', '1', '1', '1', '1'], '129', 1200, 'per_single_bed', 'ffe'),

    // NIGHTSTANDS
    createItem('rm-nt', 'room', 'كومودينة (طاولة جانبية)', 'Nightstand', 'بجانب السرير.', 'Bedside table.', 1, 5, ['1', '1', '2', '2', '2'], 'Fur', 400, 'per_guest_capacity', 'ffe'),
    
    // WARDROBE & SAFE
    createItem('rm-ward', 'room', 'خزانة ملابس', 'Wardrobe', 'دولاب.', 'Closet.', 1, 5, ['1', '1', '1', '1', '1'], 'Fur', 2000, 'per_bedroom', 'ffe'),
    createItem('rm-safe', 'room', 'خزنة إلكترونية', 'In-Room Safe', 'للمقتنيات.', 'Digital safe.', 3, 5, ['0', '0', '1', '1', '1'], '203', 350, 'per_unit', 'ffe'),
    
    // SEATING
    createItem('rm-chair', 'room', 'كرسي جلوس / فوتيه', 'Armchair', 'كرسي مع طاولة.', 'Chair & table.', 1, 5, ['1', '1', '2', '2', '2'], 'Fur', 800, 'per_unit', 'ffe'),
    createItem('rm-sofa', 'room', 'كنبة (للأجنحة)', 'Sofa (Suites)', 'صالة الجلوس.', 'Living room sofa.', 1, 5, ['1', '1', '1', '1', '1'], 'Fur', 3000, 'per_suite_vip', 'ffe'),

    // ELECTRONICS
    createItem('rm-tv-bed', 'room', 'تلفزيون غرفة النوم', 'Bedroom TV', 'مقابل السرير.', 'Facing bed.', 1, 5, ['32"', '40"', '43"', '50"', '55"'], '202', 1500, 'per_bedroom', 'ffe'),
    createItem('rm-tv-liv', 'room', 'تلفزيون الصالة', 'Living Room TV', 'للأجنحة.', 'Suite Living.', 1, 5, ['32"', '40"', '50"', '55"', '65"'], '202', 2000, 'per_suite_vip', 'ffe'),
    createItem('rm-fridge', 'room', 'ثلاجة (ميني بار / مطبخ)', 'Fridge', 'ثلاجة الوحدة.', 'Unit fridge.', 1, 5, ['Small', 'Small', 'Med', 'Large', 'Large'], '183', 1200, 'per_unit', 'ffe'),

    // OTHER FFE
    createItem('rm-curt', 'room', 'ستائر (بلاك اوت)', 'Curtains', 'للنوافذ.', 'Windows.', 1, 5, ['1', '1', '1', '1', '1'], '155', 1500, 'per_bedroom', 'ffe'),
    createItem('rm-mirror-long', 'room', 'مرآة طويلة', 'Full Length Mirror', 'كامل الجسم.', 'Full body.', 3, 2, ['0', '0', '1', '1', '1'], 'Fur', 400, 'per_unit', 'ffe'),
    createItem('rm-lug', 'room', 'حامل حقائب', 'Luggage Rack', 'للشنط.', 'Suitcase stand.', 3, 2, ['0', '0', '1', '1', '1'], 'Fur', 250, 'per_unit', 'ffe'),
    
    // LINENS (OS&E) - Calculated per bed type
    createItem('ose-sheet-k', 'room', 'طقم ملاءات كينج (3 أطقم)', 'King Sheet Set (Par 3)', 'تشغيل + غسيل + مخزون.', 'Ops + Laundry + Stock.', 1, 10, ['3', '3', '3', '3', '4'], '146', 450, 'per_king_bed', 'ose'),
    createItem('ose-sheet-s', 'room', 'طقم ملاءات مفرد (3 أطقم)', 'Single Sheet Set (Par 3)', 'تشغيل + غسيل + مخزون.', 'Ops + Laundry + Stock.', 1, 10, ['3', '3', '3', '3', '4'], '146', 300, 'per_single_bed', 'ose'),
    createItem('ose-duvet-k', 'room', 'حشوة لحاف كينج', 'King Duvet Insert', 'حشوة.', 'Insert.', 1, 5, ['1', '1', '1', '1', '1'], '146', 300, 'per_king_bed', 'ose'),
    createItem('ose-duvet-s', 'room', 'حشوة لحاف مفرد', 'Single Duvet Insert', 'حشوة.', 'Insert.', 1, 5, ['1', '1', '1', '1', '1'], '146', 200, 'per_single_bed', 'ose'),
    createItem('ose-pillow', 'room', 'مخدات نوم (2 لكل ضيف)', 'Sleeping Pillows (2/guest)', 'مخدات.', 'Pillows.', 1, 5, ['2', '2', '2', '2', '3'], '146', 60, 'per_guest_capacity', 'ose'),
    
    // AMENITIES
    createItem('ose-hanger', 'room', 'علاقات ملابس', 'Hangers', 'خشب/بلاستيك.', 'Wood/Plastic.', 1, 2, ['6', '8', '10', '12', '16'], '165', 8, 'per_bedroom', 'ose'),
    createItem('ose-bin-room', 'room', 'سلة مهملات الغرفة', 'Room Bin', 'جافة.', 'Dry waste.', 1, 2, ['1', '1', '1', '1', '1'], '182', 60, 'per_bedroom', 'ose'),
    createItem('ose-kettle', 'room', 'غلاية كهربائية', 'Kettle', 'للشاي.', 'Tea.', 1, 2, ['1', '1', '1', '1', '1'], '196', 120, 'per_unit', 'ose'),
    createItem('ose-iron', 'room', 'مكواة وطاولة', 'Iron & Board', 'كي.', 'Ironing.', 3, 2, ['0', '0', '1', '1', '1'], '235', 180, 'per_unit', 'ose')
  ],

  // ==========================================
  // 4. KITCHEN (OS&E + FFE)
  // ==========================================
  kitchen: [
    // APPLIANCES (Assuming Apartment Hotel - Per Unit)
    createItem('kit-micro', 'kitchen', 'ميكروويف', 'Microwave', 'تسخين.', 'Heating.', 2, 5, ['1', '1', '1', '1', '1'], '183', 400, 'per_unit', 'ffe'),
    createItem('kit-wash', 'kitchen', 'غسالة ملابس', 'Washing Machine', 'للشقق.', 'For apts.', 3, 5, ['0', '0', '1', '1', '1'], '183', 1800, 'per_unit', 'ffe'),
    createItem('kit-coffee', 'kitchen', 'ماكينة قهوة كبسولات', 'Nespresso Machine', 'أجنحة و VIP.', 'Suites/VIP.', 4, 5, ['0', '0', '0', '1', '1'], '241', 600, 'per_suite_vip', 'ffe'),

    // OS&E
    createItem('kit-pot-set', 'kitchen', 'طقم قدور (Cookware)', 'Cookware Set', 'طبخ.', 'Cooking.', 1, 5, ['1', '1', '1', '1', '1'], '194', 350, 'per_unit', 'ose'),
    createItem('kit-plate', 'kitchen', 'صحون (لكل ضيف)', 'Plates (Per Guest)', 'عشاء/حلا.', 'Dinner/Dessert.', 1, 3, ['1 set', '1 set', '1 set', '1 set', '1 set'], '192', 40, 'per_guest_capacity', 'ose'),
    createItem('kit-cutlery', 'kitchen', 'أدوات مائدة (لكل ضيف)', 'Cutlery (Per Guest)', 'ملعقة/شوكة/سكين.', 'Spoon/Fork/Knife.', 1, 3, ['1 set', '1 set', '1 set', '1 set', '1 set'], '194', 30, 'per_guest_capacity', 'ose'),
    createItem('kit-glass', 'kitchen', 'كاسات (لكل ضيف)', 'Glasses (Per Guest)', 'ماء/عصير.', 'Water/Juice.', 1, 3, ['2', '2', '2', '2', '3'], '194', 15, 'per_guest_capacity', 'ose'),
    createItem('kit-knife-set', 'kitchen', 'طقم سكاكين تحضير', 'Knife Block Set', 'تقطيع.', 'Prep knives.', 2, 3, ['1', '1', '1', '1', '1'], '194', 150, 'per_unit', 'ose'),
    createItem('kit-bin-40l', 'kitchen', 'سلة مهملات مطبخ 40لتر', 'Kitchen Bin 40L', 'كبيرة.', 'Large.', 1, 5, ['1', '1', '1', '1', '1'], '182', 150, 'per_unit', 'ose', {1: {ar: 'بلاستيك', en: 'Plastic'}, 4: {ar: 'ستانلس ستيل', en: 'Stainless Steel'}}),
    createItem('kit-tools', 'kitchen', 'أدوات توزيع', 'Utensils Set', 'مغارف.', 'Ladles etc.', 1, 3, ['1', '1', '1', '1', '1'], '194', 80, 'per_unit', 'ose')
  ],

  // ==========================================
  // 5. BATHROOM
  // ==========================================
  bath: [
    createItem('bath-towel-body', 'bath', 'منشفة استحمام (Par 3)', 'Bath Towel (Par 3)', '3 لكل ضيف.', '3 per guest.', 1, 5, ['3', '3', '3', '3', '3'], '279', 120, 'per_guest_capacity', 'ose'),
    createItem('bath-towel-hand', 'bath', 'منشفة يد (Par 3)', 'Hand Towel (Par 3)', '3 لكل ضيف.', '3 per guest.', 1, 5, ['3', '3', '3', '3', '3'], '279', 60, 'per_guest_capacity', 'ose'),
    createItem('bath-towel-face', 'bath', 'منشفة وجه (Par 3)', 'Face Towel (Par 3)', '3 لكل ضيف.', '3 per guest.', 1, 5, ['3', '3', '3', '3', '3'], '279', 30, 'per_guest_capacity', 'ose'),
    createItem('bath-mat', 'bath', 'دعاسة حمام (Par 3)', 'Bath Mat (Par 3)', '3 لكل حمام.', '3 per bath.', 1, 5, ['3', '3', '3', '3', '3'], '279', 90, 'per_bathroom', 'ose'),
    
    createItem('bath-dryer', 'bath', 'مجفف شعر', 'Hair Dryer', 'استشوار.', 'Dryer.', 2, 2, ['0', '1', '1', '1', '1'], '286', 150, 'per_bathroom', 'ffe'),
    createItem('bath-bin', 'bath', 'سلة مهملات حمام', 'Pedal Bin', 'صغيرة.', 'Small.', 1, 2, ['1', '1', '1', '1', '1'], '290', 50, 'per_bathroom', 'ose'),
    createItem('bath-brush', 'bath', 'فرشاة مرحاض', 'Toilet Brush', 'تنظيف.', 'Cleaning.', 1, 2, ['1', '1', '1', '1', '1'], '287', 40, 'per_bathroom', 'ose'),
    createItem('bath-scale', 'bath', 'ميزان', 'Scale', 'وزن.', 'Weight.', 4, 1, ['0', '0', '0', '1', '1'], '289', 80, 'per_bathroom', 'ose'),
    createItem('bath-robe', 'bath', 'روب استحمام', 'Bathrobe', 'أجنحة و VIP.', 'Suites/VIP.', 4, 2, ['0', '0', '0', '1', '1'], '282', 120, 'per_suite_vip', 'ose')
  ],

  // ==========================================
  // 6. SERVICES & HOUSEKEEPING
  // ==========================================
  services: [
    createItem('hk-cart', 'services', 'عربة تدبير فندقي', 'Housekeeping Cart', 'لكل 15 غرفة.', 'Per 15 rooms.', 1, 5, ['1', '1', '1', '1', '1'], 'Ops', 2500, 'fixed', 'ffe'), // Simplification: Logic handled by fixed base calc or manual override often needed, but here we estimate
    createItem('hk-vac', 'services', 'مكنسة كهربائية صناعية', 'Industrial Vacuum', 'لكل 20 غرفة.', 'Per 20 rooms.', 1, 5, ['1', '1', '1', '1', '1'], 'Ops', 1800, 'fixed', 'ffe'),
    createItem('hk-caddy', 'services', 'سلة منظفات يدوية', 'Maid Caddy', 'للمنظفات.', 'Cleaning kit.', 1, 5, ['2', '2', '3', '4', '5'], 'Ops', 50, 'fixed', 'ose')
  ],

  // ==========================================
  // 7. SAFETY
  // ==========================================
  safety: [
    createItem('saf-ext-rm', 'safety', 'طفاية حريق (غرفة)', 'Room Extinguisher', 'داخل الوحدة.', 'In unit.', 1, 5, ['1', '1', '1', '1', '1'], 'Civil', 150, 'per_unit', 'ffe'),
    createItem('saf-blanket', 'safety', 'بطانية حريق', 'Fire Blanket', 'للمطبخ.', 'Kitchen.', 1, 5, ['1', '1', '1', '1', '1'], 'Civil', 80, 'per_unit', 'ose'),
    createItem('saf-smoke', 'safety', 'كاشف دخان', 'Smoke Detector', 'غرف/صالة.', 'Rooms/Living.', 1, 5, ['1', '1', '1', '2', '2'], 'Civil', 200, 'per_bedroom', 'ffe'), // Rough calc per bedroom
    createItem('saf-aid', 'safety', 'حقيبة إسعافات', 'First Aid Kit', 'للطوارئ.', 'Emergency.', 1, 2, ['0', '0', '1', '1', '1'], '40', 100, 'per_unit', 'ose')
  ],

  food_beverage: [],
  recreation: []
};