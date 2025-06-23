import { useEffect, useState } from 'react';
import Input from '@/components/Common/Input';
import Button from '@/components/Common/Button';
import { useLocation } from 'react-router-dom';
import {
  validatedConfirmPassword,
  validateEmail,
  validatePassword,
} from '@/utils/signin';
import { isEmployer } from '@/utils/signup';
import { signInputTranclation } from '@/constants/translation';
import {
  useGetEmailValidation,
  usePatchAuthentication,
  useReIssueAuthentication,
} from '@/hooks/api/useAuth';
import BottomButtonPanel from '../Common/BottomButtonPanel';
import InputLayout from '../WorkExperience/InputLayout';
import { useEmailTryCountStore } from '@/store/signup';
import PageTitle from '../Common/PageTitle';
import useDebounce from '@/hooks/useDebounce';
import { InputType } from '@/types/common/input';

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
  const { try_cnt } = useEmailTryCountStore();
  const [passwordError, setPasswordError] = useState<string | null>();
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);
  const [isValid, setIsValid] = useState(false);
  const debouncedEmail = useDebounce(email);
  const debouncedPassword = useDebounce(password);

  const { data: ValidationResponse } = useGetEmailValidation(email);

  // 이메일 재발송 훅
  const { mutate: reIssueAuthentication } = useReIssueAuthentication();
  // 인증코드 검증 훅
  const { mutate: verifyAuthCode } = usePatchAuthentication();

  // 이메일 입력 시, 인증번호 발송 초기화
  const handleEmailInput = (value: string) => {
    if (emailVerifyStatus === 'verified') return;
    onEmailChange(value);
    setEmailVerifyStatus(null);
  };

  // 이메일 유효성 검사를 위한 단일 useEffect
  useEffect(() => {
    const validateEmailAsync = async () => {
      if (debouncedEmail === '') {
        setEmailError(null);
        setIsValid(false);
        return;
      }

      // 1. 기본 이메일 형식 검사
      const isEmailFormatValid = validateEmail(
        debouncedEmail,
        setEmailError,
        pathname,
      );
      if (!isEmailFormatValid) {
        setIsValid(false);
        return;
      }

      // 2. 이메일 중복 검사 결과 처리
      if (ValidationResponse) {
        if (!ValidationResponse.data.is_valid) {
          setEmailError(
            signInputTranclation.emailAvailability[isEmployer(pathname)],
          );
          setIsValid(false);
        }
      }
    };

    validateEmailAsync();
  }, [debouncedEmail, ValidationResponse, pathname]);

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

  // API - 2.7 이메일 인증코드 검증
  const handleVerifyClick = () => {
    verifyAuthCode(
      //TODO: id가 이메일 형태로 받게되면 id를 email로 변경
      { email: email, authentication_code: authenticationCode },
      {
        onSuccess: () => {
          setEmailVerifyStatus('verified');
          setEmailError(null);
        },
        onError: () => {
          setEmailVerifyStatus('error');
          setEmailError(
            `${signInputTranclation.verifyFailed[isEmployer(pathname)]} (${try_cnt}/5)`,
          );
        },
      },
    );
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPasswordValue(value);
  };

  // 이메일 인증코드 재전송 API 호출
  const handleResendClick = async () => {
    try {
      // 5회 이내 재발송 가능
      reIssueAuthentication(
        { email: email },
        {
          onSuccess: () => {
            onAuthCodeChange('');
            const status = try_cnt > 1 ? 'resent' : 'sent';
            setEmailVerifyStatus(status);
            setEmailError(null);
          },
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full">
      <PageTitle
        title={signInputTranclation.signup[isEmployer(pathname)]}
        content={signInputTranclation.signupContent[isEmployer(pathname)]}
      />
      <div className="flex flex-col gap-2">
        <div className="flex flex-col mb-[7.125rem]">
          <InputLayout title={signInputTranclation.email[isEmployer(pathname)]}>
            <div className="flex gap-2">
              <Input
                inputType={InputType.TEXT}
                placeholder={
                  signInputTranclation.enterEmail[isEmployer(pathname)]
                }
                value={email}
                onChange={handleEmailInput}
                canDelete={false}
              />
              <button
                className={`flex items-center justify-center button-14-semibold min-w-[4.25rem] px-5 py-3 rounded-lg ${
                  emailVerifyStatus === null &&
                  !emailError &&
                  debouncedEmail !== ''
                    ? 'bg-surface-primary text-text-normal'
                    : 'bg-surface-secondary text-text-disabled'
                }`}
                onClick={handleResendClick}
                disabled={
                  !(
                    emailVerifyStatus === null &&
                    !emailError &&
                    debouncedEmail !== ''
                  )
                }
                aria-disabled={
                  !(
                    emailVerifyStatus === null &&
                    !emailError &&
                    debouncedEmail !== ''
                  )
                }
              >
                {emailVerifyStatus === null && !emailError
                  ? signInputTranclation.sendEmail[isEmployer(pathname)]
                  : signInputTranclation.emailSentBtnText[isEmployer(pathname)]}
              </button>
            </div>
            {/* 인증번호 전송 후 인증번호 입력 input 출현 */}
            {emailVerifyStatus !== null && (
              <div className="flex gap-2 h-full pt-2">
                <div className="relative w-full">
                  <Input
                    inputType={InputType.TEXT}
                    placeholder={
                      signInputTranclation.verification[isEmployer(pathname)]
                    }
                    value={authenticationCode}
                    onChange={onAuthCodeChange}
                    canDelete={false}
                  />
                  {emailVerifyStatus !== 'verified' && (
                    <button
                      className="caption-12-regular text-blue-500 underline absolute right-[1rem] top-[1rem]"
                      onClick={handleResendClick} // 이메일 인증코드 재전송 API 호출
                    >
                      {signInputTranclation.resend[isEmployer(pathname)]}
                    </button>
                  )}
                </div>
                <button
                  className={`flex items-center justify-center min-w-[5.5rem] button-14-semibold px-5 py-3 rounded-lg ${
                    emailVerifyStatus === 'verified' &&
                    authenticationCode !== ''
                      ? 'bg-surface-secondary text-text-disabled'
                      : 'bg-surface-primary text-text-normal'
                  }`}
                  onClick={
                    emailVerifyStatus === 'verified'
                      ? undefined
                      : handleVerifyClick
                  }
                >
                  {signInputTranclation.verify[isEmployer(pathname)]}
                </button>
              </div>
            )}
            {emailVerifyStatus === 'sent' && (
              <>
                <p className="text-blue-600 text-xs p-2">
                  {signInputTranclation.enterCode[isEmployer(pathname)]}
                </p>
                <p className="text-[#FF6F61] text-xs px-2 pb-2">
                  {' '}
                  {signInputTranclation.spamEmailInfo[isEmployer(pathname)]}
                </p>
              </>
            )}
            {emailVerifyStatus === 'resent' && (
              <p className="text-blue-600 text-xs p-2">
                {signInputTranclation.resentMessage[isEmployer(pathname)]}
              </p>
            )}
            {emailVerifyStatus === 'verified' && (
              <p className="text-blue-600 text-xs p-2">
                {signInputTranclation.successVerify[isEmployer(pathname)]}
              </p>
            )}
            {emailError && (
              <p className="text-[#FF6F61] text-xs p-2">{emailError}</p>
            )}
            {/* 비밀번호 입력 input */}
          </InputLayout>
          <InputLayout
            title={signInputTranclation.password[isEmployer(pathname)]}
          >
            <Input
              inputType={InputType.PASSWORD}
              placeholder={
                signInputTranclation.enterPassword[isEmployer(pathname)]
              }
              value={password}
              onChange={onPasswordChange}
              canDelete={false}
            />
            {passwordError && (
              <p className="text-[#FF6F61] text-xs p-2">{passwordError}</p>
            )}
          </InputLayout>
          <InputLayout
            title={signInputTranclation.confirmPassword[isEmployer(pathname)]}
          >
            <Input
              inputType={InputType.PASSWORD}
              placeholder={
                signInputTranclation.enterConfirmPassword[isEmployer(pathname)]
              }
              value={confirmPasswordValue}
              onChange={handleConfirmPasswordChange}
              canDelete={false}
            />
            {confirmPasswordError && (
              <p className="text-[#FF6F61] text-xs p-2">
                {confirmPasswordError}
              </p>
            )}
          </InputLayout>
        </div>
        <BottomButtonPanel>
          <div className="w-full">
            <Button
              type="large"
              bgColor={isValid ? 'bg-surface-primary' : 'bg-surface-secondary'}
              fontColor={isValid ? 'text-text-normal' : 'text-text-disabled'}
              isBorder={false}
              title={signInputTranclation.continue[isEmployer(pathname)]}
              onClick={isValid ? onSignUpClick : undefined}
            />
          </div>
        </BottomButtonPanel>
      </div>
    </div>
  );
};

export default SignupInput;
