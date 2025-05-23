import { RESTYPE } from '@/types/api/common';
import { api } from '.';
import { UserLanguageRequest } from '@/types/api/mypage';
import {
  ApplicationCountType,
  BookmarkCountType,
  EmployerCountsInfoResponse,
  EmployerProfileDetailResponse,
  EmployerProfileResponse,
  UserProfileDetailResponse,
  UserProfileSummaryResponse,
} from '@/types/api/profile';

// 3.1 (유학생) 유저 프로필 조회하기
export const getUserProfile = async (): Promise<
  RESTYPE<UserProfileDetailResponse>
> => {
  const response = await api.get('/users/details');
  return response.data;
};

// 3.2 (고용주) 회사 정보 조회하기
export const getOwnerProfile = async (): Promise<
  RESTYPE<EmployerProfileDetailResponse>
> => {
  const response = await api.get('/owners/details');
  return response.data;
};

// 3.3 (유학생) 유저 요약 정보 조회하기
export const getUserSummaries = async (): Promise<
  RESTYPE<UserProfileSummaryResponse>
> => {
  const response = await api.get('/users/summaries');
  return response.data;
};

// 3.4 (고용주) 고용주 간단 정보 조회하기
export const getOwnerSummaries = async (): Promise<
  RESTYPE<EmployerProfileResponse>
> => {
  const response = await api.get('/owners/briefs');
  return response.data;
};

// 3.5 (유학생) 프로필 수정
export const patchUserProfile = async (userData: FormData) => {
  const response = await api.patch('/users', userData);
  return response.data;
};

// 3.6 (고용주) 회사 정보 수정하기
export const patchOwnerProfile = async (ownerProfile: FormData) => {
  const response = await api.patch('/owners', ownerProfile);
  return response.data;
};

// 3.7 (유학생/고용주) 알람 설정 변경하기
export const patchNotificationAllowed = async (
  is_notification_allowed: boolean,
) => {
  const response = await api.patch('/notification-allowed', {
    is_notification_allowed: is_notification_allowed,
  });
  return response.data;
};

// 3.8 (유학생) 앱 내 언어 수정
export const patchUserLanguage = async (language: UserLanguageRequest) => {
  const response = await api.patch('/users/languages', language);
  return response.data;
};

// 5.2 (유학생) 북마크 현황(개수) 확인하기
export const getBookmarksCounts = async (): Promise<
  RESTYPE<BookmarkCountType>
> => {
  const response = await api.get('/users/book-marks/counts');
  return response.data;
};

// 6.4 (유학생) 지원 현황(개수) 확인하기
export const getApplicationCounts = async (): Promise<
  RESTYPE<ApplicationCountType>
> => {
  const response = await api.get('/users/user-owner-job-postings/counts');
  return response.data;
};

// 6.9 (고용주) 지원 현황(개수) 확인하기
export const getOwnerApplicationCounts = async (): Promise<
  RESTYPE<EmployerCountsInfoResponse>
> => {
  const response = await api.get('/owners/user-owner-job-postings/counts');
  return response.data;
};
