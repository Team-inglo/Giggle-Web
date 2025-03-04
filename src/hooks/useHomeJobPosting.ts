import { POST_SEARCH_MENU } from '@/constants/postSearch';
import { useGetPostGuestList, useGetPostList } from '@/hooks/api/usePost';

// 홈 페이지에서 유학생, 고용주에 따라서 다른 공고를 조회하는 훅
export const useHomeJobPosting = (type: POST_SEARCH_MENU, isLogin: boolean) => {
  const request = { size: 5, type };
  const guestData = useGetPostGuestList(request, !isLogin);
  const userData = useGetPostList(request, isLogin);

  return {
    data: isLogin ? userData.data : guestData.data,
    isLoading: isLogin ? userData.isLoading : guestData.isLoading,
  };
};
