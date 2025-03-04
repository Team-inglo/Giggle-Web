import {
  getApplicationCounts,
  getBookmarksCounts,
  getOwnerApplicationCounts,
  getOwnerProfile,
  getOwnerSummaries,
  getUserProfile,
  getUserSummaries,
  patchOwnerProfile,
  patchUserProfile,
} from '@/api/mypage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

// 3.1 (유학생) 유저 프로필 조회하기 API 통신 훅
export const useGetUserProfile = () => {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: getUserProfile,
  });
};

// 3.2 (고용주) 회사 정보 조회하기
export const useGetOwnerProfile = () => {
  return useQuery({
    queryKey: ['ownerProfile'],
    queryFn: getOwnerProfile,
  });
};

// 3.3 (유학생) 유저 요약 정보 조회하기
export const useGetUserSummaries = () => {
  return useQuery({
    queryKey: ['userSummaries'],
    queryFn: getUserSummaries,
  });
};

// 3.4 (고용주) 고용주 간단 정보 조회하기
export const usegetOwnerSummaries = () => {
  return useQuery({
    queryKey: ['ownerSummaries'],
    queryFn: getOwnerSummaries,
  });
};

// 3.5 (유학생) 프로필 수정
export const usePatchUserProfile = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: patchUserProfile,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['userSummaries'],
      });
      navigate('/profile');
    },
    onError: (error) => {
      console.error('프로필 수정 실패', error);
    },
  });
};

// 3.6 (고용주) 회사 정보 수정하기
export const usePatchOwnerProfile = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: patchOwnerProfile,
    onSuccess: () => {
      navigate('/employer/profile');
    },
    onError: (error) => {
      console.error('프로필 수정 실패', error);
    },
  });
};

// 5.2 (유학생) 북마크 현황(개수) 확인하기
export const userGetBookmarksCounts = () => {
  return useQuery({
    queryKey: ['bookmarksCounts'],
    queryFn: getBookmarksCounts,
  });
};

// 6.4 (유학생) 지원 현황(개수) 확인하기
export const useGetApplicationCounts = () => {
  return useQuery({
    queryKey: ['applicationCounts'],
    queryFn: getApplicationCounts,
  });
};

// 6.9 (고용주) 지원 현황(개수) 확인하기
export const useGetOwnerApplicationCounts = () => {
  return useQuery({
    queryKey: ['ownerApplicationCounts'],
    queryFn: getOwnerApplicationCounts,
  });
};
