import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import HelperLabel, { Language } from '@/components/Common/HelperLabel';
import InfoBanner from '@/components/Common/InfoBanner';
import Input from '@/components/Common/Input';
import PageTitle from '@/components/Common/PageTitle';
import VerificationSuccessful from '@/components/Signup/VerificationSuccessful';
import InputLayout from '@/components/WorkExperience/InputLayout';
import {
  signInputTranslation,
  toastTranslation,
} from '@/constants/translation';
import {
  useGetEmailValidation,
  usePatchAuthentication,
  usePostReissuePassword,
  useReIssueAuthentication,
} from '@/hooks/api/useAuth';
import { useToast } from '@/hooks/useToast';
import { useEmailTryCountStore } from '@/store/signup';
import { InfoBannerState } from '@/types/common/infoBanner';
import { InputType } from '@/types/common/input';
import { validateEmail } from '@/utils/signin';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [email, setEmail] = useState<string>('');
  const [emailVerifyStatus, setEmailVerifyStatus] = useState<string | null>(
    null,
  );
  const [emailError, setEmailError] = useState<string | null>(null);
  const [authenticationCode, setAuthenticationCode] = useState<string>('');
  const { try_cnt } = useEmailTryCountStore();
  const [isValid, setIsValid] = useState(false);

  const { data: ValidationResponse } = useGetEmailValidation(email);
  const { success } = useToast();

  // 이메일 재발송 훅
  const { mutate: reIssueAuthentication } = useReIssueAuthentication();
  // 인증코드 검증 훅
  const { mutate: verifyAuthCode } = usePatchAuthentication();
  // 임시 비밀번호 발급 및 메일전송 훅
  const { mutate: reIssuePassword } = usePostReissuePassword({
    onSuccess: () => setCurrentStep(2),
  });

  // 이메일 입력 시, 인증번호 발송 초기화
  const handleEmailInput = (value: string) => {
    if (emailVerifyStatus === 'verified') return;
    setEmail(value);
    setEmailVerifyStatus(null);
  };

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
          setEmailError(signInputTranslation.emailWrong['ko']);
          setIsValid(false);
        } else {
          setEmailError(null);
          setIsValid(true);
        }
      }
    };

    validateEmailAsync();
  }, [email, ValidationResponse, setEmail]);

  // 모든 필드의 유효성 검사 후, Continue 버튼 활성화
  useEffect(() => {
    const isEmailValid = validateEmail(
      email,
      setEmailError,
      '/employer/signup',
    );
    const isVerified = emailVerifyStatus === 'verified';

    setIsValid(isEmailValid && isVerified);
  }, [email, emailVerifyStatus]);

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
          setEmailVerifyStatus('error');
          setEmailError(
            `${signInputTranslation.verifyFailed['ko']} (${try_cnt}/5)`,
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
                ? toastTranslation.newVerifyCodeSent['ko']
                : toastTranslation.verifyCodeSent['ko'],
            );
          },
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  // API - 2.10 임시 비밀번호 발급 및 메일 전송
  const handleReissuePassword = () => {
    reIssuePassword();
  };

  return (
    <div className="w-full">
      <BaseHeader
        hasBackButton={true}
        hasMenuButton={false}
        title="비밀번호 찾기"
        onClickBackButton={() => navigate('/signin')}
      />
      <div className="w-full h-full flex-grow flex flex-col">
        {currentStep === 1 && (
          <>
            <PageTitle title={'찾으려는 계정의\n이메일을 입력해주세요'} />
            <div className="flex flex-col gap-2 px-4">
              <div className="flex flex-col mb-[7.125rem]">
                <InputLayout title={signInputTranslation.email['ko']}>
                  <div className="flex gap-2 items-center">
                    <Input
                      inputType={InputType.TEXT}
                      placeholder={signInputTranslation.enterEmail['ko']}
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
                          ? signInputTranslation.sendEmail['ko']
                          : signInputTranslation.emailSentBtnText['ko']
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
                          placeholder={signInputTranslation.verification['ko']}
                          value={authenticationCode}
                          onChange={setAuthenticationCode}
                          canDelete={false}
                        />
                        {emailVerifyStatus !== 'verified' && (
                          <button
                            className="caption-12-regular text-status-blue-300 underline absolute right-[1rem] top-[1rem]"
                            onClick={handleResendClick} // 이메일 인증코드 재전송 API 호출
                          >
                            {signInputTranslation.resend['ko']}
                          </button>
                        )}
                      </div>
                      <Button
                        type={
                          emailVerifyStatus === 'verified' &&
                          authenticationCode !== ''
                            ? Button.Type.DISABLED
                            : Button.Type.PRIMARY
                        }
                        size={Button.Size.LG}
                        title={
                          signInputTranslation.resetPasswordVerifySuccess['ko']
                        }
                        onClick={handleVerifyClick}
                      />
                    </div>
                  )}
                  <HelperLabel
                    language={Language.KO}
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
              </div>
              <BottomButtonPanel>
                <div className="w-full">
                  <Button
                    type={isValid ? Button.Type.PRIMARY : Button.Type.DISABLED}
                    size={Button.Size.LG}
                    isFullWidth
                    title={'다음'}
                    onClick={isValid ? handleReissuePassword : undefined}
                  />
                </div>
              </BottomButtonPanel>
            </div>
          </>
        )}
      </div>

      {currentStep === 2 && (
        <div className="w-full h-[calc(100vh-174px)] flex justify-center items-center">
          <VerificationSuccessful
            title={'임시 비밀번호 발급이\n완료되었어요!'}
            content={
              '로그인 후 마이페이지 - 비밀번호 재설정에서\n비밀번호 변경이 가능해요.\n\n이메일에서 임시 비밀번호를 확인해주세요 !'
            }
            buttonText={'로그인'}
            onNext={() => navigate('/signin')}
          />
        </div>
      )}
    </div>
  );
};

export default ResetPasswordPage;
