import { OwnerInfo } from '@/types/api/employ';
import { GiggleAddress } from '@/types/api/users';

type LanguageLevelType = {
  topik_level: number;
  kiip_level: number;
  sejong_level: number;
};

type MetaDataType = {
  weekend_work_hour: number;
  weekday_work_hour: number;
  is_language_skill_4_or_more: boolean;
  is_metropolitan_area: boolean;
};

export type BookmarkCountType = {
  book_mark_counts: number;
};

export type ApplicationCountType = {
  application_counts: number;
  successful_hire_counts: number;
};

// 프로필 페이지에서 사용 3.3 유저 요약정보 조회
export type UserProfileSummaryResponse = {
  user_information: UserInformation;
  language_level: LanguageLevelType;
  meta_data: MetaDataType;
};

export type UserInformation = {
  profile_img_url: string;
  first_name: string;
  last_name: string;
  birth: string;
  school_name: string;
  grade: number;
  gpa: number;
  is_notification_allowed: boolean;
};

// ----------- 프로필 수정 -----------
// 프로필 수정시 사용 3.1 유학생 프로필 조회
export type UserProfileDetailResponse = {
  profile_img_url: string;
  first_name: string;
  last_name: string;
  birth: string;
  gender: string;
  nationality: string;
  visa: string;
  phone_number: string;
  address: GiggleAddress;
};

export type UserEditRequestBody = {
  first_name: string;
  last_name: string;
  birth: string; // yyyy-MM-dd
  gender: string; // Enum(MALE, FEMALE, NONE)
  nationality: string;
  visa: string; // Enum(D_2_1, D_2_2, D_2_3, D_2_4, D_2_6, D_2_7, D_2_8, D_4_1, D_4_7, F_2)
  phone_number: string;
  is_profile_img_changed: boolean;
  address: GiggleAddress;
};

export const InitialUserProfileDetail: UserEditRequestBody = {
  first_name: '',
  last_name: '',
  birth: '', // yyyy-MM-dd
  gender: '', // Enum(MALE, FEMALE, NONE)
  nationality: '',
  visa: '', // Enum(D_2_1, D_2_2, D_2_3, D_2_4, D_2_6, D_2_7, D_2_8, D_4_1, D_4_7, F_2)
  phone_number: '',
  is_profile_img_changed: false,
  address: {
    address_name: '',
    region_1depth_name: '',
    region_2depth_name: '',
    region_3depth_name: '',
    region_4depth_name: '',
    address_detail: '',
    longitude: 0,
    latitude: 0,
  },
};

// 고용주 프로필
type AddressResponse = {
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  region_4depth_name: string;
  address_detail: string;
  longitude: number;
  latitude: number;
};

export type EmployerProfileDetailResponse = {
  company_name: string;
  owner_name: string;
  address: AddressResponse;
  company_registration_number: string;
  phone_number: string;
  logo_img_url: string;
};

export type EmployerProfileResponse = {
  icon_img_url: string;
  company_name: string;
  is_notification_allowed: boolean;
};

export type EmployerCountsInfoResponse = {
  job_postings_counts: number;
  applicants_counts: number;
  successful_hire_counts: number;
};

export type EmployerProfileRequestBody = {
  owner_info: OwnerInfo;
  address: GiggleAddress;
  is_icon_img_changed: boolean;
};

// Initial State
export const initialEmployerProfile: EmployerProfileRequestBody = {
  owner_info: {
    company_name: '',
    owner_name: '',
    company_registration_number: '',
    phone_number: '',
  },
  address: {
    address_name: '',
    region_1depth_name: '',
    region_2depth_name: '',
    region_3depth_name: '',
    region_4depth_name: '',
    address_detail: '',
    longitude: 0,
    latitude: 0,
  },
  is_icon_img_changed: false,
};
