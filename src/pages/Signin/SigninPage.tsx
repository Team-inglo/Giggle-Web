import BaseHeader from '@/components/Common/Header/BaseHeader';
import SigninInputSection from '@/components/Signin/SigninInputSection';
import { useUserStore } from '@/store/user';
import { deleteAccessToken, deleteRefreshToken } from '@/utils/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SigninPage = () => {
  const { updateAccountType, updateName } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    // 토큰 삭제
    deleteAccessToken();
    deleteRefreshToken();
    // 유저 타입 전역 변수 초기화
    updateAccountType(undefined);
    updateName('');
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <BaseHeader
        hasBackButton={true}
        hasMenuButton={false}
        title="로그인"
        onClickBackButton={() => navigate('/')}
      />
      <div className="w-full flex-grow flex flex-col">
        <div className="flex flex-col w-full gap-1 py-[3.125rem] px-4">
          <div className="heading-28-semibold">이미 계정이 있으신가요?</div>
          <div className="body-14-regular text-text-alternative">
            외국인 유학생을 지금 채용해 보세요!
          </div>
        </div>
        <SigninInputSection />
      </div>
    </div>
  );
};

export default SigninPage;
