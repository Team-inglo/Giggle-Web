import {
  AdditionalLanguageRequest,
  EducationRequest,
  IntroductionRequest,
  LanguagesLevelType,
  LanguagesSummariesResponse,
  UserResumeDetailResponse,
  WorkExperienctRequest,
  WorkExperienctResponse,
} from '@/types/api/resumes';
import { api } from '.';
import { RESTYPE } from '@/types/api/common';
import { GetEducationType } from '@/types/postResume/postEducation';

// 7.1 (유학생) 이력서 조회하기
export const getResume = async (): Promise<
  RESTYPE<UserResumeDetailResponse>
> => {
  const response = await api.get('/users/resumes/details');
  return response.data;
};

// 7.2 경력 상세 조회하기
export const getWorkExperience = async (
  id: string,
): Promise<RESTYPE<WorkExperienctResponse>> => {
  const response = await api.get(
    `/users/resumes/work-experiences/${id}/details`,
  );
  return response.data;
};

// 7.3 학력 상세 조회하기
export const getEducation = async (
  id: string,
): Promise<RESTYPE<GetEducationType>> => {
  const response = await api.get(`/users/resumes/educations/${id}/details`);
  return response.data;
};

// 7.4 언어 요약 조회하기
export const getLanguagesSummaries = async (): Promise<
  RESTYPE<LanguagesSummariesResponse>
> => {
  const response = await api.get('/users/resumes/languages/summaries');
  return response.data;
};

// 7.5 경력 생성하기
export const postWorkExperience = async (
  workExperience: WorkExperienctRequest,
) => {
  const response = await api.post(
    `/users/resumes/work-experiences`,
    workExperience,
  );
  return response.data;
};

// 7.6 학력 생성하기
export const postEducation = async (education: EducationRequest) => {
  const response = await api.post('/users/resumes/educations', education);
  return response.data;
};

// 7.7 언어 - ETC 생성하기
export const postEtcLanguageLevel = async (
  etcLanguage: AdditionalLanguageRequest,
) => {
  const response = await api.post(
    '/users/resumes/languages/additional-languages',
    etcLanguage,
  );
  return response.data;
};

// 7.8 (유학생) 자기소개 수정하기
export const patchIntroduction = async (introduction: IntroductionRequest) => {
  const response = await api.patch('/users/resumes/introduction', introduction);
  return response.data;
};

// 7.9 (유학생) 경력 수정하기
export const patchWorkExperience = async ({
  id,
  workExperience,
}: {
  id: string;
  workExperience: WorkExperienctRequest;
}) => {
  const response = await api.patch(
    `/users/resumes/work-experiences/${id}`,
    workExperience,
  );
  return response.data;
};

// 7.10 (유학생) 학력 수정하기
export const patchEducation = async ({
  id,
  education,
}: {
  id: string;
  education: EducationRequest;
}) => {
  const response = await api.patch(
    `/users/resumes/educations/${id}`,
    education,
  );
  return response.data;
};

// 7.11 (유학생) 언어 - TOPIK 레벨 수정하기
// 7.12 (유학생) 언어 - SOCIAL INTEGRATION PROGRAM 레벨 수정하기
// 7.13 (유학생) 언어 - SEJONG INSTITUTE 레벨 수정하기
export const patchLanguagesLevel = async ({
  type,
  level,
}: {
  type: LanguagesLevelType;
  level: number;
}) => {
  const response = await api.patch(`/users/resumes/languages/${type}`, {
    level: level,
  });
  return response.data;
};

// 7.14 (유학생) 언어 - ETC 수정하기
export const patchEtcLanguageLevel = async (
  id: number,
  data: AdditionalLanguageRequest,
) => {
  const response = await api.patch(
    `/users/resumes/languages/additional-languages/${id}`,
    data,
  );
  return response.data;
};

// 7.15 (유학생) 자기소개 삭제하기
export const deleteIntroduction = async () => {
  const response = await api.delete('/users/resumes/introduction');
  return response.data;
};

// 7.16 (유학생) 경력 삭제하기
export const deleteWorkExperience = async (id: number) => {
  const response = await api.delete(`/users/resumes/work-experiences/${id}`);
  return response.data;
};

// 7.17 (유학생) 학력 삭제하기
export const deleteEducation = async (id: number) => {
  const response = await api.delete(`/users/resumes/educations/${id}`);
  return response.data;
};

// 7.18 (유학생) 언어 - ETC 삭제하기
export const deleteEtcLanguageLevel = async (id: number) => {
  const response = await api.delete(
    `/users/resumes/languages/additional-languages/${id}`,
  );
  return response.data;
};

// 7.19 (고용주) 이력서 조회하기
export const getApplicantResume = async (id: number) => {
  const response = await api.get(
    `/owners/user-owner-job-postings/${id}/users/resumes/details`,
  );
  return response.data;
};

// 9.1 (유학생) 학교 검색하기
export const getSearchSchools = async ({
  search,
  page,
  size,
}: {
  search: string;
  page: string;
  size: string;
}) => {
  const response = await api.get(
    `/users/schools/briefs?search=${search}&page=${page}&size=${size}`,
  );
  return response.data;
};
