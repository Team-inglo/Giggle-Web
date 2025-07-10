import { useEffect, useState } from 'react';
import Input from '@/components/Common/Input';
import Button from '@/components/Common/Button';
import { useLocation } from 'react-router-dom';
import { validatedConfirmPassword, validatePassword } from '@/utils/signin';
import { isEmployer } from '@/utils/signup';
import { signInputTranslation } from '@/constants/translation';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import InputLayout from '@/components/WorkExperience/InputLayout';
import PageTitle from '@/components/Common/PageTitle';
import useDebounce from '@/hooks/useDebounce';
import { InputType } from '@/types/common/input';
import EmailVerifier from '../Auth/EmailVerifier';

type signupInputProps = {
  email: string;
  onEmailChange: (value: string) => void;
  password: string;
  onPasswordChange: (value: string) => void;
  authenticationCode: string;
  onAuthCodeChange: (value: string) => void;
  onSignUpClick: () => void;
};

const SignupInput = ({
  onSignUpClick,
  email,
  password,
  authenticationCode,
  onEmailChange,
  onPasswordChange,
  onAuthCodeChange,
}: signupInputProps) => {
  const { pathname } = useLocation();
  const [emailVerifyStatus, setEmailVerifyStatus] = useState<string | null>(
    null,
  );
  const [confirmPasswordValue, setConfirmPasswordValue] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>();
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);
  const [isValid, setIsValid] = useState(false);
  const debouncedEmail = useDebounce(email);
  const debouncedPassword = useDebounce(password);

  // 비밀번호 유효성 검사를 위한 단일 useEffect
  useEffect(() => {
    const isPasswordValid = debouncedPassword
      ? validatePassword(
          debouncedPassword,
          setPasswordError,
          isEmployer(pathname),
        )
      : false;
    const isConfirmValid = confirmPasswordValue === debouncedPassword;

    if (confirmPasswordValue) {
      validatedConfirmPassword(
        debouncedPassword,
        confirmPasswordValue,
        setConfirmPasswordError,
        isEmployer(pathname),
      );
    }

    // 전체 폼 유효성 상태 업데이트
    const isEmailValid = !!debouncedEmail && !emailError;
    setIsValid(
      isEmailValid &&
        isPasswordValid &&
        isConfirmValid &&
        emailVerifyStatus === 'verified',
    );
  }, [
    debouncedEmail,
    emailError,
    debouncedPassword,
    confirmPasswordValue,
    pathname,
    emailVerifyStatus,
  ]);

  // 부모 컴포넌트로 값 전달
  useEffect(() => {
    if (email) onEmailChange(email);
  }, [email, onEmailChange]);

  useEffect(() => {
    if (password) onPasswordChange(password);
  }, [password, onPasswordChange]);

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPasswordValue(value);
  };

  return (
    <div className="w-full">
      <PageTitle
        title={signInputTranslation.signup[isEmployer(pathname)]}
        content={signInputTranslation.signupContent[isEmployer(pathname)]}
      />
      <div className="flex flex-col px-4">
        <div className="flex flex-col gap-6 mb-[7.125rem]">
          <EmailVerifier
            email={email}
            setEmail={onEmailChange}
            emailError={emailError}
            setEmailError={setEmailError}
            emailVerifyStatus={emailVerifyStatus}
            setEmailVerifyStatus={setEmailVerifyStatus}
            setIsValid={setIsValid}
            language={isEmployer(pathname)}
            authenticationCode={authenticationCode}
            setAuthenticationCode={onAuthCodeChange}
          />
          <InputLayout
            title={signInputTranslation.password[isEmployer(pathname)]}
          >
            <Input
              inputType={InputType.PASSWORD}
              placeholder={
                signInputTranslation.enterPassword[isEmployer(pathname)]
              }
              value={password}
              onChange={onPasswordChange}
              canDelete={false}
            />
            {passwordError && (
              <p className="text-text-error caption-12-semibold px-1 py-2">
                {passwordError}
              </p>
            )}
          </InputLayout>
          <InputLayout
            title={signInputTranslation.confirmPassword[isEmployer(pathname)]}
          >
            <Input
              inputType={InputType.PASSWORD}
              placeholder={
                signInputTranslation.enterConfirmPassword[isEmployer(pathname)]
              }
              value={confirmPasswordValue}
              onChange={handleConfirmPasswordChange}
              canDelete={false}
            />
            {confirmPasswordError && (
              <p className="text-text-error caption-12-semibold px-1 py-2">
                {confirmPasswordError}
              </p>
            )}
          </InputLayout>
        </div>
        <BottomButtonPanel>
          <Button
            type={isValid ? Button.Type.PRIMARY : Button.Type.DISABLED}
            size={Button.Size.LG}
            isFullWidth
            title={signInputTranslation.continue[isEmployer(pathname)]}
            onClick={isValid ? onSignUpClick : undefined}
          />
        </BottomButtonPanel>
      </div>
    </div>
  );
};

export default SignupInput;
