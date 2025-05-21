import { EmploymentType, JobCategory } from '@/types/postCreate/postCreate';

export type EducationLevelType = 'BACHELOR' | 'ASSOCIATE' | 'HIGHSCHOOL';

export type WorkExperienceType = {
  id: number;
  title: string;
  description: string;
  start_date: string; // yyyy-MM-dd
  end_date?: string; // yyyy-MM-dd
  duration: number;
  work_place?: string; // 마이페이지 적용
};

export type EducationType = {
  id: number;
  education_level: EducationLevelType;
  school_name: string;
  major: string;
  start_date: string;
  end_date: string;
  grade: number;
};

type LanguageType = {
  id: number;
  language_name: string;
  level: number;
};

export type LanguageListType = {
  topik: number;
  social_integration: number;
  sejong_institute: number;
  etc: LanguageType[];
};

export type PersonalInformationType = {
  main_address: string | null;
  detailed_address: string | null;
  phone_number: string;
  email: string;
  gender?: string;
  birth?: string | null;
  nationality?: string | null;
  work_preference?: WorkPreferenceType;
};

export type AreaType = {
  region_1depth_name: string;
  region_2depth_name: string | null;
  region_3depth_name: string | null;
  region_4depth_name: string | null;
};

export type WorkPreferenceType = {
  preference_addresses: AreaType[];
  employment_types: EmploymentType[];
  job_categories: JobCategory[];
};
