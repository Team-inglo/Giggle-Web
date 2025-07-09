import { useEffect, useState } from 'react';
import FindJourney from '@/components/Signup/FindJourney';
import SignupInput from '@/components/Signup/SignupInput';
import { UserType } from '@/constants/user';
import VerificationSuccessful from '@/components/Signup/VerificationSuccessful';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTempSignUp } from '@/hooks/api/useAuth';
import { deleteAccessToken, deleteRefreshToken } from '@/utils/auth';
import { useUserStore } from '@/store/user';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import { signInputTranslation } from '@/constants/translation';
import { isEmployer } from '@/utils/signup';
import { checkEmployerPage } from '@/utils/checkUserPage';

const SignupPage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { updateAccountType, updateName } = useUserStore();

  // sign up 단계(총 5단계)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // sign-up Field 상태 관리
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [accountType, setCurrentType] = useState<UserType | null>(null);

  // authentication-code Field 상태 관리
  const [authenticationCode, setAuthenticationCode] = useState<string>('');

  // mutate 관리
  const { mutate: tempSignUp } = useTempSignUp();

  // back 버튼 핸들러
  const handleBackButtonClick = () => {
    if (currentStep <= 1) navigate('/signin');
    if (currentStep > 1 && currentStep < 5) setCurrentStep(currentStep - 1);
  };

  // handler 정의
  const handleSignUpClick = () => {
    // 고용주 타입을 선택할 경우, 고용주 회원가입 페이지로 이동
    if (accountType === UserType.OWNER) navigate('/employer/signup');
    // 유학생 타입을 선택할 경우, 유저 step 이어 진행
    setCurrentStep(currentStep + 1);
  };
  const handleTypeSelect = (type: UserType) => {
    setCurrentType(type);
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

  // API 정의
  // API - 2.4 임시 회원가입 API 호출
  const handleSignUp = () => {
    tempSignUp(
      {
        password: password,
        email: email,
        account_type: UserType.USER,
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
    <div className="flex flex-col w-screen h-screen bg-white">
      {currentStep === 3 ? (
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
            hasBackButton={true}
            onClickBackButton={() => handleBackButtonClick()}
            hasMenuButton={false}
            title="Sign Up"
          />
          <div className="w-screen flex justify-center items-center">
            <hr
              className={`w-[50%] h-1 border-0 ${
                currentStep >= 1 ? 'bg-[#FEF387]' : 'bg-[#F4F4F9]'
              }`}
            />
            <hr
              className={`w-[50%] h-1 border-0 ${
                currentStep >= 2 ? 'bg-[#FEF387]' : 'bg-[#F4F4F9]'
              }`}
            />
          </div>
        </>
      )}
      {/* 회원가입 STEP 별 랜딩 컴포넌트 */}
      <div className="grow flex flex-col items-center">
        {currentStep === 1 && (
          <FindJourney
            onSignUpClick={handleSignUpClick}
            onTypeSelect={handleTypeSelect}
            accountType={accountType}
          />
        )}
        {currentStep === 2 && (
          <SignupInput
            email={email}
            onEmailChange={handleEmailChange}
            authenticationCode={authenticationCode}
            onAuthCodeChange={handleAuthCodeChange}
            onSignUpClick={handleSignUp}
            password={password}
            onPasswordChange={handlePasswordChange}
          />
        )}
      </div>
    </div>
  );
};

export default SignupPage;
