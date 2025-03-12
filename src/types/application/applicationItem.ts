import {
  DayOfWeekType,
  VisaType,
  WorkPeriodType,
} from '@/types/postDetail/postDetailItem';

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

export type AppicationItemType = {
  job_posting_id: number;
  user_owner_job_posting_id: number;
  icon_img_url: string;
  title: string;
  address_name: string;
  step: ApplicationStepType;
  hourly_rate: number;
  duration_of_days: number;
};

type WorkDayTimeType = {
  day_of_week: DayOfWeekType;
  work_start_time: string; // HH:mm
  work_end_time: string; // HH:mm
};

type JobInfoType = {
  hourly_rate: number;
  work_period: WorkPeriodType;
  work_day_times: WorkDayTimeType[];
};

// 신청 상세 조회
export type ApplicationDetailItemType = {
  title: string;
  icon_img_url: string;
  address_name: string;
  duration_of_days: number;
  job_info: JobInfoType;
  step: ApplicationStepType;
};

// 공고 담당자 정보
export type ApplicationRecruiterItemType = {
  recruiter_name: string;
  recruiter_phone_number: string;
};

type SchoolAddressType = {
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  region_4depth_name?: string;
  address_detail: string;
  longitude: number;
  latitude: number;
};

// 학교 정보
export type ApplicationCoordinaterItemType = {
  school_name?: string;
  institute_name?: string;
  coordinator_name?: string;
  coordinator_phone_number?: string;
  address: SchoolAddressType;
};

// 공고에 대한 지원자 리스트
export type ApplicantItemType = {
  id: number;
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
  title: string;
  explain: string;
};
