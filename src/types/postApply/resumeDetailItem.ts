import { EmploymentType, JobCategory } from '@/types/postCreate/postCreate';

type VisaType =
  | 'D_2'
  | 'D_4'
  | 'D_10'
  | 'C_4'
  | 'F_2'
  | 'F_4'
  | 'F_5'
  | 'F_6'
  | 'H_1';

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

export type LanguageType = {
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

export type VisaListType = {
  visa: VisaType;
  description: string;
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

export type ResumeDetailItemType = {
  profile_img_url: string;
  name: string;
  visa: VisaListType;
  personal_information: PersonalInformationType;
  introduction: string;
  work_experience: WorkExperienceType[];
  education: EducationType[];
  languages: LanguageListType;
};

type AreaType = {
  region_1depth_name: string;
  region_2depth_name: string | null;
  region_3depth_name: string | null;
  region_4depth_name: string | null;
};

export type WorkPreferenceType = {
  areas: AreaType[];
  jobTypes: EmploymentType[];
  industries: JobCategory[];
};
