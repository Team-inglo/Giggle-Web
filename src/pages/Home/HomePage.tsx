import HomeBanner from '@/components/Home/HomeBanner';
import HomeMenu from '@/components/Home/HomeMenu';
import HomeHeader from '@/components/Home/HomeHeader';
import HomeJobPostingSection from '@/components/Home/HomeJobPostingSection';

const HomePage = () => {
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
