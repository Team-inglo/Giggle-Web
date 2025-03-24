import { api } from '.';

// 12.1 (게스트) 배너 요약 조회하기
export const getGuestBannerOverview = async () => {
  const response = await api.get(`/guests/banners/overviews`);
  return response.data;
};

// 12.2 (게스트) 배너 상세 조회하기
export const getGuestBannerDetail = async (id: number) => {
  const response = await api.get(`/guests/banners/${id}/details`);
  return response.data;
};

// 12.3 (유학생/고용주) 배너 요약 조회하기
export const getUserBannerOverview = async () => {
  const response = await api.get(`/banners/overviews`);
  return response.data;
};

// 12.4 (유학생/고용주) 배너 상세 조회하기
export const getUserBannerDetail = async (id: number) => {
  const response = await api.get(`/banners/${id}/details`);
  return response.data;
};
