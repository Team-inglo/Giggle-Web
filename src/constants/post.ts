import { Gender } from '@/types/api/users';
import { InputType } from '@/types/common/input';
import {
  EducationLevel,
  EmploymentType,
  JobCategory,
  VisaGroup,
} from '@/types/postCreate/postCreate';
import { EducationCategoryNames, JobCategoryNames } from '@/utils/post';
import { ValueTransformer } from '@/types/api/document';
import { transformers } from '@/utils/transformers';
import { WorkPeriodInfo } from './documents';

// 근무 기간 리스트
export const WorkPeriodNames = [
  '하루',
  '1주 미만',
  '1주 ~ 1개월',
  '1개월 ~ 3개월',
  '3개월 ~ 6개월',
  '6개월 ~ 1년',
  '1년 이상',
];

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
};

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
};

export const WorkTypeInfo = {
  [EmploymentType.INTERNSHIP]: {
    name: '인턴십',
    key: 'INTERNSHIP',
  },
  [EmploymentType.PARTTIME]: {
    name: '아르바이트',
    key: 'PARTTIME',
  },
};

// 공고 폼 필드 타입 정의
export type PostFormField = {
  type:
    | 'text'
    | 'dropdown'
    | 'radio'
    | 'work_day_time'
    | 'number'
    | 'phone'
    | 'address'
    | 'value_with_checkbox'
    | 'visa_dropdown'
    | 'image_upload'
    | 'textarea';
  name: string; // body.title, body.job_category 등의 경로
  title: string;
  placeholder: string;
  description?: string;
  options?: string[] | Record<string, { name: string; [key: string]: unknown }>;
  inputType?: InputType;
  isRequired?: boolean;
  isUnit?: boolean;
  unit?: string;
  isPrefix?: boolean;
  prefix?: string;
  dropdownValuesList?: string[];
  variant?: 'checkbox' | 'button';
  label?: string;
  format?: string;
  transformer?: ValueTransformer;
  isDate?: boolean;
  checkboxLabel?: string;
  isEdit?: boolean;
  isImage?: boolean;
  textareaHeight?: string;
  useKeyValue?: boolean;
  keyValueOptions?: { key: string; name: string }[];
};

// Step1에 해당하는 폼 필드 정의
export const PostFormFields: Record<string, PostFormField[]> = {
  step1: [
    {
      type: 'text',
      name: 'body.title',
      title: '공고 제목',
      placeholder: '제목을 입력해주세요',
      inputType: InputType.TEXT,
      isRequired: true,
    },
    {
      type: 'dropdown',
      name: 'body.job_category',
      title: '업직종',
      placeholder: '업직종을 선택해주세요',
      useKeyValue: true,
      options: JobCategoryInfo,
      isRequired: true,
    },
    {
      type: 'work_day_time',
      name: 'body.work_day_times',
      title: '근무 시간',
      placeholder: '원하는 근무 시간을 추가해주세요.',
      isRequired: true,
    },
    {
      type: 'text',
      name: 'body.hourly_rate',
      title: '시급',
      placeholder: '시급을 입력해주세요',
      inputType: InputType.TEXT,
      isRequired: true,
      isUnit: true,
      unit: '원',
      description: '2025년 기준 최저시급은 10,030원입니다.',
    },
    {
      type: 'radio',
      name: 'body.employment_type',
      title: '타입',
      placeholder: '',
      options: ['아르바이트', '인턴십'],
      isRequired: true,
      transformer: transformers.employmentType,
    },
    {
      type: 'dropdown',
      name: 'body.work_period',
      title: '근무기간',
      placeholder: '근무 기간을 선택해주세요',
      useKeyValue: true,
      options: WorkPeriodInfo,
      isRequired: true,
    },
  ],
  step2: [
    {
      type: 'address',
      name: 'body.address',
      title: '근무 장소',
      placeholder: '근무 장소를 입력해주세요',
      isRequired: true,
      label: '상세 주소',
    },
    {
      type: 'value_with_checkbox',
      name: 'body.recruitment_dead_line',
      title: '공고 종료일',
      placeholder: '공고 종료일을 입력해주세요',
      inputType: InputType.TEXT,
      isRequired: true,
      format: 'date',
      isDate: true,
      checkboxLabel: '상시모집',
    },
  ],
  step3: [
    {
      type: 'text',
      name: 'body.recruitment_number',
      title: '모집인원',
      placeholder: '모집 인원을 입력해주세요',
      inputType: InputType.TEXT,
      isRequired: true,
      isUnit: true,
      unit: '명',
      format: 'number',
    },
    {
      type: 'radio',
      name: 'body.gender',
      title: '성별',
      placeholder: '',
      options: GenderList,
      isRequired: true,
      transformer: transformers.gender,
    },
    {
      type: 'value_with_checkbox',
      name: 'body.age_restriction',
      title: '연령제한',
      placeholder: '연령제한을 입력해주세요',
      inputType: InputType.TEXT,
      isRequired: true,
      isUnit: true,
      unit: '살 이상',
      checkboxLabel: '무관',
    },
    {
      type: 'dropdown',
      name: 'body.education_level',
      title: '학력',
      placeholder: '학력을 선택해주세요',
      useKeyValue: true,
      options: EducationLevelInfo,
      isRequired: true,
    },
    {
      type: 'visa_dropdown',
      name: 'body.visa',
      title: '비자',
      placeholder: '비자를 선택해 주세요',
      isRequired: true,
    },
  ],
  step4: [
    {
      name: 'body.recruiter_name',
      type: 'text',
      title: '담당자 이름',
      placeholder: '채용 담당자 이름을 입력해주세요',
    },
    {
      name: 'body.recruiter_email',
      type: 'text',
      title: '담당자 이메일',
      placeholder: '채용 담당자 이메일을 입력해주세요',
    },
    {
      name: 'body.recruiter_phone',
      type: 'phone',
      title: '담당자 전화번호',
      placeholder: '채용 담당자 전화번호를 입력해주세요',
    },
    {
      name: 'images',
      type: 'image_upload',
      title: '근무 회사 사진',
      placeholder: '사진이 있으면 관심 확률이 올라가요 !',
      isEdit: false,
      isImage: true,
    },
  ],
  step5: [
    {
      name: 'body.description',
      type: 'textarea',
      title: '상세요강',
      placeholder: '상세요강을 작성해주세요',
      textareaHeight: 'h-[20vh]',
    },
    {
      name: 'body.preferred_conditions',
      type: 'text',
      title: '우대조건',
      placeholder: '우대조건을 입력해주세요',
    },
  ],
};

// Step별 필수 필드 정의
export const POST_REQUIRED_FIELDS = {
  step1: [
    'body.title',
    'body.job_category',
    'body.work_day_times',
    'body.hourly_rate',
    'body.work_period',
    'body.employment_type',
  ],
  step2: [
    'body.recruitment_dead_line',
    'body.address.address_name',
    'body.address.address_detail',
    'body.address.latitude',
    'body.address.longitude',
  ],
  step3: [
    'body.recruitment_number',
    'body.gender',
    'body.age_restriction',
    'body.education_level',
    'body.visa',
  ],
  step4: [
    'body.recruiter_name',
    'body.recruiter_email',
    'body.recruiter_phone',
    'images',
  ],
  step5: ['body.description'],
};
