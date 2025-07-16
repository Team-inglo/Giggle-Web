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
import { EmailVerificationResult } from '@/hooks/useEmailVerification';

type signupInputProps = {
  password: string;
  onPasswordChange: (value: string) => void;
  onSignUpClick: () => void;
  // 상위 컴포넌트에서 이메일 검증 결과를 받기 위한 callback
  onEmailVerificationChange: (result: EmailVerificationResult) => void;
};

const SignupInput = ({
  onSignUpClick,
  password,
  onPasswordChange,
  onEmailVerificationChange,
}: signupInputProps) => {
  const { pathname } = useLocation();
  const [confirmPasswordValue, setConfirmPasswordValue] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string | null>();
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);
  const [isValid, setIsValid] = useState(false);
  const [emailVerificationResult, setEmailVerificationResult] =
    useState<EmailVerificationResult>({
      isValid: false,
      email: '',
      authenticationCode: '',
      isVerified: false,
    });

  const debouncedPassword = useDebounce(password);

  // 이메일 검증 결과 처리
  const handleEmailVerificationChange = async (
    result: EmailVerificationResult,
  ) => {
    setEmailVerificationResult(result);
    onEmailVerificationChange(result);
  };

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
    setIsValid(
      emailVerificationResult.isValid && isPasswordValid && isConfirmValid,
    );
  }, [
    debouncedPassword,
    confirmPasswordValue,
    pathname,
    emailVerificationResult.isValid,
  ]);

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
            language={isEmployer(pathname)}
            context={EmailVerifier.Context.SIGNUP}
            onValidationChange={handleEmailVerificationChange}
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
