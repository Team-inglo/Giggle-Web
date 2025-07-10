import {
  signInputTranslation,
  toastTranslation,
} from '@/constants/translation';
import Input from '@/components/Common/Input';
import InputLayout from '@/components/WorkExperience/InputLayout';
import { InputType } from '@/types/common/input';
import { useEffect } from 'react';
import { useEmailTryCountStore } from '@/store/signup';
import {
  useGetEmailValidation,
  usePatchAuthentication,
  useReIssueAuthentication,
} from '@/hooks/api/useAuth';
import { useToast } from '@/hooks/useToast';
import { validateEmail } from '@/utils/signin';
import HelperLabel, { Language } from '@/components/Common/HelperLabel';
import Button from '@/components/Common/Button';
import InfoBanner from '@/components/Common/InfoBanner';
import { InfoBannerState } from '@/types/common/infoBanner';

type EmailVerifierProps = {
  email: string;
  setEmail: (email: string) => void;
  emailError: string | null;
  setEmailError: (emailError: string | null) => void;
  emailVerifyStatus: string | null;
  setEmailVerifyStatus: (emailVerifyStatus: string | null) => void;
  setIsValid: (isValid: boolean) => void;
  language: Language;
  authenticationCode: string;
  setAuthenticationCode: (authenticationCode: string) => void;
};

const EmailVerifier = ({
  email,
  setEmail,
  emailError,
  setEmailError,
  emailVerifyStatus,
  setEmailVerifyStatus,
  setIsValid,
  language,
  authenticationCode,
  setAuthenticationCode,
}: EmailVerifierProps) => {
  const { try_cnt } = useEmailTryCountStore();

  const { data: ValidationResponse } = useGetEmailValidation(email);
  const { success } = useToast();

  // 이메일 재발송 훅
  const { mutate: reIssueAuthentication } = useReIssueAuthentication();
  // 인증코드 검증 훅
  const { mutate: verifyAuthCode } = usePatchAuthentication();

  // ID 검사
  useEffect(() => {
    const validateEmailAsync = async () => {
      if (!email) return; // 이메일이 없을 경우 바로 반환

      setEmail(email);

      // 이메일 형식 유효성 검사
      if (!validateEmail(email, setEmailError, '/employer/signup')) {
        return;
      }
      // 2. 이메일 존재 여부 검사 결과 처리
      if (ValidationResponse) {
        if (ValidationResponse.data.is_valid === true) {
          setEmailError(signInputTranslation.emailWrong[language]);
          setIsValid(false);
        } else {
          setEmailError(null);
          setIsValid(true);
        }
      }
    };

    validateEmailAsync();
  }, [email, ValidationResponse, setEmail]);

  // API - 2.7 이메일 인증코드 검증
  const handleVerifyClick = () => {
    if (emailVerifyStatus === 'verified') {
      return;
    }
    verifyAuthCode(
      //TODO: id가 이메일 형태로 받게되면 id를 email로 변경
      { email: email, authentication_code: authenticationCode },
      {
        onSuccess: () => setEmailVerifyStatus('verified'),
        onError: () => {
          console.log('error');
          setEmailVerifyStatus('error');
          setEmailError(
            `${signInputTranslation.verifyFailed[language]} (${try_cnt}/5)`,
          );
        },
      },
    );
  };

  // 이메일 인증코드 재전송 API 호출
  const handleResendClick = async () => {
    if (email === '') {
      return;
    }

    try {
      // 5회 이내 재발송 가능
      reIssueAuthentication(
        { email: email },
        {
          onSuccess: () => {
            setAuthenticationCode('');
            const status = try_cnt > 1 ? 'resent' : 'sent';
            setEmailVerifyStatus(status);
            success(
              status === 'resent'
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
    if (emailVerifyStatus === 'verified') return;
    setEmail(value);
    setEmailVerifyStatus(null);
  };

  return (
    <InputLayout title={signInputTranslation.email[language]}>
      <div className="flex gap-2 items-center">
        <Input
          inputType={InputType.TEXT}
          placeholder={signInputTranslation.enterEmail[language]}
          value={email}
          onChange={handleEmailInput}
          canDelete={false}
        />
        <Button
          type={
            emailVerifyStatus === null
              ? Button.Type.PRIMARY
              : Button.Type.DISABLED
          }
          size={Button.Size.LG}
          title={
            emailVerifyStatus === null
              ? signInputTranslation.sendEmail[language]
              : signInputTranslation.emailSentBtnText[language]
          }
          onClick={handleResendClick}
        />
      </div>
      {/* 인증번호 전송 후 인증번호 입력 input 출현 */}
      {emailVerifyStatus !== null && (
        <div className="flex gap-2 h-full pt-3">
          <div className="relative w-full">
            <Input
              inputType={InputType.TEXT}
              placeholder={signInputTranslation.verification[language]}
              value={authenticationCode}
              onChange={setAuthenticationCode}
              canDelete={false}
            />
            {emailVerifyStatus !== 'verified' && (
              <button
                className="caption-12-regular text-status-blue-300 underline absolute right-[1rem] top-[1rem]"
                onClick={handleResendClick} // 이메일 인증코드 재전송 API 호출
              >
                {signInputTranslation.resend[language]}
              </button>
            )}
          </div>
          <Button
            type={
              emailVerifyStatus === 'verified' && authenticationCode !== ''
                ? Button.Type.DISABLED
                : Button.Type.PRIMARY
            }
            size={Button.Size.LG}
            title={signInputTranslation.resetPasswordVerifySuccess[language]}
            onClick={handleVerifyClick}
          />
        </div>
      )}
      <HelperLabel
        language={language}
        emailError={emailError}
        emailVerifyStatus={emailVerifyStatus}
      />
      {emailVerifyStatus !== null && (
        <div className="w-full mt-4">
          <InfoBanner
            text={`${signInputTranslation.spamEmailInfo['ko']} \n ${signInputTranslation.spamEmailInfo['en']}`}
            state={InfoBannerState.INFO}
          />
        </div>
      )}
    </InputLayout>
  );
};

export default EmailVerifier;
