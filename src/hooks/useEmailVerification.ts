import { useState, useEffect } from 'react';
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
  context?: 'signup' | 'reset-password';
  initialEmail?: string;
};

export const useEmailVerification = ({
  language,
  context = 'signup',
  initialEmail = '',
}: UseEmailVerificationProps) => {
  // 내부 상태 관리
  const [email, setEmail] = useState<string>(initialEmail);
  const [authenticationCode, setAuthenticationCode] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [emailVerifyStatus, setEmailVerifyStatus] = useState<EmailVerifyStatus>(
    EMAIL_VERIFY_STATUS.IDLE,
  );
  const debouncedEmail = useDebounce(email);

  const { try_cnt } = useEmailTryCountStore(); // 이메일 인증 시도 횟수
  const { data: ValidationResponse } = useGetEmailValidation(debouncedEmail);
  const { success } = useToast(); // 토스트 메시지 표시 훅
  const { pathname } = useLocation();

  // 이메일 재발송 훅
  const { mutate: reIssueAuthentication } = useReIssueAuthentication();
  // 인증코드 검증 훅
  const { mutate: verifyAuthCode } = usePatchAuthentication();

  // 이메일 유효성 검사
  useEffect(() => {
    if (!email) {
      setEmailError(null);
      return;
    }

    // 이메일 형식 유효성 검사
    const contextPath =
      context === 'reset-password' ? '/employer/reset-password' : pathname;
    const isValidFormat = validateEmail(email, setEmailError, contextPath);

    if (!isValidFormat) return;

    // 이메일 존재 여부 검사 결과 처리
    if (ValidationResponse) {
      if (ValidationResponse.data.is_valid === true) {
        setEmailError(signInputTranslation.emailWrong[language]);
      } else {
        setEmailError(null);
      }
    }
  }, [debouncedEmail, ValidationResponse, context, language]);

  // API - 2.7 이메일 인증코드 검증
  const handleVerifyClick = () => {
    if (emailVerifyStatus === EMAIL_VERIFY_STATUS.VERIFIED) {
      return;
    }
    verifyAuthCode(
      { email: email, authentication_code: authenticationCode },
      {
        onSuccess: () => setEmailVerifyStatus(EMAIL_VERIFY_STATUS.VERIFIED),
        onError: () => {
          console.log('error');
          setEmailVerifyStatus(EMAIL_VERIFY_STATUS.ERROR);
          setEmailError(
            `${signInputTranslation.verifyFailed[language]} (${try_cnt}/5)`,
          );
        },
      },
    );
  };

  // 이메일 인증코드 재전송 API 호출
  const handleResendClick = async () => {
    if (debouncedEmail === '') {
      return;
    }

    try {
      // 5회 이내 재발송 가능
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
            success(
              status === EMAIL_VERIFY_STATUS.RESENT
                ? toastTranslation.newVerifyCodeSent[language]
                : toastTranslation.verifyCodeSent[language],
            );
          },
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  // 이메일 입력 시, 인증번호 발송 초기화
  const handleEmailInput = (value: string) => {
    if (emailVerifyStatus === EMAIL_VERIFY_STATUS.VERIFIED) return;
    setEmail(value);
    setEmailVerifyStatus(EMAIL_VERIFY_STATUS.IDLE);
  };

  // 검증 결과 계산
  const isEmailValid = !!email && !emailError;
  const isVerified = emailVerifyStatus === EMAIL_VERIFY_STATUS.VERIFIED;
  const isValid = isEmailValid && isVerified;

  return {
    // 상태
    email,
    authenticationCode,
    emailError,
    emailVerifyStatus,
    isValid,
    isVerified,

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
