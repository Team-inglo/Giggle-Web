import EmailVerifier from '@/components/Auth/EmailVerifier';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import { Language } from '@/components/Common/HelperLabel';
import PageTitle from '@/components/Common/PageTitle';
import VerificationSuccessful from '@/components/Signup/VerificationSuccessful';
import { usePostReissuePassword } from '@/hooks/api/useAuth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmailVerificationResult } from '@/hooks/useEmailVerification';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [emailVerificationResult, setEmailVerificationResult] =
    useState<EmailVerificationResult>({
      isValid: false,
      email: '',
      authenticationCode: '',
      isVerified: false,
    });

  // 임시 비밀번호 발급 및 메일전송 훅
  const { mutate: reIssuePassword } = usePostReissuePassword({
    onSuccess: () => setCurrentStep(2),
  });

  // 이메일 검증 결과 처리
  const handleEmailVerificationChange = async (result: EmailVerificationResult) => {
    setEmailVerificationResult(result);
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
                <EmailVerifier
                  language={Language.KO}
                  context={EmailVerifier.Context.RESET_PASSWORD}
                  onValidationChange={handleEmailVerificationChange}
                />
              </div>
              <BottomButtonPanel>
                <div className="w-full">
                  <Button
                    type={
                      emailVerificationResult.isValid
                        ? Button.Type.PRIMARY
                        : Button.Type.DISABLED
                    }
                    size={Button.Size.LG}
                    isFullWidth
                    title={'다음'}
                    onClick={
                      emailVerificationResult.isValid
                        ? handleReissuePassword
                        : undefined
                    }
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
