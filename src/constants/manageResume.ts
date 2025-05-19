export const enum ManageResumeType {
  VISA = 'VISA',
  PERSONALINFORMATION = 'Personal Information',
  INTRODUCTION = 'Introduction',
  WORKEXPERIENCE = 'Work Experience',
  EDUCATION = 'Education',
  LANGUAGE = 'Language',
}

export const EducationLevels = [
  'BACHELOR',
  'ASSOCIATE',
  'HIGHSCHOOL',
  'MASTER',
  'DOCTOR',
];

export type MajorType = {
  ko: string;
  en: string;
};

export const Majors: MajorType[] = [
  { ko: '사업관리', en: 'Business Management' },
  { ko: '경영/회계/사무', en: 'Office & Accounting' },
  { ko: '금융/보험', en: 'Finance & Insurance' },
  { ko: '교육/자연/사회과학', en: 'Education & Research' },
  { ko: '법률/경찰/소방/교도/국방', en: 'Law & Public Safety' },
  { ko: '보건/의료', en: 'Healthcare' },
  { ko: '사회복지/종교', en: 'Social Work & Religion' },
  { ko: '문화/예술/디자인/방송', en: 'Arts & Media' },
  { ko: '운전/운송', en: 'Driving & Delivery' },
  { ko: '영업판매', en: 'Sales' },
  { ko: '경비/청소', en: 'Security & Cleaning' },
  { ko: '이용/숙박/여행/오락/스포츠', en: 'Hospitality & Leisure' },
  { ko: '음식서비스', en: 'Food Service' },
  { ko: '건설', en: 'Construction' },
  { ko: '기계', en: 'Machinery' },
  { ko: '재료', en: 'Materials' },
  { ko: '화학/바이오', en: 'Chemistry & Bio' },
  { ko: '섬유/의복', en: 'Textiles & Fashion' },
  { ko: '전기/전자', en: 'Electronics' },
  { ko: '정보통신', en: 'IT & Telecommunications' },
  { ko: '식품가공', en: 'Food Processing' },
  { ko: '인쇄/목재/가구/공예', en: 'Printing & Craft' },
  { ko: '환경/에너지/안전', en: 'Environment & Safety' },
  { ko: '농림어업', en: 'Agriculture & Fisheries' },
];

// 미리 계산된 파생 값들
export const MajorsKo: string[] = Majors.map((major) => major.ko);
export const MajorsEn: string[] = Majors.map((major) => major.en);
