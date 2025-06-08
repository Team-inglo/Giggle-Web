import { VisaType } from '@/types/postDetail/postDetailItem';

export type ApplicationStepType =
  | 'RESUME_UNDER_REVIEW' // 1
  | 'WAITING_FOR_INTERVIEW' // 2
  | 'FILLING_OUT_DOCUMENTS' // 3
  | 'DOCUMENT_UNDER_REVIEW' // 4
  | 'APPLICATION_IN_PROGRESS' // 5
  | 'APPLICATION_SUCCESS' // 7
  | 'APPLICATION_REJECTED' // 7
  | 'RESUME_REJECTED'
  | 'PENDING'
  | 'REGISTERING_RESULTS'; // 6;

export type ApplicationItemType = {
  job_posting_id: number;
  user_owner_job_posting_id: number;
  icon_img_url: string;
  company_name: string;
  title: string;
  address_name: string;
  step: ApplicationStepType;
  hourly_rate: number;
  duration_of_days: number;
};

// 공고에 대한 지원자 리스트
export type ApplicantItemType = {
  id: number;
  resume_id: string;
  profile_img_url: string;
  name: string;
  nationality: string;
  gender: string;
  visa: VisaType;
  school_name: string;
  duration_of_days: number;
  step: ApplicationStepType;
};

// 공고에 대한 지원자 상세조회 리스트
export type ApplicantDetailItemType = {
  profile_img_url: string;
  name: string;
  nationality: string;
  gender: string;
  visa: VisaType;
  school_name?: string;
  duration_of_days: number;
  step: ApplicationStepType;
};

// 지원 상태 단계별 문구
export type ApplicationStepExplainType = {
  step: number;
  title: {
    ko: string;
    en: string;
  };
  explain: {
    ko: string;
    en: string;
  };
};
