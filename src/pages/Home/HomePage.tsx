import HomeHeader from '@/components/Home/HomeHeader';
import HomeJobPostingSection from '@/components/Home/HomeJobPostingSection';
import { useEffect } from 'react';
import { useUserStore } from '@/store/user';
import { preloadCriticalPages } from '@/utils/preloader';
import HomeTopSection from '@/components/Home/HomeTopSection';
import HomeBannerCarousel from '@/components/Home/HomeBannerCarousel';

const HomePage = () => {
  const { account_type } = useUserStore();

  // 사용자 타입별 핵심 페이지 프리로딩 (비로그인 포함)
  useEffect(() => {
    // 페이지 로딩이 완료된 후 프리로딩 시작
    const startPreloading = () => {
      // 브라우저의 idle 상태에서 프리로딩 실행
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(
          () => {
            // account_type이 undefined면 GUEST로 처리됨
            preloadCriticalPages(account_type);
          },
          { timeout: 2000 },
        );
      } else {
        // requestIdleCallback이 지원되지 않는 경우 fallback
        setTimeout(() => {
          preloadCriticalPages(account_type);
        }, 1500);
      }
    };

    startPreloading();
  }, [account_type]);

  {
    /*useEffect(() => {
    // 스택 추가
    history.pushState(null, '', location.href);

    // 뒤로라기 이벤트감지 -> 현재페이지로 이동
    window.onpopstate = function () {
      history.go(1);
    };
  }, []);*/
  }
  return (
    <>
      <HomeHeader />
      <HomeTopSection />
      <HomeBannerCarousel />
      <HomeJobPostingSection />
    </>
  );
};

export default HomePage;
