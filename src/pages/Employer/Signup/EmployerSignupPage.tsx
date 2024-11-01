import { useState } from 'react';
import Stroke from '@/assets/icons/SignupStroke.svg?react';
import SignupInput from '@/components/Signup/SignupInput';
import EmailInput from '@/components/Signup/EmailInput';
import SignupVerification from '@/components/Signup/SignupVerification';
import VerificationSuccessful from '@/components/Signup/VerificationSuccessful';
import { usePatchAuthentication, useTempSignUp } from '@/hooks/api/useAuth';
import { UserType } from '@/constants/user';

const EmployerSignupPage = () => {
  // sign up 단계(총 4단계)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // sign-up Field 상태 관리
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  // authentication-code Field 상태 관리
  const [authenticationCode, setAuthenticationCode] = useState<string>('');

  // mutate 관리
  const { mutate: tempSignUp } = useTempSignUp();
  const { mutate: verifyAuthCode } = usePatchAuthentication();

  // handler 정의
  const handleSignUpClick = () => {
    setCurrentStep(currentStep + 1);
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
      {
        id: id,
        password: password,
        email: email,
        account_type: UserType.OWNER,
      },
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

  return (
    <div className="flex flex-col w-[100vw] h-[100vh] bg-white">
      {currentStep === 4 ? (
        <VerificationSuccessful id={id} pw={password}/>
      ) : (
        <div className="flex justify-center items-center gap-3 pt-6 pr-8 pb-[3.125rem] pl-8">
          <Stroke stroke="#FFF" />
          <Stroke stroke={currentStep === 1 ? '#1E1926' : '#FFF'} />
          <Stroke stroke={currentStep === 2 ? '#1E1926' : '#FFF'} />
          <Stroke stroke={currentStep === 3 ? '#1E1926' : '#FFF'} />
        </div>
      )}
      <div className="grow px-6 flex flex-col items-center">
        {currentStep === 1 && (
          <SignupInput
            onSignUpClick={handleSignUpClick}
            id={id}
            password={password}
            onIdChange={handleIdChange}
            onPasswordChange={handlePasswordChange}
          />
        )}
        {currentStep === 2 && (
          <EmailInput
            email={email}
            onEmailChange={handleEmailChange}
            onSubmit={handleSignUp} // 이메일을 입력하고 제출하면 임시 회원가입 API 호출
          />
        )}
        {currentStep === 3 && (
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

export default EmployerSignupPage;
