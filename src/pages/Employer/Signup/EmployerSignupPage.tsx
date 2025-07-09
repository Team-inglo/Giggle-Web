import { useEffect, useState } from 'react';
import SignupInput from '@/components/Signup/SignupInput';
import VerificationSuccessful from '@/components/Signup/VerificationSuccessful';
import { useTempSignUp } from '@/hooks/api/useAuth';
import { UserType } from '@/constants/user';
import { deleteAccessToken, deleteRefreshToken } from '@/utils/auth';
import { useUserStore } from '@/store/user';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import { signInputTranslation } from '@/constants/translation';
import { isEmployer } from '@/utils/signup';
import { useLocation, useNavigate } from 'react-router-dom';
import { checkEmployerPage } from '@/utils/checkUserPage';

const EmployerSignupPage = () => {
  const { updateAccountType, updateName } = useUserStore();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // sign up 단계(총 4단계)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // sign-up Field 상태 관리
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  // authentication-code Field 상태 관리
  const [authenticationCode, setAuthenticationCode] = useState<string>('');

  // mutate 관리
  const { mutate: tempSignUp } = useTempSignUp();

  // handler 정의
  const handleSignUpClick = () => {
    setCurrentStep(currentStep + 1);
  };
  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };
  const handleEmailChange = (value: string) => {
    setEmail(value);
  };
  const handleAuthCodeChange = (value: string) => {
    setAuthenticationCode(value);
  };

  // back 버튼 핸들러
  const handleBackButtonClick = () => {
    if (currentStep <= 1) {
      navigate('/signin');
      return;
    }
    setCurrentStep(currentStep - 1);
  };

  // API 정의
  // API - 2.4 임시 회원가입 API 호출
  const handleSignUp = () => {
    tempSignUp(
      {
        password: password,
        email: email,
        account_type: UserType.OWNER,
      },
      { onSuccess: handleSignUpClick },
    );
  };

  useEffect(() => {
    // 토큰 삭제
    deleteAccessToken();
    deleteRefreshToken();
    // 유저 타입 전역 변수 초기화
    updateAccountType(undefined);
    updateName('');
  }, []);

  return (
    <div className="flex flex-col w-[100vw] h-[100vh] bg-white">
      {currentStep === 2 ? (
        <VerificationSuccessful
          title={signInputTranslation.successVerify[isEmployer(pathname)]}
          content={
            signInputTranslation.successVerifyContent[isEmployer(pathname)]
          }
          buttonText={
            signInputTranslation.successVerifyBtn[isEmployer(pathname)]
          }
          onNext={() => {
            navigate(
              checkEmployerPage(pathname)
                ? '/employer/signup/information'
                : '/information',
            );
          }}
        />
      ) : (
        <>
          <BaseHeader
            hasBackButton
            hasMenuButton={false}
            title={signInputTranslation.signupTitle[isEmployer(pathname)]}
            onClickBackButton={() => handleBackButtonClick()}
          />
          <div className="flex justify-center items-center sticky top-[3.75rem]">
            <div className={`h-1 w-full bg-[#fef387]`} />
          </div>
        </>
      )}
      <div className="grow px-4 flex flex-col items-center">
        {currentStep === 1 && (
          <SignupInput
            onSignUpClick={handleSignUp}
            email={email}
            onEmailChange={handleEmailChange}
            password={password}
            onPasswordChange={handlePasswordChange}
            authenticationCode={authenticationCode}
            onAuthCodeChange={handleAuthCodeChange}
          />
        )}
      </div>
    </div>
  );
};

export default EmployerSignupPage;
