import { UserType } from '@/constants/user';
import { useUserStore } from '@/store/user';
import HomeBannerImg from '@/assets/images/HomeBanner.png';

const HomeBanner = () => {
  const { account_type, name } = useUserStore();

  const getGreetingMessage = (accountType?: UserType) => {
    switch (accountType) {
      case UserType.OWNER:
        return `환영해요, ${name.replace(/-/g, ' ')}님!`;
      case UserType.USER:
        return `Welcome, ${name.replace(/-/g, ' ')}`;
      default:
        return 'Welcome!';
    }
  };

  return (
    <div className="px-4">
      <div className="pt-8">
        <p className="pb-1 body-2 text-[#9397A1]">
          {getGreetingMessage(account_type)}
        </p>
        <h2 className="head-2 text-[#0A0909]">
          {account_type === UserType.OWNER
            ? '필요한 인재를 필요한 순간에 🤝'
            : 'Find your perfect job'}
        </h2>
      </div>
      {/* TODO: 캐러셀로 만들어서 가로 슬라이드 가능하도록! */}
      <section className="mt-4">
        <img
          src={HomeBannerImg}
          alt="banner image"
          className="w-full h-[10.5rem] rounded-lg object-cover object-center"
        />
      </section>
    </div>
  );
};

export default HomeBanner;
