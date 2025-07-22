import { useNavigate } from 'react-router-dom';
import {
  navigateWithTransition,
  navigateBackWithTransition,
  historyBackWithTransition,
} from '@/utils/navigation';


// View Transition을 사용하는 네비게이션 훅

export const useViewTransitionNavigate = () => {
  const navigate = useNavigate();


  // View Transition을 사용한 페이지 이동
  // 새 페이지가 오른쪽에서 슬라이드하여 현재 페이지를 덮음

  const navigateTo = (
    url: string,
    options?: Parameters<typeof navigate>[1],
  ) => {
    navigateWithTransition(navigate, url, options);
  };

  /**
   * View Transition을 사용한 뒤로 가기
   * 현재 페이지가 오른쪽으로 슬라이드하여 나가며 이전 페이지 노출
   */
  const goBack = (delta = -1) => {
    navigateBackWithTransition(navigate, delta);
  };

  /**
   * View Transition을 사용한 브라우저 뒤로 가기
   * 브라우저의 history.back() 사용
   */
  const goBackInHistory = () => {
    historyBackWithTransition();
  };

  return {
    navigateTo,
    goBack,
    goBackInHistory,
    // 기본 navigate도 필요시 제공
    navigate,
  };
};
