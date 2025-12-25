import { StandardsData, StandardItem, StarRating } from '../types';

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
  costType: 'per_room' | 'fixed' | 'per_staff' | 'per_guest' = 'fixed',
  itemType: 'ffe' | 'ose' = 'ffe',
  specs?: Record<StarRating, { ar: string; en: string }>
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
    costType: costType,
    itemType: itemType,
    specsByStar: specs
  };
};

export const initialStandardsData: StandardsData = {
  building: [
    createItem(
      'b-1', 'building', 'مواقف السيارات', 'Parking Spaces',
      'نسبة المواقف المطلوبة.', 'Required parking percentage.',
      1, 5, ['30%', '30%', '50%', '50%', '80%'], '14-16', 0, 'fixed', 'ffe'
    ),
    createItem(
      'b-4', 'building', 'المصاعد', 'Elevators',
      'مصاعد الركاب.', 'Passenger Elevators.',
      1, 10, ['1 elevator', '1 elevator', '2 elevators', '2 elevators', '4 elevators'], '23', 150000, 'fixed', 'ffe',
      {
        1: { ar: 'قياسي - سرعة متوسطة', en: 'Standard - Medium Speed' },
        2: { ar: 'قياسي', en: 'Standard' },
        3: { ar: 'مقصورة ستانلس ستيل', en: 'Stainless Steel Cabin' },
        4: { ar: 'مقصورة بمرآة ودرابزين', en: 'Mirrored, Handrails' },
        5: { ar: 'فاخر - سرعة عالية - تشطيب ذهبي/رخام', en: 'Luxury - High Speed - Gold/Marble Finish' }
      }
    )
  ],
  reception: [
    createItem(
      'rec-1', 'reception', 'طقم كنب اللوبي', 'Lobby Sofa Set',
      'أثاث منطقة الانتظار.', 'Waiting area furniture.',
      1, 10, ['4 seats', '6 seats', '10 seats', '15 seats', '25 seats'], '42', 15000, 'fixed', 'ffe',
      {
        1: { ar: 'قماش صناعي - خشب تجاري', en: 'Synthetic Fabric - Commercial Wood' },
        2: { ar: 'قماش متين', en: 'Durable Fabric' },
        3: { ar: 'قماش عالي الجودة - اسفنج عالي الكثافة', en: 'High Quality Fabric - High Density Foam' },
        4: { ar: 'مخمل / جلد جزئي - تشطيب قشرة خشب', en: 'Velvet/Partial Leather - Veneer Finish' },
        5: { ar: 'جلد طبيعي / حرير - خشب صلب فاخر (بلوط/ماهاجوني)', en: 'Real Leather/Silk - Solid Hardwood (Oak/Mahogany)' }
      }
    ),
    createItem(
      'rec-desk', 'reception', 'كاونتر الاستقبال', 'Reception Desk',
      'مكتب الاستقبال الرئيسي.', 'Main reception desk.',
      1, 5, ['1 unit', '1 unit', '1 unit', '1 unit', '2 units'], '43', 12000, 'fixed', 'ffe',
      {
        1: { ar: 'خشب MDF مصفح', en: 'Laminated MDF' },
        2: { ar: 'خشب MDF', en: 'MDF' },
        3: { ar: 'قشرة خشب طبيعي + سطح زجاجي', en: 'Wood Veneer + Glass Top' },
        4: { ar: 'رخام صناعي + خشب صلب', en: 'Artificial Marble + Solid Wood' },
        5: { ar: 'رخام طبيعي بالكامل + نحاسيات', en: 'Full Natural Marble + Brass Accents' }
      }
    )
  ],
  room: [
    createItem(
      'r-bed', 'room', 'السرير والمرتبة', 'Bed & Mattress',
      'جودة السرير والمرتبة.', 'Bed and Mattress quality.',
      1, 15, ['1 per room', '1 per room', '1 per room', '1 per room', '1 per room'], '128', 2500, 'per_room', 'ffe',
      {
        1: { ar: 'مرتبة نوابض عادية 18سم', en: 'Standard Spring Mattress 18cm' },
        2: { ar: 'مرتبة نوابض 20سم', en: 'Spring Mattress 20cm' },
        3: { ar: 'مرتبة طبية بوكيت سبرينغ 25سم', en: 'Pocket Spring Medical 25cm' },
        4: { ar: 'مرتبة فندقية فاخرة + لبادة 5سم', en: 'Premium Hotel Mattress + 5cm Topper' },
        5: { ar: 'نظام نوم ملكي (مرتبة 35سم + ميموري فوم + ريش نعام)', en: 'Royal Sleep System (35cm + Memory Foam + Down)' }
      }
    ),
    createItem(
      'r-linen', 'room', 'بياضات السرير (طقم)', 'Bed Linen Set',
      'ملاءات، أغطية لحاف، وسائد (لكل سرير).', 'Sheets, duvet covers, pillows (per bed).',
      1, 10, ['2 sets', '2 sets', '3 sets', '3 sets', '4 sets'], '146', 400, 'per_room', 'ose',
      {
        1: { ar: 'بوليستر/قطن - 180 غرزة', en: 'Poly-cotton - 180 TC' },
        2: { ar: 'قطن مخلوط - 200 غرزة', en: 'Cotton Blend - 200 TC' },
        3: { ar: 'قطن 100% - 250 غرزة', en: '100% Cotton - 250 TC' },
        4: { ar: 'قطن مصري - 400 غرزة', en: 'Egyptian Cotton - 400 TC' },
        5: { ar: 'قطن مصري فاخر / حرير - 800+ غرزة', en: 'Luxury Egyptian Cotton/Silk - 800+ TC' }
      }
    ),
    createItem(
      'r-tv', 'room', 'التلفزيون', 'Television',
      'حجم ونوع الشاشة.', 'Screen size and type.',
      1, 4, ['1 per room', '1 per room', '1 per room', '2 per room', '2 per room'], '202', 1500, 'per_room', 'ffe',
      {
        1: { ar: 'LED HD - ماركة تجارية', en: 'LED HD - Commercial Brand' },
        2: { ar: 'LED FHD', en: 'LED FHD' },
        3: { ar: 'Smart TV 4K', en: 'Smart TV 4K' },
        4: { ar: 'Smart TV 4K - ماركة معروفة (Samsung/LG)', en: 'Smart TV 4K - Top Brand' },
        5: { ar: 'OLED/QLED 4K - نظام صوتي سينمائي', en: 'OLED/QLED 4K - Soundbar System' }
      }
    )
  ],
  kitchen: [
    createItem(
      'k-app', 'kitchen', 'الأجهزة الكهربائية', 'Appliances',
      'ثلاجة، غسالة، ميكروويف.', 'Fridge, Washer, Microwave.',
      1, 5, ['1 set', '1 set', '1 set', '1 set', '1 set'], '183', 3500, 'per_room', 'ffe',
      {
        1: { ar: 'ماركات اقتصادية - لون أبيض', en: 'Budget Brands - White' },
        2: { ar: 'ماركات اقتصادية', en: 'Budget Brands' },
        3: { ar: 'ماركات متوسطة - ستيل', en: 'Mid-range - Steel Finish' },
        4: { ar: 'ماركات عالمية - بلت ان (Built-in)', en: 'Global Brands - Built-in' },
        5: { ar: 'ماركات فاخرة (Miele/Bosch) - ذكية', en: 'Luxury Brands (Miele/Bosch) - Smart' }
      }
    ),
    createItem(
      'k-cutlery', 'kitchen', 'طقم أدوات المائدة', 'Cutlery Set',
      'طقم كامل (ملعقة، شوكة، سكين) لكل ضيف.', 'Full set (Spoon, Fork, Knife) per guest.',
      1, 3, ['4 settings', '4 settings', '6 settings', '6 settings', '8 settings'], '194', 150, 'per_room', 'ose',
      {
        1: { ar: 'ستانلس ستيل 18/0 (خفيف)', en: 'Stainless Steel 18/0 (Light)' },
        2: { ar: 'ستانلس ستيل 18/0', en: 'Stainless Steel 18/0' },
        3: { ar: 'ستانلس ستيل 18/10 (متوسط الوزن)', en: 'Stainless Steel 18/10 (Medium Weight)' },
        4: { ar: 'ستانلس ستيل 18/10 (ثقيل) - تصميم مميز', en: 'Stainless Steel 18/10 (Heavy) - Design' },
        5: { ar: 'فضيات أو ستانلس 18/10 مطلي ذهب/تيتانيوم', en: 'Silver Plated or Gold/Titanium Coated' }
      }
    ),
    createItem(
      'k-crockery', 'kitchen', 'أطقم الصحون', 'Crockery (Plates)',
      'صحون عشاء، صحون حلا، أوعية.', 'Dinner plates, desert plates, bowls.',
      1, 3, ['4 settings', '4 settings', '6 settings', '6 settings', '8 settings'], '192', 200, 'per_room', 'ose',
      {
        1: { ar: 'سيراميك تجاري - أبيض سادة', en: 'Commercial Ceramic - Plain White' },
        2: { ar: 'سيراميك مقوى', en: 'Reinforced Ceramic' },
        3: { ar: 'بورسلين عالي الجودة', en: 'High Quality Porcelain' },
        4: { ar: 'بورسلين ناعم (Fine Porcelain) - منقوش', en: 'Fine Porcelain - Patterned' },
        5: { ar: 'بون تشاينا (Bone China) - ماركة عالمية', en: 'Fine Bone China - Luxury Brand' }
      }
    )
  ],
  bath: [
    createItem(
      'bath-towel', 'bath', 'المناشف', 'Towels',
      'مناشف استحمام، وجه، يد (لكل ضيف).', 'Bath towels, face, hand (per guest).',
      1, 4, ['2 sets', '2 sets', '3 sets', '4 sets', '5 sets'], '279', 250, 'per_room', 'ose',
      {
        1: { ar: 'قطن 400 جرام/م2', en: 'Cotton 400 GSM' },
        2: { ar: 'قطن 450 جرام/م2', en: 'Cotton 450 GSM' },
        3: { ar: 'قطن 500 جرام/م2', en: 'Cotton 500 GSM' },
        4: { ar: 'قطن 600 جرام/م2 (فاخر)', en: 'Cotton 600 GSM (Premium)' },
        5: { ar: 'قطن مصري 700+ جرام/م2 (ملكي)', en: 'Egyptian Cotton 700+ GSM (Royal)' }
      }
    ),
    createItem(
      'bath-robe', 'bath', 'أرواب الحمام', 'Bath Robes',
      'روب حمام لكل ضيف.', 'Bath robe per guest.',
      4, 2, ['0 per room', '0 per room', '2 per room', '2 per room', '2 per room'], '282', 150, 'per_room', 'ose',
      {
        1: { ar: '-', en: '-' },
        2: { ar: '-', en: '-' },
        3: { ar: 'وافل خفيف', en: 'Light Waffle' },
        4: { ar: 'تيري (فوطة)', en: 'Terry Cloth' },
        5: { ar: 'قطيفة فاخرة مبطنة', en: 'Lined Velour' }
      }
    ),
    createItem(
      'bath-amenities', 'bath', 'مستلزمات العناية (صابون/شامبو)', 'Toiletries',
      'شامبو، بلسم، صابون، لوشن.', 'Shampoo, conditioner, soap, lotion.',
      1, 5, ['2 sets', '2 sets', '3 sets', '3 sets', '4 sets'], '273', 40, 'per_room', 'ose',
      {
        1: { ar: 'موزع جداري (تعبئة عامة)', en: 'Wall Dispenser (Generic Refill)' },
        2: { ar: 'موزع جداري (نوعية جيدة)', en: 'Wall Dispenser (Good Quality)' },
        3: { ar: 'عبوات صغيرة (ماركة محلية)', en: 'Small Bottles (Local Brand)' },
        4: { ar: 'عبوات صغيرة (ماركة عالمية معروفة)', en: 'Small Bottles (Global Brand)' },
        5: { ar: 'مجموعة فاخرة (Molton Brown / Bulgari / Hermès)', en: 'Luxury Collection (Molton Brown/Hermès)' }
      }
    )
  ],
  food_beverage: [
    createItem(
      'fb-table', 'food_beverage', 'طاولات المطعم', 'Dining Tables',
      'طاولات الطعام في المطعم الرئيسي.', 'Dining tables in main restaurant.',
      0, 5, ['0', '0', '15 tables', '25 tables', '40 tables'], '313', 1200, 'fixed', 'ffe',
      {
        1: { ar: '-', en: '-' },
        2: { ar: '-', en: '-' },
        3: { ar: 'أسطح ميلامين - قواعد حديد', en: 'Melamine Tops - Iron Base' },
        4: { ar: 'أسطح خشب صلب / قشرة جوز', en: 'Solid Wood / Walnut Veneer' },
        5: { ar: 'رخام طبيعي / خشب ماهوجني - قواعد نحاسية', en: 'Natural Marble / Mahogany - Brass Base' }
      }
    )
  ],
  recreation: [
    createItem(
      'rec-gym', 'recreation', 'معدات النادي الصحي', 'Gym Equipment',
      'أجهزة المشي، الدراجات، الأثقال.', 'Treadmills, Bikes, Weights.',
      0, 8, ['0', '0', '4 units', '6 units', '10 units'], '349', 80000, 'fixed', 'ffe',
      {
        1: { ar: '-', en: '-' },
        2: { ar: '-', en: '-' },
        3: { ar: 'أجهزة منزلية متطورة', en: 'High-end Home Equipment' },
        4: { ar: 'أجهزة تجارية (Technogym/LifeFitness)', en: 'Commercial Grade (Technogym)' },
        5: { ar: 'أجهزة تجارية فئة عليا + شاشات تفاعلية', en: 'Top Tier Commercial + Interactive Screens' }
      }
    )
  ],
  safety: [
    createItem(
      'saf-lock', 'safety', 'أقفال الأبواب', 'Door Locks',
      'نظام الدخول للغرف.', 'Room entry system.',
      1, 5, ['1 per room', '1 per room', '1 per room', '1 per room', '1 per room'], '126', 800, 'per_room', 'ffe',
      {
        1: { ar: 'مفتاح عادي / بطاقة مغناطيسية', en: 'Mechanical Key / Magstripe' },
        2: { ar: 'بطاقة مغناطيسية', en: 'Magstripe Card' },
        3: { ar: 'RFID (دون تلامس)', en: 'RFID Contactless' },
        4: { ar: 'RFID + بلوتوث', en: 'RFID + Bluetooth' },
        5: { ar: 'نظام ذكي متكامل (جوال + بصمة + وجه)', en: 'Full Smart System (Mobile/Biometric)' }
      }
    )
  ],
  services: [] 
};
