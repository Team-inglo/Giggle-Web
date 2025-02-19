import HomeBanner from '@/components/Home/HomeBanner';
import HomeMenu from '@/components/Home/HomeMenu';
import HomeHeader from '@/components/Home/HomeHeader';
import HomeJobPostingList from '@/components/Home/HomeJobPostingList';

const HomePage = () => {
  return (
    <>
      <HomeHeader />
      <HomeBanner />
      <HomeMenu />
      <HomeJobPostingList />
    </>
  );
};

export default HomePage;
