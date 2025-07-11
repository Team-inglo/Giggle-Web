import { signInputTranslation } from '@/constants/translation';
import Input from '@/components/Common/Input';
import InputLayout from '@/components/WorkExperience/InputLayout';
import { InputType } from '@/types/common/input';
import { useEffect } from 'react';
import HelperLabel, { Language } from '@/components/Common/HelperLabel';
import Button from '@/components/Common/Button';
import InfoBanner from '@/components/Common/InfoBanner';
import { InfoBannerState } from '@/types/common/infoBanner';
import {
  useEmailVerification,
  EmailVerificationResult,
  EMAIL_VERIFY_STATUS,
} from '@/hooks/useEmailVerification';

enum EmailVerifyContext {
  SIGNUP = 'signup',
  RESET_PASSWORD = 'reset-password',
}

type EmailVerifierProps = {
  language: Language;
  context?: EmailVerifyContext;
  initialEmail?: string;
  onValidationChange: (result: EmailVerificationResult) => void;
};

const EmailVerifier = ({
  language,
  context = EmailVerifyContext.SIGNUP,
  initialEmail = '',
  onValidationChange,
}: EmailVerifierProps) => {
  const emailVerification = useEmailVerification({
    language,
    context,
    initialEmail,
  });

  // 상위 컴포넌트에 검증 결과 전달
  useEffect(() => {
    onValidationChange(emailVerification.getVerificationResult());
  }, [
    emailVerification.email,
    emailVerification.authenticationCode,
    emailVerification.emailError,
    emailVerification.emailVerifyStatus,
    onValidationChange,
  ]);

  return (
    <InputLayout title={signInputTranslation.email[language]}>
      <div className="flex gap-2 items-center">
        <Input
          inputType={InputType.TEXT}
          placeholder={signInputTranslation.enterEmail[language]}
          value={emailVerification.email}
          onChange={emailVerification.handleEmailInput}
          canDelete={false}
        />
        <Button
          type={
            emailVerification.emailVerifyStatus === EMAIL_VERIFY_STATUS.IDLE
              ? Button.Type.PRIMARY
              : Button.Type.DISABLED
          }
          size={Button.Size.LG}
          title={
            emailVerification.emailVerifyStatus === EMAIL_VERIFY_STATUS.IDLE
              ? signInputTranslation.sendEmail[language]
              : signInputTranslation.emailSentBtnText[language]
          }
          onClick={emailVerification.handleResendClick}
        />
      </div>
      {/* 인증번호 전송 후 인증번호 입력 input 출현 */}
      {emailVerification.emailVerifyStatus !== EMAIL_VERIFY_STATUS.IDLE && (
        <div className="flex gap-2 h-full pt-3">
          <div className="relative w-full">
            <Input
              inputType={InputType.TEXT}
              placeholder={signInputTranslation.verification[language]}
              value={emailVerification.authenticationCode}
              onChange={emailVerification.setAuthenticationCode}
              canDelete={false}
            />
            {emailVerification.emailVerifyStatus !==
              EMAIL_VERIFY_STATUS.VERIFIED && (
              <button
                className="caption-12-regular text-status-blue-300 underline absolute right-[1rem] top-[1rem]"
                onClick={emailVerification.handleResendClick}
              >
                {signInputTranslation.resend[language]}
              </button>
            )}
          </div>
          <Button
            type={
              emailVerification.emailVerifyStatus ===
              EMAIL_VERIFY_STATUS.VERIFIED
                ? Button.Type.DISABLED
                : Button.Type.PRIMARY
            }
            size={Button.Size.LG}
            title={signInputTranslation.resetPasswordVerifySuccess[language]}
            onClick={emailVerification.handleVerifyClick}
          />
        </div>
      )}
      <HelperLabel
        language={language}
        emailError={emailVerification.emailError}
        emailVerifyStatus={emailVerification.emailVerifyStatus}
      />
      {emailVerification.emailVerifyStatus !== EMAIL_VERIFY_STATUS.IDLE && (
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

EmailVerifier.Context = EmailVerifyContext;

export default EmailVerifier;
