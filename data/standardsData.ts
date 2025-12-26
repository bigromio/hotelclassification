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
  // 1. المتطلبات العامة & المبنى
  // ==========================================
  building: [
    createItem('1', 'building', 'التراخيص والشهادات', 'Licenses & Certificates', 'جميع التراخيص سارية.', 'All licenses valid.', 1, 2, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '1', 5000, 'fixed', 'ffe', 'general'),
    createItem('2', 'building', 'اللوحة الخارجية ونوع التصنيف', 'Exterior Signage & Classification', 'نوع المرفق وفئته.', 'Facility type & class.', 1, 2, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '2', 8000, 'fixed', 'ffe', 'general'),
    createItem('5', 'building', 'اسم الشقق الفندقية بوضوح', 'Clear Hotel Name', 'على الجزء الخارجي.', 'On exterior.', 1, 2, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '5', 3000, 'fixed', 'ffe', 'general'),
    createItem('6', 'building', 'واجهة المبنى الخارجية نظيفة', 'Clean Facade', 'خالية من العيوب.', 'Defect free.', 1, 2, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '6', 20000, 'fixed', 'ffe', 'general'),
    createItem('7', 'building', 'مدخل نظيف ومميز', 'Distinct Entrance', 'يمكن التعرف عليه.', 'Identifiable.', 1, 2, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '7', 15000, 'fixed', 'ffe', 'general'),
    createItem('8', 'building', 'إضاءة منطقة المدخل', 'Entrance Lighting', 'إضاءة مناسبة.', 'Appropriate lighting.', 1, 2, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '8', 5000, 'fixed', 'ffe', 'general'),
    createItem('23', 'building', 'المصاعد (للضيوف)', 'Guest Elevators', 'واحد على الأقل.', 'At least one.', 1, 10, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '23', 180000, 'fixed', 'ffe', 'general'),
    createItem('32', 'building', 'مصعد مخصص للموظفين', 'Staff Elevator', 'منفصل.', 'Separate.', 5, 5, ['-', '-', '-', 'إلزامي', 'إلزامي'], '32', 150000, 'fixed', 'ffe', 'general'),
    createItem('33', 'building', 'مدخل للمورد', 'Supplier Entrance', 'للمباني >20 غرفة.', '>20 rooms.', 3, 5, ['-', '-', 'إلزامي', 'إلزامي', 'إلزامي'], '33', 10000, 'fixed', 'ffe', 'general'),
  ],

  // ==========================================
  // 2. الاستقبال والخدمات
  // ==========================================
  reception: [
    createItem('37', 'reception', 'برنامج تسجيل إلكتروني (شموس)', 'Electronic Registration', 'ربط مع الرصد السياحي.', 'Tourism monitoring.', 1, 2, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '37', 5000, 'fixed', 'ffe', 'reception_desk'),
    createItem('43', 'reception', 'كاونتر الاستقبال الرئيسي', 'Main Reception Desk', 'المنطقة الرئيسية.', 'Main area.', 1, 2, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '43', 15000, 'fixed', 'ffe', 'reception_desk'),
    createItem('45', 'reception', 'أثاث منطقة الاستقبال', 'Reception Furniture', 'كنب ومقاعد.', 'Sofas & Seating.', 1, 2, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '45', 25000, 'fixed', 'ffe', 'reception_lobby'),
    createItem('46', 'reception', 'تجهيزات كوفي شوب البهو', 'Lobby Cafe Equipment', 'ماكينة قهوة، ثلاجات.', 'Coffee machine, fridges.', 4, 5, ['-', '-', 'إلزامي', 'إلزامي', 'إلزامي'], '46', 35000, 'fixed', 'ffe', 'coffee_shop'),
    createItem('67', 'reception', 'تجهيز غرفة حفظ الأمتعة', 'Luggage Room Fitout', 'أرفف حماية.', 'Shelving.', 3, 5, ['-', '-', 'إلزامي', 'إلزامي', 'إلزامي'], '67', 5000, 'fixed', 'ffe', 'reception_back'),
    createItem('96', 'reception', 'تجهيز دورات مياه عامة', 'Public Toilets Fitout', 'رجال/نساء.', 'M/F.', 1, 2, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '96', 20000, 'fixed', 'ffe', 'public_toilets'),
  ],

  // ==========================================
  // 3. الغرف (تجهيزات داخل الوحدات) - Variable based on keys
  // ==========================================
  room: [
    createItem('128', 'room', 'مرتبة سرير (فندقية)', 'Hotel Mattress', 'حسب المواصفات.', 'Per specs.', 1, 3, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '128', 1200, 'per_single_bed', 'ffe', 'bedroom'),
    createItem('146', 'room', 'بياضات سرير (طقم كامل)', 'Bed Linen Set', 'Par 3.', 'Par 3.', 1, 2, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '146', 400, 'per_single_bed', 'ose', 'bedroom'),
    createItem('155', 'room', 'ستائر وتعتيم', 'Curtains & Blackout', 'لكل نافذة.', 'Per window.', 1, 1, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '155', 1500, 'per_bedroom', 'ffe', 'bedroom'),
    createItem('162', 'room', 'خزانة مالبس', 'Wardrobe', 'سعة مناسبة.', 'Good capacity.', 1, 1, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '162', 2000, 'per_bedroom', 'ffe', 'bedroom'),
    createItem('169', 'room', 'طاولة مكتب وكرسي', 'Desk & Chair', 'مساحة عمل.', 'Work space.', 3, 5, ['-', '-', 'إلزامي', 'إلزامي', 'إلزامي'], '169', 1800, 'per_unit', 'ffe', 'living'),
    createItem('202', 'room', 'تلفزيون ذكي', 'Smart TV', '40 بوصة+.', '40 inch+.', 3, 2, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '202', 1500, 'per_unit', 'ffe', 'living'),
    createItem('203', 'room', 'خزنة داخل الغرفة', 'In-Room Safe', 'للمقتنيات.', 'Valuables.', 1, 1, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '203', 450, 'per_unit', 'ffe', 'bedroom'),
    createItem('209', 'room', 'وحدة تكييف منفصلة', 'Split AC Unit', 'إذا لم يوجد مركزي.', 'If no central.', 1, 10, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '209', 2500, 'per_unit', 'ffe', 'general'),
    createItem('240', 'room', 'صينية ضيافة وغلاية', 'Hospitality Tray', 'شاي وقهوة.', 'Tea/Coffee.', 3, 4, ['-', '-', 'إلزامي', 'إلزامي', 'إلزامي'], '240', 300, 'per_unit', 'ose', 'living'),
  ],

  // ==========================================
  // 4. المطابخ (مقسمة: مركزي ووحدات)
  // ==========================================
  kitchen: [
    // --- Central / Commercial Kitchen (Fixed Assets) ---
    createItem('cen-kit-hood', 'kitchen', 'نظام تهوية وشفط مركزي (تجاري)', 'Commercial Hood System', 'للمطبخ الرئيسي.', 'Main Kitchen.', 4, 10, ['-', '-', '-', 'إلزامي', 'إلزامي'], '313', 45000, 'fixed', 'ffe', 'central_kitchen'),
    createItem('cen-kit-oven', 'kitchen', 'فرن كومبي (Combi Oven)', 'Combi Oven', 'للمطعم الرئيسي.', 'Main Rest.', 4, 10, ['-', '-', '-', 'إلزامي', 'إلزامي'], '313', 35000, 'fixed', 'ffe', 'central_kitchen'),
    createItem('cen-kit-range', 'kitchen', 'خط طبخ صناعي (Cooking Range)', 'Commercial Range', 'عيون وشواية.', 'Burners/Grill.', 4, 10, ['-', '-', '-', 'إلزامي', 'إلزامي'], '313', 25000, 'fixed', 'ffe', 'central_kitchen'),
    createItem('cen-kit-fridge', 'kitchen', 'غرف تبريد وتجميد (Walk-in)', 'Walk-in Cold Rooms', 'للمخزون.', 'Inventory.', 4, 10, ['-', '-', '-', 'إلزامي', 'إلزامي'], '313', 50000, 'fixed', 'ffe', 'central_kitchen'),
    createItem('cen-kit-prep', 'kitchen', 'طاولات تحضير ستانلس ستيل', 'SS Prep Tables', 'تجهيز.', 'Prep.', 4, 10, ['-', '-', '-', 'إلزامي', 'إلزامي'], '313', 15000, 'fixed', 'ffe', 'central_kitchen'),
    createItem('cen-kit-wash', 'kitchen', 'خط غسيل صحون (Dishwashing)', 'Commercial Dishwasher', 'Pass-through.', 'Pass-through.', 4, 10, ['-', '-', '-', 'إلزامي', 'إلزامي'], '313', 28000, 'fixed', 'ffe', 'central_kitchen'),

    // --- In-Unit Kitchenettes (Variable Assets) ---
    createItem('unit-kit-fridge', 'kitchen', 'ثلاجة وحدة سكنية', 'Unit Refrigerator', 'في كل غرفة.', 'Per room.', 1, 2, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '187', 1800, 'per_unit', 'ffe', 'unit_kitchen'),
    createItem('unit-kit-micro', 'kitchen', 'مايكروويف', 'Microwave', 'للتسخين.', 'Heating.', 1, 2, ['-', '-', 'إلزامي', 'إلزامي', 'إلزامي'], '190', 600, 'per_unit', 'ffe', 'unit_kitchen'),
    createItem('unit-kit-stove', 'kitchen', 'موقد كهربائي (عينين)', 'Electric Hob (2)', 'للمطبخ الصغير.', 'Kitchenette.', 1, 2, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '183', 900, 'per_unit', 'ffe', 'unit_kitchen'),
    createItem('unit-kit-ware', 'kitchen', 'أواني طهي ومائدة', 'Cookware & Cutlery', 'طقم للضيوف.', 'Guest set.', 1, 1, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '192', 500, 'per_unit', 'ose', 'unit_kitchen'),
    createItem('unit-kit-wash', 'kitchen', 'غسالة ملابس (أجنحة)', 'Washing Machine', 'داخل الجناح.', 'In Suite.', 4, 2, ['-', '-', '-', 'إلزامي', 'إلزامي'], '191', 2200, 'per_suite_vip', 'ffe', 'unit_kitchen'),
  ],

  // ==========================================
  // 5. الحمام (داخل الوحدة)
  // ==========================================
  bath: [
    createItem('247', 'bath', 'تجهيز حمام كامل (صحي)', 'Sanitary Ware Set', 'مرحاض، دش، مغسلة.', 'WC, Shower, Basin.', 1, 1, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '247', 4000, 'per_bathroom', 'ffe', 'unit_bath'),
    createItem('261', 'bath', 'مرآة حمام', 'Vanity Mirror', 'فوق المغسلة.', 'Over basin.', 1, 1, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '261', 400, 'per_bathroom', 'ffe', 'unit_bath'),
    createItem('286', 'bath', 'مجفف شعر (استشوار)', 'Hair Dryer', 'في الحمام.', 'In bath.', 3, 2, ['-', '-', 'إلزامي', 'إلزامي', 'إلزامي'], '286', 150, 'per_bathroom', 'ffe', 'unit_bath'),
    createItem('279', 'bath', 'طقم مناشف (Par 3)', 'Towels Set (Par 3)', '3 أطقم للدوران.', '3 sets rotation.', 1, 1, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '279', 200, 'per_guest_capacity', 'ose', 'unit_bath'),
  ],

  // ==========================================
  // 6. الأغذية والمشروبات (أثاث ومعدات المطعم + كوفي شوب + خدمة غرف)
  // ==========================================
  food_beverage: [
    // --- Restaurant (Fixed) ---
    createItem('rest-furn', 'food_beverage', 'أثاث المطعم الرئيسي (طاولات وكراسي)', 'Restaurant Furniture', 'حسب السعة المقدرة.', 'Based on capacity.', 4, 10, ['-', '-', '-', 'إلزامي', 'إلزامي'], '313', 60000, 'fixed', 'ffe', 'restaurant'),
    createItem('rest-buffet', 'food_beverage', 'كاونتر بوفيه (مبرد/ساخن)', 'Buffet Counters', 'لإفطار الصباح.', 'Breakfast.', 3, 1, ['-', '-', 'إلزامي', 'إلزامي', 'إلزامي'], '307', 25000, 'fixed', 'ffe', 'restaurant'),
    createItem('rest-ose', 'food_beverage', 'معدات تشغيل المطعم (OS&E)', 'Restaurant OS&E', 'أطباق، كاسات، فضيات.', 'China, Glass, Silver.', 4, 5, ['-', '-', '-', 'إلزامي', 'إلزامي'], '313', 20000, 'fixed', 'ose', 'restaurant'),

    // --- Coffee Shop (Fixed) ---
    createItem('coffee-machine', 'food_beverage', 'ماكينة إسبريسو احترافية', 'Espresso Machine 2-Group', 'للكوفي شوب.', 'For Coffee Shop.', 4, 10, ['-', '-', '-', 'إلزامي', 'إلزامي'], '318', 25000, 'fixed', 'ffe', 'coffee_shop'),
    createItem('coffee-grinder', 'food_beverage', 'طاحونة قهوة', 'Coffee Grinder', 'للبن الطازج.', 'Fresh beans.', 4, 5, ['-', '-', '-', 'إلزامي', 'إلزامي'], '318', 4000, 'fixed', 'ffe', 'coffee_shop'),
    createItem('coffee-display', 'food_beverage', 'ثلاجة عرض حلويات', 'Pastry Display Fridge', 'للكعك والحلويات.', 'Cakes/Sweets.', 4, 5, ['-', '-', '-', 'إلزامي', 'إلزامي'], '318', 12000, 'fixed', 'ffe', 'coffee_shop'),

    // --- Room Service (Operational/Fixed) ---
    createItem('rs-trolley', 'food_beverage', 'عربات خدمة الغرف (تسخين)', 'Room Service Trolleys', 'بعيون تسخين.', 'With warmer.', 4, 5, ['-', '-', '-', 'إلزامي', 'إلزامي'], '311', 3500, 'fixed', 'ffe', 'room_service'), // Estimating 2-3 per hotel
    createItem('rs-trays', 'food_beverage', 'صواني خدمة الغرف (OS&E)', 'Room Service Trays', 'طقم كامل.', 'Full set.', 4, 3, ['-', '-', '-', 'إلزامي', 'إلزامي'], '311', 200, 'per_unit', 'ose', 'room_service'),
  ],

  // ==========================================
  // 7. المؤتمرات واالحتفالات
  // ==========================================
  conferences: [
    createItem('326', 'conferences', 'تجهيز قاعة احتفالات (50 شخص)', 'Banquet Hall Fitout', 'صوتيات، أثاث.', 'AV, Furniture.', 0, 5, ['-', '-', '-', '5', '-'], '326', 80000, 'fixed', 'ffe', 'banquet'),
    createItem('329', 'conferences', 'تجهيز قاعة اجتماعات (36م²)', 'Meeting Room Fitout', 'طاولة، كراسي، شاشة.', 'Table, Chairs, TV.', 4, 10, ['-', '-', '-', '10', '20'], '329', 30000, 'fixed', 'ffe', 'meeting'),
  ],

  // ==========================================
  // 8. الترفيه والصحة
  // ==========================================
  recreation: [
    createItem('348', 'recreation', 'تجهيز نادي رياضي (أجهزة)', 'Gym Equipment Package', 'مشاية، دراجة، أثقال.', 'Treadmill, Bike, Weights.', 4, 4, ['-', '-', '-', 'إلزامي', '8'], '348', 60000, 'fixed', 'ffe', 'gym'),
    createItem('358', 'recreation', 'معدات المسبح (فلاتر ومضخات)', 'Pool Mechanical Equip', 'للتشغيل.', 'Operation.', 4, 10, ['-', '-', '-', 'إلزامي', 'إلزامي'], '358', 45000, 'fixed', 'ffe', 'pool'),
    createItem('358-furn', 'recreation', 'أثاث المسبح (كراسي تشميس)', 'Pool Furniture', 'كراسي ومظلات.', 'Loungers.', 4, 5, ['-', '-', '-', 'إلزامي', 'إلزامي'], '358', 15000, 'fixed', 'ffe', 'pool'),
    createItem('363', 'recreation', 'تجهيز منطقة ألعاب أطفال', 'Kids Area Equipment', 'ألعاب آمنة.', 'Safe toys.', 1, 4, ['-', '4', '4', '4', '4'], '363', 12000, 'fixed', 'ffe', 'kids'),
  ],

  // ==========================================
  // 9. الخدمات (التدبير والصيانة)
  // ==========================================
  services: [
    createItem('hk-trolley', 'services', 'عربة تدبير فندقي', 'HK Trolley', 'لكل 15 غرفة.', '1 per 15 rooms.', 1, 5, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], 'hk-trolley', 2500, 'per_staff', 'ffe', 'housekeeping'),
    createItem('hk-vac', 'services', 'مكنسة كهربائية صناعية', 'Industrial Vacuum', 'لكل 15 غرفة.', '1 per 15 rooms.', 1, 5, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], 'hk-vac', 1200, 'per_staff', 'ffe', 'housekeeping'),
    createItem('laundry-equip', 'services', 'معدات مغسلة مركزية (غسيل وكوي)', 'Central Laundry Equip', 'غسالات ونشافات.', 'Washers/Dryers.', 5, 10, ['-', '-', '-', '10', '10'], '36', 80000, 'fixed', 'ffe', 'laundry'),
  ],

  quality: [], 
  safety: [
    createItem('40', 'safety', 'حقيبة إسعافات + صدمات قلب', 'First Aid & AED', 'واحدة للاستقبال.', 'One at Reception.', 1, 2, ['إلزامي', 'إلزامي', 'إلزامي', 'إلزامي', 'إلزامي'], '40', 8000, 'fixed', 'ffe', 'general'),
  ]
};