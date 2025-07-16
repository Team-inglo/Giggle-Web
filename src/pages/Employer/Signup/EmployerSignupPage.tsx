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
import { EmailVerificationResult } from '@/hooks/useEmailVerification';
import ProgressStepper from '@/components/Common/ProgressStepper';

const EmployerSignupPage = () => {
  const { updateAccountType, updateName } = useUserStore();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // sign up 단계(총 4단계)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // sign-up Field 상태 관리
  const [password, setPassword] = useState<string>('');

  // 이메일 검증 결과 상태
  const [emailVerificationResult, setEmailVerificationResult] =
    useState<EmailVerificationResult>({
      isValid: false,
      email: '',
      authenticationCode: '',
      isVerified: false,
    });

  // mutate 관리
  const { mutate: tempSignUp } = useTempSignUp();

  // handler 정의
  const handleSignUpClick = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleEmailVerificationChange = (result: EmailVerificationResult) => {
    setEmailVerificationResult(result);
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
        email: emailVerificationResult.email,
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
          title={signInputTranslation.completeSignup[isEmployer(pathname)]}
          content={
            signInputTranslation.completeSignupContent[isEmployer(pathname)]
          }
          buttonText={
            signInputTranslation.completeSignupBtn[isEmployer(pathname)]
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
          <ProgressStepper currentStep={2} totalCount={2} />
        </>
      )}
      <div className="grow flex flex-col items-center">
        {currentStep === 1 && (
          <SignupInput
            onSignUpClick={handleSignUp}
            password={password}
            onPasswordChange={handlePasswordChange}
            onEmailVerificationChange={handleEmailVerificationChange}
          />
        )}
      </div>
    </div>
  );
};

export default EmployerSignupPage;
