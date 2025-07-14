import { useState, useEffect, useMemo } from 'react';
import { useEmailTryCountStore } from '@/store/signup';
import {
  useGetEmailValidation,
  usePatchAuthentication,
  useReIssueAuthentication,
} from '@/hooks/api/useAuth';
import { useToast } from '@/hooks/useToast';
import { validateEmail } from '@/utils/signin';
import {
  signInputTranslation,
  toastTranslation,
} from '@/constants/translation';
import { Language } from '@/components/Common/HelperLabel';
import { useLocation } from 'react-router-dom';
import useDebounce from './useDebounce';

// 이메일 인증 상태 상수 정의
export const EMAIL_VERIFY_STATUS = {
  IDLE: null,
  SENT: 'sent',
  RESENT: 'resent',
  VERIFIED: 'verified',
  ERROR: 'error',
} as const;

export type EmailVerifyStatus =
  (typeof EMAIL_VERIFY_STATUS)[keyof typeof EMAIL_VERIFY_STATUS];

export type EmailVerificationResult = {
  isValid: boolean;
  email: string;
  authenticationCode: string;
  isVerified: boolean;
};

type UseEmailVerificationProps = {
  language: Language;
  context?: 'signup' | 'reset-password' | 'signin';
  initialEmail?: string;
};

export const useEmailVerification = ({
  language,
  context = 'signup',
  initialEmail = '',
}: UseEmailVerificationProps) => {
  // 컨텍스트 기반 설정값들 미리 계산
  const needsVerification = context !== 'signin';
  const { pathname } = useLocation();
  const contextPath = useMemo(() => {
    switch (context) {
      case 'reset-password':
        return '/employer/reset-password';
      case 'signin':
        return '/employer/signin';
      default:
        return pathname;
    }
  }, [context, pathname]);

  // 내부 상태 관리
  const [email, setEmail] = useState<string>(initialEmail);
  const [authenticationCode, setAuthenticationCode] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [emailVerifyStatus, setEmailVerifyStatus] = useState<EmailVerifyStatus>(
    EMAIL_VERIFY_STATUS.IDLE,
  );
  const debouncedEmail = useDebounce(email);

  // API 훅들 (로그인에서는 실제로 사용되지 않지만 조건부 훅 호출은 회피)
  const { try_cnt } = useEmailTryCountStore();
  const { data: ValidationResponse } = useGetEmailValidation(debouncedEmail);
  const { success } = useToast();
  const { mutate: reIssueAuthentication } = useReIssueAuthentication();
  const { mutate: verifyAuthCode } = usePatchAuthentication();

  // 이메일 존재 여부에 따른 에러 처리 로직
  const handleEmailValidationResponse = (isValid: boolean) => {
    const isSignupContext = ['/signup', '/employer/signup'].includes(
      contextPath,
    );

    if (isSignupContext) {
      // 회원가입: 이메일이 이미 존재하면 에러
      setEmailError(
        isValid ? null : signInputTranslation.emailAlreadyExists[language],
      );
    } else {
      // 로그인/비밀번호 재설정: 이메일이 존재하지 않으면 에러
      setEmailError(isValid ? signInputTranslation.emailWrong[language] : null);
    }
  };

  // 이메일 유효성 검사
  useEffect(() => {
    if (!email) {
      setEmailError(null);
      return;
    }

    // 이메일 형식 유효성 검사
    const isValidFormat = validateEmail(email, setEmailError, contextPath);
    if (!isValidFormat) return;

    // 이메일 존재 여부 검사 결과 처리
    if (ValidationResponse) {
      handleEmailValidationResponse(ValidationResponse.data.is_valid);
    }
  }, [debouncedEmail, ValidationResponse, contextPath, language]);

  // 이메일 인증코드 검증
  const handleVerifyClick = () => {
    if (
      !needsVerification ||
      emailVerifyStatus === EMAIL_VERIFY_STATUS.VERIFIED
    ) {
      return;
    }

    verifyAuthCode(
      { email, authentication_code: authenticationCode },
      {
        onSuccess: () => setEmailVerifyStatus(EMAIL_VERIFY_STATUS.VERIFIED),
        onError: () => {
          setEmailVerifyStatus(EMAIL_VERIFY_STATUS.ERROR);
          setEmailError(
            `${signInputTranslation.verifyFailed[language]} (${try_cnt}/5)`,
          );
        },
      },
    );
  };

  // 이메일 인증코드 재전송
  const handleResendClick = async () => {
    if (!needsVerification || !debouncedEmail || emailError) {
      return;
    }

    try {
      reIssueAuthentication(
        { email: debouncedEmail },
        {
          onSuccess: () => {
            setAuthenticationCode('');
            const status =
              try_cnt > 1
                ? EMAIL_VERIFY_STATUS.RESENT
                : EMAIL_VERIFY_STATUS.SENT;
            setEmailVerifyStatus(status);

            const message =
              status === EMAIL_VERIFY_STATUS.RESENT
                ? toastTranslation.newVerifyCodeSent[language]
                : toastTranslation.verifyCodeSent[language];
            success(message);
          },
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  // 이메일 입력 핸들러
  const handleEmailInput = (value: string) => {
    // 인증 완료 상태에서는 이메일 변경 불가 (로그인 제외)
    if (
      needsVerification &&
      emailVerifyStatus === EMAIL_VERIFY_STATUS.VERIFIED
    ) {
      return;
    }

    setEmail(value);

    // 인증이 필요한 컨텍스트에서만 상태 초기화
    if (needsVerification) {
      setEmailVerifyStatus(EMAIL_VERIFY_STATUS.IDLE);
    }
  };

  // 검증 결과 계산
  const isEmailValid = !!email && !emailError;
  const isVerified = needsVerification
    ? emailVerifyStatus === EMAIL_VERIFY_STATUS.VERIFIED
    : true;
  const isValid = isEmailValid && isVerified;

  return {
    // 상태
    email,
    authenticationCode,
    emailError,
    emailVerifyStatus,
    isValid,
    isVerified,
    isEmailValid,

    // 핸들러
    handleEmailInput,
    setAuthenticationCode,
    handleVerifyClick,
    handleResendClick,

    // 검증 결과
    getVerificationResult: (): EmailVerificationResult => ({
      isValid,
      email,
      authenticationCode,
      isVerified,
    }),
  };
};
