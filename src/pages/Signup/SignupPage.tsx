import { useEffect, useState } from 'react';
import FindJourney from '@/components/Signup/FindJourney';
import SignupInput from '@/components/Signup/SignupInput';
import { UserType } from '@/constants/user';
import EmailInput from '@/components/Signup/EmailInput';
import SignupVerification from '@/components/Signup/SignupVerification';
import VerificationSuccessful from '@/components/Signup/VerificationSuccessful';
import { useNavigate } from 'react-router-dom';
import { usePatchAuthentication, useTempSignUp } from '@/hooks/api/useAuth';
import { deleteAccessToken, deleteRefreshToken } from '@/utils/auth';
import { useUserStore } from '@/store/user';
import BaseHeader from '@/components/Common/Header/BaseHeader';

const SignupPage = () => {
  const navigate = useNavigate();
  const { updateAccountType, updateName } = useUserStore();

  // sign up 단계(총 5단계)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // sign-up Field 상태 관리
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [accountType, setCurrentType] = useState<UserType | null>(null);

  // authentication-code Field 상태 관리
  const [authenticationCode, setAuthenticationCode] = useState<string>('');

  // mutate 관리
  const { mutate: tempSignUp } = useTempSignUp();
  const { mutate: verifyAuthCode } = usePatchAuthentication();

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
  const handleIdChange = (value: string) => {
    setId(value);
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
      { id: id, password: password, email: email, account_type: UserType.USER },
      { onSuccess: handleSignUpClick },
    );
  };

  // API - 2.7 이메일 인증코드 검증
  const handleVerify = () => {
    verifyAuthCode(
      { id: id, email: email, authentication_code: authenticationCode },
      { onSuccess: () => setCurrentStep(currentStep + 1) },
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
      <BaseHeader
        hasBackButton={true}
        onClickBackButton={() => handleBackButtonClick()}
        hasMenuButton={false}
        title="Sign Up"
      />
      {currentStep === 5 ? (
        <VerificationSuccessful />
      ) : (
        <div className="w-screen flex justify-center items-center pt-6 pb-[3.125rem]">
          <hr
            className={`w-[25%] h-1 border-0 ${
              currentStep >= 1 ? 'bg-[#FEF387]' : 'bg-[#F4F4F9]'
            }`}
          />
          <hr
            className={`w-[25%] h-1 border-0 ${
              currentStep >= 2 ? 'bg-[#FEF387]' : 'bg-[#F4F4F9]'
            }`}
          />
          <hr
            className={`w-[25%] h-1 border-0 ${
              currentStep >= 3 ? 'bg-[#FEF387]' : 'bg-[#F4F4F9]'
            }`}
          />
          <hr
            className={`w-[25%] h-1 border-0 ${
              currentStep === 4 ? 'bg-[#FEF387]' : 'bg-[#F4F4F9]'
            }`}
          />
        </div>
      )}
      {/* 회원가입 STEP 별 랜딩 컴포넌트 */}
      <div className="grow px-6 flex flex-col items-center">
        {currentStep === 1 && (
          <FindJourney
            onSignUpClick={handleSignUpClick}
            onTypeSelect={handleTypeSelect}
            accountType={accountType}
          />
        )}
        {currentStep === 2 && (
          <SignupInput
            onSignUpClick={handleSignUpClick}
            id={id}
            password={password}
            onIdChange={handleIdChange}
            onPasswordChange={handlePasswordChange}
          />
        )}
        {currentStep === 3 && (
          <EmailInput
            email={email}
            onEmailChange={handleEmailChange}
            onSubmit={handleSignUp} // 이메일을 입력하고 제출하면 임시 회원가입 API 호출
          />
        )}
        {currentStep === 4 && (
          <SignupVerification
            email={email}
            id={id}
            authenticationCode={authenticationCode}
            onAuthCodeChange={handleAuthCodeChange}
            onSubmit={handleVerify} // 인증코드 입력하고 제출하면 이메일 인증코드 검증 API 호출
          />
        )}
      </div>
    </div>
  );
};

export default SignupPage;
