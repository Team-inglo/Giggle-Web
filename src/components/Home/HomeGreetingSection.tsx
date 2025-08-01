import { UserType } from '@/constants/user';
import { useUserStore } from '@/store/user';

// 사용자 인사말과 헤드라인을 담당하는 컴포넌트
const HomeGreetingSection = () => {
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

  const getHeadlineMessage = (accountType?: UserType) => {
    return accountType === UserType.OWNER
      ? '필요한 인재를 필요한 순간에 🤝'
      : 'Find your perfect job';
  };

  return (
    <>
      <p className="pb-1 body-14-regular text-text-alternative">
        {getGreetingMessage(account_type)}
      </p>
      <h2 className="heading-20-semibold text-text-strong pb-2">
        {getHeadlineMessage(account_type)}
      </h2>
    </>
  );
};

export default HomeGreetingSection;
