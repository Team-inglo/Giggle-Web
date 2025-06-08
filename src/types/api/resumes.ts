import {
  EducationLevelType,
  EducationType,
  LanguageListType,
  PersonalInformationType,
  WorkExperienceType,
  WorkPreferenceType,
} from '@/types/postApply/resumeDetailItem';
import { VisaType } from '@/types/postDetail/postDetailItem';
import {
  EMPLOYEE_SEARCH_CATEGORY,
  EMPLOYEE_SEARCH_CATEGORY_KO,
} from '@/constants/manageResume';

// 자기소개 요청 타입
export type IntroductionRequest = {
  title?: string;
  introduction?: string;
};

// 경력사항 요청 타입
export type WorkExperienctRequest = {
  title: string;
  workplace: string;
  start_date: string; // (yyyy-MM-dd),
  end_date: string; // (yyyy-MM-dd),
  description: string;
};

// 경력사항 반환 타입
export type WorkExperienceResponse = {
  title: string;
  workplace: string;
  start_date: string; // (yyyy-MM-dd),
  end_date: string; // (yyyy-MM-dd),
  description: string;
};

// 학력 요청 타입
export type EducationRequest = {
  education_level: EducationLevelType; // Enum(BACHELOR, ASSOCIATE, HIGHSCHOOL),
  school_id: number;
  major: string;
  gpa: number;
  start_date: string; // (yyyy-MM-dd)
  end_date: string; // (yyyy-MM-dd)
  grade: number;
};

// 언어 레벨 수정 API 통합시 type property로 사용
export type LanguagesLevelType =
  | 'topik'
  | 'social-integration-program'
  | 'sejong-institute';

export type AdditionalLanguageRequest = {
  language_name: string;
  level: number;
};

type visa = {
  visa: VisaType; //Enum(D_2_1, D_2_2, D_2_3, D_2_4, D_2_6, D_2_7, D_2_8, D_4_1, D_4_7, F_2),
  description: string;
};

export type UserResumeDetailResponse = {
  profile_img_url: string;
  name: string;
  visa: visa;
  personal_information: PersonalInformationType;
  title: string;
  introduction: string;
  work_experience: WorkExperienceType[];
  education: EducationType[];
  languages: LanguageListType;
  work_preference: WorkPreferenceType[];
  is_public: boolean;
  is_bookmarked: boolean;
};

// (고용주) 인재 이력서 리스트
export type EmployeeResumeListItemType = {
  id: string;
  name: string;
  profile_img_url: string;
  nationality: string;
  address: string;
  title: string;
  visa: VisaType;
  industry: string;
  bookmark_count: number;
  is_bookmarked: boolean;
};

// 7.24 (고용주) 이력서 리스트 조회하기 response type
export type EmployeeResumeListResponse = {
  data: {
    resumes: EmployeeResumeListItemType[];
    has_next: boolean;
    total_count: number;
  };
};

// 7.24 (고용주) 이력서 리스트 조회하기 request type
export type GetEmployeeResumeListReq = {
  size: number;
  sorting?: string | null;
  visa?: string | null;
  korean?: string | null;
  major?: string | null;
  nationality?: string | null;
  industry?: string | null;
  is_book_marked?: boolean;
};

// (고용주) 이력서 리스트 조회 검색 필터
export type EmployeeSearchCategoryEnType =
  keyof typeof EMPLOYEE_SEARCH_CATEGORY; // 'VISA' | 'INDUSTRY' | ...
export type EmployeeSearchCategoryKoType =
  (typeof EMPLOYEE_SEARCH_CATEGORY_KO)[EmployeeSearchCategoryEnType]; // '비자' | '업직종' | ...

export type EmployeeSearchFilterItemType = {
  [key in EmployeeSearchCategoryEnType]: string[];
};
