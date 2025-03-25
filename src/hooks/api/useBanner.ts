import {
  getGuestBannerDetail,
  getGuestBannerOverview,
  getUserBannerDetail,
  getUserBannerOverview,
} from '@/api/banner';
import { useQuery } from '@tanstack/react-query';

// 12.1 (게스트) 배너 요약 조회하기 훅
export const useGetGuestBannerOverview = (isEnabled: boolean) => {
  return useQuery({
    queryKey: ['banner', 'guest'],
    queryFn: getGuestBannerOverview,
    enabled: isEnabled,
  });
};

// 12.2 (게스트) 배너 상세 조회하기 훅
export const useGetGuestBannerDetail = (id: number, isEnabled: boolean) => {
  return useQuery({
    queryKey: ['banner', 'guest', id],
    queryFn: () => getGuestBannerDetail(id),
    enabled: isEnabled,
  });
};

// 12.3 (유학생/고용주) 배너 요약 조회하기 훅
export const useGetUserBannerOverview = (isEnabled: boolean) => {
  return useQuery({
    queryKey: ['banner', 'user'],
    queryFn: getUserBannerOverview,
    enabled: isEnabled,
  });
};

// 12.4 (유학생/고용주) 배너 상세 조회하기 훅
export const useGetUserBannerDetail = (id: number, isEnabled: boolean) => {
  return useQuery({
    queryKey: ['banner', 'user', id],
    queryFn: () => getUserBannerDetail(id),
    enabled: isEnabled,
  });
};
