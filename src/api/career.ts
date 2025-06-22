import { GetCareerListReqType } from '@/types/api/career';
import { api } from '.';
import { filterNullParams } from '@/utils/filterNullParams';
import { convertKeysToKebabCase } from '@/utils/convertKeysToKebabCase';

// 14.1 (게스트) 커리어 리스트 조회
export const getCareerListGuest = async (
  req: GetCareerListReqType,
  page: number,
) => {
  const response = await api.get(`/guests/careers/overviews`, {
    params: { ...filterNullParams(req), page },
  });
  return response.data;
};

// 14.2 (게스트) 커리어 상세 조회하기
export const getCareerDetailGuest = async (id: number) => {
  const response = await api.get(`/guests/careers/${id}/details`);
  return response.data;
};

// 14.3 (유학생/고용주) 커리어 리스트 조회
export const getCareerList = async (
  req: GetCareerListReqType,
  page: number,
) => {
  const convertedParams = convertKeysToKebabCase({
    ...filterNullParams(req),
    page,
  });

  const response = await api.get('/users/careers/overviews', {
    params: convertedParams,
  });

  return response.data;
};

// 14.4 (유학생/고용주) 커리어 상세 조회하기
export const getCareerDetail = async (id: number) => {
  const response = await api.get(`/users/careers/${id}/details`);
  return response.data;
};

// 14.6 (유학생) 커리어 북마크 추가/삭제
export const putCareerBookmark = async (id: number) => {
  const response = await api.put(`/users/careers/${id}/book-mark-careers`);
  return response.data;
};
