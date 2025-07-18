import { EmployeeSearchFilterItemType } from '@/types/api/resumes';

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
  'Bachelor',
  'Associate',
  'Highschool',
  'Master',
  'Doctor',
];

export type KoEnEnumType = {
  ko: string;
  en: string;
  enum: string;
};

// 비자
export const Visas: KoEnEnumType[] = [
  { ko: 'D-2', en: 'D-2', enum: 'D_2' },
  { ko: 'D-4', en: 'D-4', enum: 'D_4' },
  { ko: 'D-10', en: 'D-10', enum: 'D_10' },
  { ko: 'C-4', en: 'C-4', enum: 'C_4' },
  { ko: 'F-2', en: 'F-2', enum: 'F_2' },
  { ko: 'F-4', en: 'F-4', enum: 'F_4' },
  { ko: 'F-5', en: 'F-5', enum: 'F_5' },
  { ko: 'F-6', en: 'F-6', enum: 'F_6' },
  { ko: 'H-1', en: 'H-1', enum: 'H_1' },
];

// 한국어 사용 능력
export const Koreans: KoEnEnumType[] = [
  { ko: '전혀 불가능', en: 'none', enum: 'NONE' },
  { ko: '간단한 해석 가능', en: 'basic', enum: 'BASIC' },
  { ko: '의사소통 가능', en: 'communicate', enum: 'COMMUNICATE' },
  { ko: '업무 능숙', en: 'working', enum: 'WORKING' },
  { ko: '고급 구사 가능', en: 'advanced', enum: 'ADVANCED' },
  { ko: '원어민 수준', en: 'native', enum: 'NATIVE' },
];

// 전공
export const Majors: KoEnEnumType[] = [
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

// 국적
export const Nationalities: KoEnEnumType[] = [
  { ko: '가나', en: 'Ghana', enum: 'GHANA' },
  { ko: '가봉', en: 'Gabon', enum: 'GABON' },
  { ko: '가이아나', en: 'Guyana', enum: 'GUYANA' },
  { ko: '감비아', en: 'Gambia', enum: 'GAMBIA' },
  { ko: '과테말라', en: 'Guatemala', enum: 'GUATEMALA' },
  { ko: '괌', en: 'Guam', enum: 'GUAM' },
  { ko: '그레나다', en: 'Grenada', enum: 'GRENADA' },
  { ko: '그리스', en: 'Greece', enum: 'GREECE' },
  { ko: '그린란드', en: 'Greenland', enum: 'GREENLAND' },
  { ko: '기니', en: 'Guinea', enum: 'GUINEA' },
  { ko: '기니비사우', en: 'Guinea-Bissau', enum: 'GUINEA_BISSAU' },
  { ko: '나미비아', en: 'Namibia', enum: 'NAMIBIA' },
  { ko: '나우루', en: 'Nauru', enum: 'NAURU' },
  { ko: '나이지리아', en: 'Nigeria', enum: 'NIGERIA' },
  { ko: '남극', en: 'Antarctica', enum: 'ANTARCTICA' },
  {
    ko: '남수단',
    en: 'Republic of South Sudan',
    enum: 'REPUBLIC_OF_SOUTH_SUDAN',
  },
  { ko: '남아프리카 공화국', en: 'South Africa', enum: 'SOUTH_AFRICA' },
  { ko: '네덜란드', en: 'Netherlands', enum: 'NETHERLANDS' },
  {
    ko: '네덜란드령 안틸레스',
    en: 'Netherlands Antilles',
    enum: 'NETHERLANDS_ANTILLES',
  },
  { ko: '네팔', en: 'Nepal', enum: 'NEPAL' },
  { ko: '노르웨이', en: 'Norway', enum: 'NORWAY' },
  { ko: '노퍽섬', en: 'Norfolk Island', enum: 'NORFOLK_ISLAND' },
  { ko: '뉴칼레도니아', en: 'New Caledonia', enum: 'NEW_CALEDONIA' },
  { ko: '뉴질랜드', en: 'New Zealand', enum: 'NEW_ZEALAND' },
  { ko: '니우에', en: 'Niue', enum: 'NIUE' },
  { ko: '니제르', en: 'Niger', enum: 'NIGER' },
  { ko: '니카라과', en: 'Nicaragua', enum: 'NICARAGUA' },
  { ko: '대한민국', en: 'Republic of Korea', enum: 'REPUBLIC_OF_KOREA' },
  { ko: '덴마크', en: 'Denmark', enum: 'DENMARK' },
  {
    ko: '도미니카 공화국',
    en: 'Dominican Republic',
    enum: 'DOMINICAN_REPUBLIC',
  },
  { ko: '도미니카 연방', en: 'Dominica', enum: 'DOMINICA' },
  { ko: '독일', en: 'Germany', enum: 'GERMANY' },
  { ko: '동티모르', en: 'East Timor', enum: 'EAST_TIMOR' },
  {
    ko: '라오스 인민 민주 공화국',
    en: "Lao People's Democratic Republic",
    enum: 'LAO_PEOPLES_DEMOCRATIC_REPUBLIC',
  },
  { ko: '라이베리아', en: 'Liberia', enum: 'LIBERIA' },
  { ko: '라트비아', en: 'Latvia', enum: 'LATVIA' },
  { ko: '러시아 연방', en: 'Russian Federation', enum: 'RUSSIAN_FEDERATION' },
  { ko: '레바논', en: 'Lebanon', enum: 'LEBANON' },
  { ko: '레소토', en: 'Lesotho', enum: 'LESOTHO' },
  { ko: '레위니옹', en: 'Reunion', enum: 'REUNION' },
  { ko: '루마니아', en: 'Romania', enum: 'ROMANIA' },
  { ko: '룩셈부르크', en: 'Luxembourg', enum: 'LUXEMBOURG' },
  { ko: '르완다', en: 'Rwanda', enum: 'RWANDA' },
  {
    ko: '리비아 아랍 자마히리야',
    en: 'Libyan Arab Jamahiriya',
    enum: 'LIBYAN_ARAB_JAMAHIRIYA',
  },
  { ko: '리투아니아', en: 'Lithuania', enum: 'LITHUANIA' },
  { ko: '리히텐슈타인', en: 'Liechtenstein', enum: 'LIECHTENSTEIN' },
  { ko: '마다가스카르', en: 'Madagascar', enum: 'MADAGASCAR' },
  { ko: '마르티니크', en: 'Martinique', enum: 'MARTINIQUE' },
  { ko: '마셜 제도', en: 'Marshall Islands', enum: 'MARSHALL_ISLANDS' },
  { ko: '마요트', en: 'Mayotte', enum: 'MAYOTTE' },
  { ko: '마카오', en: 'Macau', enum: 'MACAU' },
  {
    ko: '마카오 공화국',
    en: 'Republic of Macedonia',
    enum: 'REPUBLIC_OF_MACEDONIA',
  },
  { ko: '말라위', en: 'Malawi', enum: 'MALAWI' },
  { ko: '말레이시아', en: 'Malaysia', enum: 'MALAYSIA' },
  { ko: '말리', en: 'Mali', enum: 'MALI' },
  { ko: '맨섬', en: 'Isle of Man', enum: 'ISLE_OF_MAN' },
  { ko: '멕시코', en: 'Mexico', enum: 'MEXICO' },
  { ko: '모나코', en: 'Monaco', enum: 'MONACO' },
  { ko: '모로코', en: 'Morocco', enum: 'MOROCCO' },
  { ko: '모리셔스', en: 'Mauritius', enum: 'MAURITIUS' },
  { ko: '모리타니', en: 'Mauritania', enum: 'MAURITANIA' },
  { ko: '모잠비크', en: 'Mozambique', enum: 'MOZAMBIQUE' },
  { ko: '몬테네그로', en: 'Montenegro', enum: 'MONTENEGRO' },
  { ko: '몬트세라트', en: 'Montserrat', enum: 'MONTSERRAT' },
  {
    ko: '몰도바 공화국',
    en: 'Moldova, Republic of',
    enum: 'MOLDOVA_REPUBLIC_OF',
  },
  { ko: '몰디브', en: 'Maldives', enum: 'MALDIVES' },
  { ko: '몰타', en: 'Malta', enum: 'MALTA' },
  { ko: '몽골', en: 'Mongolia', enum: 'MONGOLIA' },
  { ko: '미국', en: 'United States', enum: 'UNITED_STATES' },
  {
    ko: '미국령 군소 제도',
    en: 'United States Minor Outlying Islands',
    enum: 'UNITED_STATES_MINOR_OUTLYING_ISLANDS',
  },
  {
    ko: '미국령 버진아일랜드',
    en: 'Virgin Islands, U.S.',
    enum: 'VIRGIN_ISLANDS_US',
  },
  { ko: '미얀마', en: 'Myanmar', enum: 'MYANMAR' },
  { ko: '미크로네시아 연방', en: 'Micronesia', enum: 'MICRONESIA' },
  { ko: '바누아투', en: 'Vanuatu', enum: 'VANUATU' },
  { ko: '바레인', en: 'Bahrain', enum: 'BAHRAIN' },
  { ko: '바베이도스', en: 'Barbados', enum: 'BARBADOS' },
  { ko: '바티칸 시국', en: 'Vatican City State', enum: 'VATICAN_CITY_STATE' },
  { ko: '바하마', en: 'Bahamas', enum: 'BAHAMAS' },
  { ko: '방글라데시', en: 'Bangladesh', enum: 'BANGLADESH' },
  { ko: '버뮤다', en: 'Bermuda', enum: 'BERMUDA' },
  { ko: '베냉', en: 'Benin', enum: 'BENIN' },
  { ko: '베네수엘라', en: 'Venezuela', enum: 'VENEZUELA' },
  { ko: '베트남', en: 'Viet Nam', enum: 'VIET_NAM' },
  { ko: '벨기에', en: 'Belgium', enum: 'BELGIUM' },
  { ko: '벨라루스', en: 'Belarus', enum: 'BELARUS' },
  { ko: '벨리즈', en: 'Belize', enum: 'BELIZE' },
  {
    ko: '보스니아 헤르체고비나',
    en: 'Bosnia Herzegovina',
    enum: 'BOSNIA_HERZEGOVINA',
  },
  { ko: '보츠와나', en: 'Botswana', enum: 'BOTSWANA' },
  { ko: '볼리비아', en: 'Bolivia', enum: 'BOLIVIA' },
  { ko: '부룬디', en: 'Burundi', enum: 'BURUNDI' },
  { ko: '부르키나파소', en: 'Burkina Faso', enum: 'BURKINA_FASO' },
  { ko: '부베 섬', en: 'Bouvet Island', enum: 'BOUVET_ISLAND' },
  { ko: '부탄', en: 'Bhutan', enum: 'BHUTAN' },
  {
    ko: '북마리아나 제도',
    en: 'Northern Mariana Islands',
    enum: 'NORTHERN_MARIANA_ISLANDS',
  },
  { ko: '불가리아', en: 'Bulgaria', enum: 'BULGARIA' },
  { ko: '브라질', en: 'Brazil', enum: 'BRAZIL' },
  {
    ko: '브루나이 다루살람',
    en: 'Brunei Darussalam',
    enum: 'BRUNEI_DARUSSALAM',
  },
  { ko: '사모아', en: 'Samoa', enum: 'SAMOA' },
  { ko: '사우디아라비아', en: 'Saudi Arabia', enum: 'SAUDI_ARABIA' },
  {
    ko: '사우스조지아 사우스샌드위치 제도',
    en: 'South Georgia and the South Sandwich Islands',
    enum: 'SOUTH_GEORGIA_AND_THE_SOUTH_SANDWICH_ISLANDS',
  },
  { ko: '산마리아', en: 'San Marino', enum: 'SAN_MARINO' },
  {
    ko: '상투메 프린시페',
    en: 'Sao Tome and Principe',
    enum: 'SAO_TOME_AND_PRINCIPE',
  },
  {
    ko: '생피에르 미클롱',
    en: 'St. Pierre and Miquelon',
    enum: 'ST_PIERRE_AND_MIQUELON',
  },
  { ko: '서사하라', en: 'Western Sahara', enum: 'WESTERN_SAHARA' },
  { ko: '세네갈', en: 'Senegal', enum: 'SENEGAL' },
  { ko: '세르비아', en: 'Serbia', enum: 'SERBIA' },
  { ko: '세이셸', en: 'Seychelles', enum: 'SEYCHELLES' },
  { ko: '세인트루시아', en: 'Saint Lucia', enum: 'SAINT_LUCIA' },
  {
    ko: '세인트빈센트 그레나딘',
    en: 'Saint Vincent and the Grenadines',
    enum: 'SAINT_VINCENT_AND_THE_GRENADINES',
  },
  {
    ko: '세인트키츠 네비스',
    en: 'Saint Kitts and Nevis',
    enum: 'SAINT_KITTS_AND_NEVIS',
  },
  { ko: '세인트헬레나', en: 'St. Helena', enum: 'ST_HELENA' },
  { ko: '소말리아', en: 'Somalia', enum: 'SOMALIA' },
  { ko: '솔로몬 제도', en: 'Solomon Islands', enum: 'SOLOMON_ISLANDS' },
  { ko: '수단', en: 'Sudan', enum: 'SUDAN' },
  { ko: '수리남', en: 'Suriname', enum: 'SURINAME' },
  { ko: '스리랑카', en: 'Sri Lanka', enum: 'SRI_LANKA' },
  {
    ko: '스발바르 얀마옌 제도',
    en: 'Svalbard and Jan Mayen Islands',
    enum: 'SVALBARD_AND_JAN_MAYEN_ISLANDS',
  },
  { ko: '스와질란드', en: 'Swaziland', enum: 'SWAZILAND' },
  { ko: '스웨덴', en: 'Sweden', enum: 'SWEDEN' },
  { ko: '스위스', en: 'Switzerland', enum: 'SWITZERLAND' },
  { ko: '스페인', en: 'Spain', enum: 'SPAIN' },
  { ko: '슬로바키아', en: 'Slovakia', enum: 'SLOVAKIA' },
  { ko: '슬로베니아', en: 'Slovenia', enum: 'SLOVENIA' },
  {
    ko: '시리아 아랍 공화국',
    en: 'Syrian Arab Republic',
    enum: 'SYRIAN_ARAB_REPUBLIC',
  },
  { ko: '시에라리온', en: 'Sierra Leone', enum: 'SIERRA_LEONE' },
  { ko: '싱가포르', en: 'Singapore', enum: 'SINGAPORE' },
  {
    ko: '아랍에미리트',
    en: 'United Arab Emirates',
    enum: 'UNITED_ARAB_EMIRATES',
  },
  { ko: '아루바', en: 'Aruba', enum: 'ARUBA' },
  { ko: '아르메니아', en: 'Armenia', enum: 'ARMENIA' },
  { ko: '아르헨티나', en: 'Argentina', enum: 'ARGENTINA' },
  { ko: '아메리칸 사모아', en: 'American Samoa', enum: 'AMERICAN_SAMOA' },
  { ko: '아이슬란드', en: 'Iceland', enum: 'ICELAND' },
  { ko: '아이티', en: 'Haiti', enum: 'HAITI' },
  { ko: '아일랜드', en: 'Ireland', enum: 'IRELAND' },
  { ko: '아제르바이잔', en: 'Azerbaijan', enum: 'AZERBAIJAN' },
  { ko: '아프가니스탄', en: 'Afghanistan', enum: 'AFGHANISTAN' },
  { ko: '안도라', en: 'Andorra', enum: 'ANDORRA' },
  { ko: '알바니아', en: 'Albania', enum: 'ALBANIA' },
  { ko: '알제리', en: 'Algeria', enum: 'ALGERIA' },
  { ko: '앙골라', en: 'Angola', enum: 'ANGOLA' },
  {
    ko: '앤티가 바부다',
    en: 'Antigua and Barbuda',
    enum: 'ANTIGUA_AND_BARBUDA',
  },
  { ko: '앵귈라', en: 'Anguilla', enum: 'ANGUILLA' },
  { ko: '에리트레아', en: 'Eritrea', enum: 'ERITREA' },
  { ko: '에스토니아', en: 'Estonia', enum: 'ESTONIA' },
  { ko: '에콰도르', en: 'Ecuador', enum: 'ECUADOR' },
  { ko: '에티오피아', en: 'Ethiopia', enum: 'ETHIOPIA' },
  { ko: '엘살바도르', en: 'El Salvador', enum: 'EL_SALVADOR' },
  { ko: '영국', en: 'United Kingdom', enum: 'UNITED_KINGDOM' },
  {
    ko: '영국령 버진아일랜드',
    en: 'Virgin Islands, British',
    enum: 'VIRGIN_ISLANDS_BRITISH',
  },
  {
    ko: '영국령 인도양 지역',
    en: 'British Indian Ocean Territory',
    enum: 'BRITISH_INDIAN_OCEAN_TERRITORY',
  },
  { ko: '예멘', en: 'Yemen Republic of', enum: 'YEMEN_REPUBLIC_OF' },
  { ko: '오만', en: 'Oman', enum: 'OMAN' },
  { ko: '오스트레일리아', en: 'Australia', enum: 'AUSTRALIA' },
  { ko: '오스트리아', en: 'Austria', enum: 'AUSTRIA' },
  { ko: '온두라스', en: 'Honduras', enum: 'HONDURAS' },
  { ko: '올란드 제도', en: 'Aland Islands', enum: 'ALAND_ISLANDS' },
  {
    ko: '왈리스 푸투나 제도',
    en: 'Wallis and Futuna Islands',
    enum: 'WALLIS_AND_FUTUNA_ISLANDS',
  },
  { ko: '요르단', en: 'Jordan', enum: 'JORDAN' },
  { ko: '우간다', en: 'Uganda', enum: 'UGANDA' },
  { ko: '우루과이', en: 'Uruguay', enum: 'URUGUAY' },
  { ko: '우즈베키스탄', en: 'Uzbekistan', enum: 'UZBEKISTAN' },
  { ko: '우크라이나', en: 'Ukraine', enum: 'UKRAINE' },
  { ko: '이라크', en: 'Iraq', enum: 'IRAQ' },
  { ko: '이란', en: 'Iran', enum: 'IRAN' },
  { ko: '이스라엘', en: 'Israel', enum: 'ISRAEL' },
  { ko: '이집트', en: 'Egypt', enum: 'EGYPT' },
  { ko: '이탈리아', en: 'Italy', enum: 'ITALY' },
  { ko: '인도', en: 'India', enum: 'INDIA' },
  { ko: '인도네시아', en: 'Indonesia', enum: 'INDONESIA' },
  { ko: '일본', en: 'Japan', enum: 'JAPAN' },
  { ko: '자메이카', en: 'Jamaica', enum: 'JAMAICA' },
  { ko: '잠비아', en: 'Zambia', enum: 'ZAMBIA' },
  { ko: '저지', en: 'Jersey', enum: 'JERSEY' },
  { ko: '적도 기니', en: 'Equatorial Guinea', enum: 'EQUATORIAL_GUINEA' },
  {
    ko: '조선민주주의인민공화국',
    en: "Korea, Democratic People's Republic of",
    enum: 'KOREA_DEMOCRATIC_PEOPLES_REPUBLIC_OF',
  },
  { ko: '조지아', en: 'Georgia', enum: 'GEORGIA' },
  {
    ko: '중앙아프리카 공화국',
    en: 'Central African Republic',
    enum: 'CENTRAL_AFRICAN_REPUBLIC',
  },
  {
    ko: '중화민국',
    en: 'Taiwan, Province of China',
    enum: 'TAIWAN_PROVINCE_OF_CHINA',
  },
  { ko: '중화인민공화국', en: 'China', enum: 'CHINA' },
  { ko: '지부티', en: 'Djibouti', enum: 'DJIBOUTI' },
  { ko: '지브롤터', en: 'Gibraltar', enum: 'GIBRALTAR' },
  { ko: '짐바브웨', en: 'Zimbabwe', enum: 'ZIMBABWE' },
  { ko: '차드', en: 'Chad', enum: 'CHAD' },
  { ko: '체코', en: 'Czech Republic', enum: 'CZECH_REPUBLIC' },
  { ko: '칠레', en: 'Chile', enum: 'CHILE' },
  { ko: '카메룬', en: 'Cameroon', enum: 'CAMEROON' },
  { ko: '카보베르데', en: 'Cape Verde', enum: 'CAPE_VERDE' },
  { ko: '카자흐스탄', en: 'Kazakhstan', enum: 'KAZAKHSTAN' },
  { ko: '카타르', en: 'Qatar', enum: 'QATAR' },
  { ko: '캄보디아', en: 'Cambodia', enum: 'CAMBODIA' },
  { ko: '캐나다', en: 'Canada', enum: 'CANADA' },
  { ko: '케냐', en: 'Kenya', enum: 'KENYA' },
  { ko: '케이맨 제도', en: 'Cayman Islands', enum: 'CAYMAN_ISLANDS' },
  { ko: '코모로', en: 'Comoros', enum: 'COMOROS' },
  { ko: '코스타리카', en: 'Costa Rica', enum: 'COSTA_RICA' },
  { ko: '코코스 제도', en: 'Cocos Islands', enum: 'COCOS_ISLANDS' },
  { ko: '코트디부아르', en: "Cote d'Ivoire", enum: 'COTE_DIVOIRE' },
  { ko: '콜롬비아', en: 'Colombia', enum: 'COLOMBIA' },
  { ko: '콩고', en: 'Congo', enum: 'CONGO' },
  {
    ko: '콩고 민주 공화국',
    en: 'Democratic Republic of the Congo',
    enum: 'DEMOCRATIC_REPUBLIC_OF_THE_CONGO',
  },
  { ko: '쿠바', en: 'Cuba', enum: 'CUBA' },
  { ko: '쿠웨이트', en: 'Kuwait', enum: 'KUWAIT' },
  { ko: '쿡 제도', en: 'Cook Islands', enum: 'COOK_ISLANDS' },
  { ko: '크로아티아', en: 'Croatia', enum: 'CROATIA' },
  { ko: '크리스마스 섬', en: 'Christmas Island', enum: 'CHRISTMAS_ISLAND' },
  { ko: '키르기스스탄', en: 'Kyrgyzstan', enum: 'KYRGYZSTAN' },
  { ko: '키리바시', en: 'Kiribati', enum: 'KIRIBATI' },
  { ko: '키프로스', en: 'Cyprus', enum: 'CYPRUS' },
  { ko: '태국', en: 'Thailand', enum: 'THAILAND' },
  { ko: '타지키스탄', en: 'Tajikistan', enum: 'TAJIKISTAN' },
  {
    ko: '탄자니아 연합 공화국',
    en: 'Tanzania, United Republic of',
    enum: 'TANZANIA_UNITED_REPUBLIC_OF',
  },
  {
    ko: '터크스 케이커스 제도',
    en: 'Turks and Caicos Islands',
    enum: 'TURKS_AND_CAICOS_ISLANDS',
  },
  { ko: '터키', en: 'Turkey', enum: 'TURKEY' },
  { ko: '토고', en: 'Togo', enum: 'TOGO' },
  { ko: '토켈라우', en: 'Tokelau', enum: 'TOKELAU' },
  { ko: '통가', en: 'Tonga', enum: 'TONGA' },
  { ko: '투르크메니스탄', en: 'Turkmenistan', enum: 'TURKMENISTAN' },
  { ko: '투발루', en: 'Tuvalu', enum: 'TUVALU' },
  { ko: '튀니지', en: 'Tunisia', enum: 'TUNISIA' },
  {
    ko: '트리니다드 토바고',
    en: 'Trinidad and Tobago',
    enum: 'TRINIDAD_AND_TOBAGO',
  },
  { ko: '파나마', en: 'Panama', enum: 'PANAMA' },
  { ko: '파라과이', en: 'Paraguay', enum: 'PARAGUAY' },
  { ko: '파키스탄', en: 'Pakistan', enum: 'PAKISTAN' },
  { ko: '파푸아뉴기니', en: 'Papua New Guinea', enum: 'PAPUA_NEW_GUINEA' },
  { ko: '팔라우', en: 'Palau', enum: 'PALAU' },
  { ko: '팔레스타인', en: 'Palestine', enum: 'PALESTINE' },
  { ko: '페로 제도', en: 'Faroe Islands', enum: 'FAROE_ISLANDS' },
  { ko: '페루', en: 'Peru', enum: 'PERU' },
  { ko: '포르투갈', en: 'Portugal', enum: 'PORTUGAL' },
  { ko: '포클랜드 제도', en: 'Falkland Islands', enum: 'FALKLAND_ISLANDS' },
  { ko: '폴란드', en: 'Poland', enum: 'POLAND' },
  { ko: '프랑스', en: 'France', enum: 'FRANCE' },
  { ko: '프랑스령 기아나', en: 'French Guiana', enum: 'FRENCH_GUIANA' },
  {
    ko: '프랑스령 남방 및 남극 지역',
    en: 'French Southern Territories',
    enum: 'FRENCH_SOUTHERN_TERRITORIES',
  },
  {
    ko: '프랑스령 폴리네시아',
    en: 'French Polynesia',
    enum: 'FRENCH_POLYNESIA',
  },
  { ko: '피지', en: 'Fiji', enum: 'FIJI' },
  { ko: '핀란드', en: 'Finland', enum: 'FINLAND' },
  { ko: '필리핀', en: 'Philippines', enum: 'PHILIPPINES' },
  { ko: '핏케언 제도', en: 'Pitcairn', enum: 'PITCAIRN' },
  {
    ko: '허드 맥도널드 제도',
    en: 'Heard and McDonald Islands',
    enum: 'HEARD_AND_MCDONALD_ISLANDS',
  },
  { ko: '헝가리', en: 'Hungary', enum: 'HUNGARY' },
  { ko: '홍콩', en: 'Hong Kong', enum: 'HONG_KONG' },
];

export const MajorsKo: string[] = Majors.map((major) => major.ko);
export const MajorsEn: string[] = Majors.map((major) => major.en);

// 희망업무 직종
export const Industrys: KoEnEnumType[] = [
  { ko: '외식/음료', en: 'Food Service', enum: 'FOOD_SERVICE' },
  { ko: '매장관리/판매', en: 'Store Management', enum: 'STORE_MANAGEMENT' },
  { ko: '서비스', en: 'Service', enum: 'SERVICE' },
  { ko: '사무직', en: 'Office Work', enum: 'OFFICE_WORK' },
  { ko: '고객상담/리서치/영업', en: 'Customer Sales', enum: 'CUSTOMER_SALES' },
  {
    ko: '생산/건설/노무',
    en: 'Production Construction',
    enum: 'PRODUCTION_CONSTRUCTION',
  },
  { ko: 'IT/기술', en: 'IT Tech', enum: 'IT_TECH' },
  { ko: '디자인', en: 'Design', enum: 'DESIGN' },
  { ko: '미디어', en: 'Media', enum: 'MEDIA' },
  { ko: '운전/배달', en: 'Driving Delivery', enum: 'DRIVING_DELIVERY' },
  {
    ko: '병원/간호/연구',
    en: 'Healthcare Research',
    enum: 'HEALTHCARE_RESEARCH',
  },
  { ko: '교육/강사', en: 'Education', enum: 'EDUCATION' },
];

// (고용주) 이력서 검색 카테고리
export const EMPLOYEE_SEARCH_CATEGORY = {
  VISA: 'VISA',
  INDUSTRY: 'INDUSTRY',
  KOREAN: 'KOREAN',
  MAJOR: 'MAJOR',
  NATIONALITY: 'NATIONALITY',
} as const;

export const EMPLOYEE_SEARCH_CATEGORY_KO = {
  [EMPLOYEE_SEARCH_CATEGORY.VISA]: '비자',
  [EMPLOYEE_SEARCH_CATEGORY.INDUSTRY]: '업직종',
  [EMPLOYEE_SEARCH_CATEGORY.KOREAN]: '한국어',
  [EMPLOYEE_SEARCH_CATEGORY.MAJOR]: '전공',
  [EMPLOYEE_SEARCH_CATEGORY.NATIONALITY]: '국가',
} as const;

// (고용주) 이력서 검색 카테고리 별 옵션
export const EMPLOYEE_SEARCH_OPTIONS = {
  [EMPLOYEE_SEARCH_CATEGORY.VISA]: Visas,
  [EMPLOYEE_SEARCH_CATEGORY.KOREAN]: Koreans,
  [EMPLOYEE_SEARCH_CATEGORY.INDUSTRY]: Industrys,
  [EMPLOYEE_SEARCH_CATEGORY.MAJOR]: Majors,
  [EMPLOYEE_SEARCH_CATEGORY.NATIONALITY]: Nationalities,
} as const;

// (고용주) 이력서 검색 시에 초기값
export const initialEmployerSearchFilterList: EmployeeSearchFilterItemType = {
  [EMPLOYEE_SEARCH_CATEGORY.VISA]: [],
  [EMPLOYEE_SEARCH_CATEGORY.KOREAN]: [],
  [EMPLOYEE_SEARCH_CATEGORY.INDUSTRY]: [],
  [EMPLOYEE_SEARCH_CATEGORY.MAJOR]: [],
  [EMPLOYEE_SEARCH_CATEGORY.NATIONALITY]: [],
};

export const languageProficiencyLevels: KoEnEnumType[] = [
  {
    en: 'Not able to use at all',
    ko: '전혀 사용할 수 없음',
    enum: 'NOT_ABLE_TO_USE_AT_ALL',
  },
  {
    en: 'Can understand basic words',
    ko: '기본 단어 이해 가능',
    enum: 'CAN_UNDERSTAND_BASIC_WORDS',
  },
  {
    en: 'Basic conversation possible',
    ko: '기본 대화 가능',
    enum: 'BASIC_CONVERSATION_POSSIBLE',
  },
  {
    en: 'Comfortable for work',
    ko: '업무에 편안함',
    enum: 'COMFORTABLE_FOR_WORK',
  },
  {
    en: 'Fluent (Advanced level)',
    ko: '유창함 (고급 수준)',
    enum: 'FLUENT',
  },
  {
    en: 'Native or near-native',
    ko: '원어민 또는 원어민 수준',
    enum: 'NATIVE_OR_NEAR_NATIVE',
  },
];

export const languageProficiencyLevelsEn: string[] =
  languageProficiencyLevels.map((level) => level.en);
export const languageProficiencyLevelsKo: string[] =
  languageProficiencyLevels.map((level) => level.ko);
