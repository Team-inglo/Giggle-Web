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
        title="Sign In"
        onClickBackButton={() => navigate('/')}
      />
      <div className="w-full flex-grow flex flex-col">
        <div className="flex items-start mx-6 my-[3.125rem] h-[5rem] text-[#1E1926] text-[1.75rem] font-semibold">
          이메일로 로그인
        </div>
        <SigninInputSection />
        {/* <SigninSocialButtons /> */}
      </div>
    </div>
  );
};

export default SigninPage;
