import {
  EducationLevel,
  EmploymentType,
  JobCategory,
  JobCategoryExtended,
  VisaGroup,
} from '@/types/postCreate/postCreate';
import PeopleIcon from '@/assets/icons/PeopleIcon.svg?react';
import BuildingIcon from '@/assets/icons/BuildingIcon.svg?react';
import { Gender } from '@/types/api/users';

export const JobCategoryInfo = {
  [JobCategory.FOOD_SERVICE]: {
    name: '외식/음료',
    key: 'FOOD_SERVICE',
  },
  [JobCategory.STORE_MANAGEMENT]: {
    name: '매장관리/판매',
    key: 'STORE_MANAGEMENT',
  },
  [JobCategory.SERVICE]: {
    name: '서비스',
    key: 'SERVICE',
  },
  [JobCategory.OFFICE_WORK]: {
    name: '사무직',
    key: 'OFFICE_WORK',
  },
  [JobCategory.CUSTOMER_SALES]: {
    name: '고객상담/리서치/영업',
    key: 'CUSTOMER_SALES',
  },
  [JobCategory.PRODUCTION_CONSTRUCTION]: {
    name: '생산/건설/노무',
    key: 'PRODUCTION_CONSTRUCTION',
  },
  [JobCategory.IT_TECH]: {
    name: 'IT/기술',
    key: 'IT_TECH',
  },
  [JobCategory.DESIGN]: {
    name: '디자인',
    key: 'DESIGN',
  },
  [JobCategory.MEDIA]: {
    name: '미디어',
    key: 'MEDIA',
  },
  [JobCategory.DRIVING_DELIVERY]: {
    name: '운전/배달',
    key: 'DRIVING_DELIVERY',
  },
  [JobCategory.HEALTHCARE_RESEARCH]: {
    name: '병원/간호/연구',
    key: 'HEALTHCARE_RESEARCH',
  },
  [JobCategory.EDUCATION]: {
    name: '교육/강사',
    key: 'EDUCATION',
  },
};

// 구 버전 데이터 처리 위한 확장된 데이터 타입 정보(추후 삭제 필요)
export const JobCategoryExtendedInfo = {
  [JobCategoryExtended.GENERAL_INTERPRETATION_TRANSLATION]: {
    name: '일반 동시 통역/번역',
    key: 'GENERAL_INTERPRETATION_TRANSLATION',
  },
  [JobCategoryExtended.FOOD_SERVICE_ASSISTANT]: {
    name: '외식/음료 도우미',
    key: 'FOOD_SERVICE_ASSISTANT',
  },
  [JobCategoryExtended.GENERAL_ADMINISTRATIVE_SUPPORT]: {
    name: '일반 관리/지원',
    key: 'GENERAL_ADMINISTRATIVE_SUPPORT',
  },
  [JobCategoryExtended.ENGLISH_KIDS_CAFE]: {
    name: '영어 아동 카페',
    key: 'ENGLISH_KIDS_CAFE',
  },
  [JobCategoryExtended.GENERAL_CAFE]: {
    name: '일반 카페',
    key: 'GENERAL_CAFE',
  },
  [JobCategoryExtended.PART_TIME_WORK]: {
    name: '일용 근로',
    key: 'PART_TIME_WORK',
  },
  [JobCategoryExtended.TOUR_GUIDE_AND_DUTY_FREE_ASSISTANT]: {
    name: '관광/무료 타입 도우미',
    key: 'TOUR_GUIDE_AND_DUTY_FREE_ASSISTANT',
  },
  [JobCategoryExtended.MANUFACTURING]: {
    name: '제조/생산',
    key: 'MANUFACTURING',
  },
  [JobCategoryExtended.FOOD_SERVICE]: {
    name: '외식/음료',
    key: 'FOOD_SERVICE',
  },
  [JobCategoryExtended.STORE_MANAGEMENT]: {
    name: '매장관리/판매',
    key: 'STORE_MANAGEMENT',
  },
  [JobCategoryExtended.SERVICE]: {
    name: '서비스',
    key: 'SERVICE',
  },
  [JobCategoryExtended.OFFICE_WORK]: {
    name: '사무직',
    key: 'OFFICE_WORK',
  },
  [JobCategoryExtended.CUSTOMER_SALES]: {
    name: '고객상담/리서치/영업',
    key: 'CUSTOMER_SALES',
  },
  [JobCategoryExtended.PRODUCTION_CONSTRUCTION]: {
    name: '생산/건설/노무',
    key: 'PRODUCTION_CONSTRUCTION',
  },
  [JobCategoryExtended.IT_TECH]: {
    name: 'IT/기술',
    key: 'IT_TECH',
  },
  [JobCategoryExtended.DESIGN]: {
    name: '디자인',
    key: 'DESIGN',
  },
  [JobCategoryExtended.MEDIA]: {
    name: '미디어',
    key: 'MEDIA',
  },
  [JobCategoryExtended.DRIVING_DELIVERY]: {
    name: '운전/배달',
    key: 'DRIVING_DELIVERY',
  },
  [JobCategoryExtended.HEALTHCARE_RESEARCH]: {
    name: '병원/간호/연구',
    key: 'HEALTHCARE_RESEARCH',
  },
  [JobCategoryExtended.EDUCATION]: {
    name: '교육/강사',
    key: 'EDUCATION',
  },
};

export const EducationLevelInfo = {
  [EducationLevel.BACHELOR]: {
    name: '대학(4년제)',
    key: 'BACHELOR',
  },
  [EducationLevel.ASSOCIATE]: {
    name: '대학(2년제)',
    key: 'ASSOCIATE',
  },
  [EducationLevel.HIGHSCHOOL]: {
    name: '고등학교졸업',
    key: 'HIGHSCHOOL',
  },
  [EducationLevel.NONE]: {
    name: '무관',
    key: 'NONE',
  },
};

export const VisaInfo = {
  [VisaGroup.D_2]: {
    ko: 'D-2 : 외국인 유학생 (학사, 석사, 박사 과정)',
    en: "D-2 :Student Visa (Bachelor's, Master's, and Doctoral Programs)",
    key: 'D_2',
  },
  [VisaGroup.D_4]: {
    ko: 'D-4 : 외국인 한국어 연수 및 기술 연수 단기 및 방문 관련 비자',
    en: 'D-4 : General Training Visa (Korean Language & Technical Training, Short-Term & Visitor-Related Visa)',
    key: 'D_4',
  },
  [VisaGroup.D_10]: {
    ko: 'D-10 : 구직 비자 (전문직 취업 준비)',
    en: 'D-10 : Job-Seeking Visa (For Preparing for Professional Employment)',
    key: 'D_10',
  },
  [VisaGroup.C_4]: {
    ko: 'C-4 : 단기 취업 (90일 이하 단기 근로)',
    en: 'C-4 : Short-Term Employment Visa (For Temporary Work of 90 Days or Less)',
    key: 'C_4',
  },
  [VisaGroup.F_2]: {
    ko: 'F-2 : 장기 체류 및 취업 가능 거주 비자',
    en: 'F-2 : Long-Term Residency & Employment Eligible Visa',
    key: 'F_2',
  },
  [VisaGroup.F_4]: {
    ko: 'F-4 : 재외동포 자유 취업 비자',
    en: 'F-4 : Overseas Korean Visa (Allows Free Employment for Ethnic Koreans)',
    key: 'F_4',
  },
  [VisaGroup.F_5]: {
    ko: 'F-5 : 영주권 취득 비자',
    en: 'F-5 : Permanent Residency Visa',
    key: 'F_5',
  },
  [VisaGroup.F_6]: {
    ko: 'F-6 : 결혼 및 이민 비자',
    en: 'F-6 : Marriage & Immigration Visa',
    key: 'F_6',
  },
  [VisaGroup.H_1]: {
    ko: 'H-1 : 워킹홀리데이 비자',
    en: 'H-1 : Working Holiday Visa',
    key: 'H_1',
  },
};

export const genderInfo = {
  [Gender.MALE]: {
    name: '남자',
    key: 'MALE',
  },
  [Gender.FEMALE]: {
    name: '여자',
    key: 'FEMALE',
  },
  [Gender.NONE]: {
    name: '무관',
    key: 'NONE',
  },
};

export const GenderList = Object.values(genderInfo).map(
  (gender) => gender.name,
);

export const WorkTypeInfo = {
  [EmploymentType.PARTTIME]: {
    name: '알바',
    key: 'PARTTIME',
    icon: PeopleIcon,
  },
  [EmploymentType.INTERNSHIP]: {
    name: '인턴',
    key: 'INTERNSHIP',
    icon: BuildingIcon,
  },
};
