import {
  AdditionalLanguageRequest,
  EducationRequest,
  GetEmployeeResumeListReq,
  IntroductionRequest,
  LanguagesLevelType,
  UserResumeDetailResponse,
  WorkExperienctRequest,
  WorkExperienceResponse,
} from '@/types/api/resumes';
import { api, apiV2 } from '.';
import { RESTYPE } from '@/types/api/common';
import { GetEducationType } from '@/types/postResume/postEducation';
import { WorkPreferenceType } from '@/types/postApply/resumeDetailItem';
import { filterNullParams } from '@/utils/filterNullParams';

// 7.1 (유학생) 이력서 조회하기
export const getResume = async (): Promise<
  RESTYPE<UserResumeDetailResponse>
> => {
  const response = await apiV2.get('/users/resumes/details');
  return response.data;
};

// 7.2 경력 상세 조회하기
export const getWorkExperience = async (
  id: string,
): Promise<RESTYPE<WorkExperienceResponse>> => {
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
  const response = await apiV2.patch(
    '/users/resumes/introduction',
    introduction,
  );
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

// 7.21 (유학생) 희망 근로 조건 상세 조회하기
export const getWorkPreference = async () => {
  const response = await api.get('/users/resumes/work-preferences/details');
  return response.data;
};

// 7.22 (유학생) 희망 근로 조건 수정하기
export const putWorkPreference = async (data: WorkPreferenceType) => {
  const response = await api.put('/users/resumes/work-preferences', data);
  return response.data;
};

// 7.23 (유학생) 이력서 공개 여부 수정하기
export const patchResumePublic = async (data: { is_public: boolean }) => {
  const response = await api.patch('/users/resumes/is-public', data);
  return response.data;
};

// 7.24 (고용주) 이력서 리스트 조회하기
export const getEmployeeResumeList = async (
  req: GetEmployeeResumeListReq,
  page: number,
) => {
  const response = await api.get(`/owners/resumes/overviews`, {
    params: { ...filterNullParams(req), page },
  });
  return response.data;
};

// 7.25 (고용주) 이력서 상세 조회하기
export const getResumeDetail = async (id: string) => {
  const response = await api.get(`/owners/resumes/${id}/details`);
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

// 15.1 (고용주) 인재 스크랩 추가/삭제
export const putScrapResume = async (id: string) => {
  const response = await api.put(`/owners/resumes/${id}/book-mark-resumes`);
  return response.data;
};
