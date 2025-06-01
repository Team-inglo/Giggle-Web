export const enum ManageResumeType {
  VISA = 'VISA',
  PERSONALINFORMATION = 'Personal Information',
  INTRODUCTION = 'Introduction',
  WORKEXPERIENCE = 'Work Experience',
  EDUCATION = 'Education',
  LANGUAGE = 'Language',
  WORKPREFERENCES = 'Work Preferences',
}

export const EducationLevels = [
  'BACHELOR',
  'ASSOCIATE',
  'HIGHSCHOOL',
  'MASTER',
  'DOCTOR',
];

type MajorType = {
  ko: string;
  en: string;
  enum: string;
};

export const Majors: MajorType[] = [
  { ko: '사업관리', en: 'Business Management', enum: 'BUSINESS_MANAGEMENT' },
  {
    ko: '경영/회계/사무',
    en: 'Office & Accounting',
    enum: 'OFFICE_ACCOUNTING',
  },
  { ko: '금융/보험', en: 'Finance & Insurance', enum: 'FINANCE_INSURANCE' },
  {
    ko: '교육/자연/사회과학',
    en: 'Education & Research',
    enum: 'EDUCATION_RESEARCH',
  },
  {
    ko: '법률/경찰/소방/교도/국방',
    en: 'Law & Public Safety',
    enum: 'LAW_PUBLIC_SAFETY',
  },
  { ko: '보건/의료', en: 'Healthcare', enum: 'HEALTHCARE' },
  {
    ko: '사회복지/종교',
    en: 'Social Work & Religion',
    enum: 'SOCIAL_WORK_RELIGION',
  },
  { ko: '문화/예술/디자인/방송', en: 'Arts & Media', enum: 'ARTS_MEDIA' },
  { ko: '운전/운송', en: 'Driving & Delivery', enum: 'DRIVING_DELIVERY' },
  { ko: '영업판매', en: 'Sales', enum: 'SALES' },
  { ko: '경비/청소', en: 'Security & Cleaning', enum: 'SECURITY_CLEANING' },
  {
    ko: '이용/숙박/여행/오락/스포츠',
    en: 'Hospitality & Leisure',
    enum: 'HOSPITALITY_LEISURE',
  },
  { ko: '음식서비스', en: 'Food Service', enum: 'FOOD_SERVICE' },
  { ko: '건설', en: 'Construction', enum: 'CONSTRUCTION' },
  { ko: '기계', en: 'Machinery', enum: 'MACHINERY' },
  { ko: '재료', en: 'Materials', enum: 'MATERIALS' },
  { ko: '화학/바이오', en: 'Chemistry & Bio', enum: 'CHEMISTRY_BIO' },
  { ko: '섬유/의복', en: 'Textiles & Fashion', enum: 'TEXTILES_FASHION' },
  { ko: '전기/전자', en: 'Electronics', enum: 'ELECTRONICS' },
  {
    ko: '정보통신',
    en: 'IT & Telecommunications',
    enum: 'IT_TELECOMMUNICATIONS',
  },
  { ko: '식품가공', en: 'Food Processing', enum: 'FOOD_PROCESSING' },
  { ko: '인쇄/목재/가구/공예', en: 'Printing & Craft', enum: 'PRINTING_CRAFT' },
  {
    ko: '환경/에너지/안전',
    en: 'Environment & Safety',
    enum: 'ENVIRONMENT_SAFETY',
  },
  {
    ko: '농림어업',
    en: 'Agriculture & Fisheries',
    enum: 'AGRICULTURE_FISHERIES',
  },
];

export const MajorsKo: string[] = Majors.map((major) => major.ko);
export const MajorsEn: string[] = Majors.map((major) => major.en);

type MajorField = keyof MajorType;

const createLookupFunction = (from: MajorField, to: MajorField) => {
  const lookupMap = new Map(Majors.map((major) => [major[from], major[to]]));

  return (value: string): string | undefined => {
    return lookupMap.get(value);
  };
};

// 종류별 변환 함수
export const getKoByEnum = createLookupFunction('enum', 'ko');
export const getEnByEnum = createLookupFunction('enum', 'en');
export const getEnumByKo = createLookupFunction('ko', 'enum');
export const getEnumByEn = createLookupFunction('en', 'enum');
