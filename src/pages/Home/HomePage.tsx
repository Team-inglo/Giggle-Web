import HomeBanner from '@/components/Home/HomeBanner';
import HomeMenu from '@/components/Home/HomeMenu';
import HomeHeader from '@/components/Home/HomeHeader';
import HomeJobPostingSection from '@/components/Home/HomeJobPostingSection';
//import { useEffect } from 'react';

const HomePage = () => {
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
      <HomeBanner />
      <HomeMenu />
      <HomeJobPostingSection />
    </>
  );
};

export default HomePage;
