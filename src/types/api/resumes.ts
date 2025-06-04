import {
  EducationLevelType,
  EducationType,
  LanguageListType,
  PersonalInformationType,
  WorkExperienceType,
} from '@/types/postApply/resumeDetailItem';
import { VisaType } from '@/types/postDetail/postDetailItem';

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
export type WorkExperienctResponse = {
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
  introduction: string;
  work_experience: WorkExperienceType[];
  education: EducationType[];
  languages: LanguageListType;
  is_public: boolean;
};

// 고용주가 인재 이력서 조회시 사용하는 응답 타입
export type ApplicantResumeResponse = {
  is_scraped: boolean;
  data: UserResumeDetailResponse;
};
