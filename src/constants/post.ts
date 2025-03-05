import { Gender } from '@/types/api/users';
import {
  EducationLevel,
  JobCategory,
  VisaGroup,
} from '@/types/postCreate/postCreate';
import { EducationCategoryNames, JobCategoryNames } from '@/utils/post';

export const JobCategoryInfo = {
  [JobCategory.GENERAL_INTERPRETATION_TRANSLATION]: {
    name: '일반통역/번역',
    key: 'GENERAL_INTERPRETATION_TRANSLATION',
  },
  [JobCategory.FOOD_SERVICE_ASSISTANT]: {
    name: '음식업보조',
    key: 'FOOD_SERVICE_ASSISTANT',
  },
  [JobCategory.GENERAL_ADMINISTRATIVE_SUPPORT]: {
    name: '일반 사무보조',
    key: 'GENERAL_ADMINISTRATIVE_SUPPORT',
  },
  [JobCategory.ENGLISH_KIDS_CAFE]: {
    name: '영어키즈카페',
    key: 'ENGLISH_KIDS_CAFE',
  },
  [JobCategory.GENERAL_CAFE]: {
    name: '일반카페',
    key: 'GENERAL_CAFE',
  },
  [JobCategory.PART_TIME_WORK]: {
    name: '놀이보조',
    key: 'PART_TIME_WORK',
  },
  [JobCategory.TOUR_GUIDE_AND_DUTY_FREE_ASSISTANT]: {
    name: '관광안내보조 및 면세점판매보조',
    key: 'TOUR_GUIDE_AND_DUTY_FREE_ASSISTANT',
  },
  [JobCategory.MANUFACTURING]: {
    name: '제조업',
    key: 'MANUFACTURING',
  },
} as const;

export const JobCategoryList: JobCategoryNames[] = [
  '일반통역/번역',
  '음식업보조',
  '일반 사무보조',
  '영어키즈카페',
  '일반카페',
  '놀이보조',
  '관광안내보조 및 면세점판매보조',
  '제조업',
];

export const EducationList: EducationCategoryNames[] = [
  '대학(4년제)',
  '대학(2년제)',
  '고등학교졸업',
  '무관',
];

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
} as const;

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
} as const;

export const GenderList = ['남', '여', '무관'];

export const genderInfo = {
  [Gender.MALE]: {
    name: '남',
    key: 'MALE',
  },
  [Gender.FEMALE]: {
    name: '여',
    key: 'FEMALE',
  },
  [Gender.NONE]: {
    name: '무관',
    key: 'NONE',
  },
} as const;
