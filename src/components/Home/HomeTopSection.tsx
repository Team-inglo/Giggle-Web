import ResumeHelperBanner from '@/components/ManageResume/ResumeHelperBanner';
import HomeGreetingSection from '@/components/Home/HomeGreetingSection';
import HomeMenu from '@/components/Home/HomeMenu';

const HomeTopSection = () => {
  return (
    <div className="pt-6 px-4">
      <HomeGreetingSection />
      <ResumeHelperBanner />
      <HomeMenu />
    </div>
  );
};

export default HomeTopSection;