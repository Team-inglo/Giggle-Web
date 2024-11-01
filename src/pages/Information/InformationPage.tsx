import BottomSheetLayout from '@/components/Common/BottomSheetLayout';
import CompleteModal from '@/components/Common/CompleteModal';
import AgreeModalInner from '@/components/Employer/Signup/AgreeModalInner';
import AddressStep from '@/components/Information/AddressStep';
import InformationStep from '@/components/Information/InformationStep';
import LanguageStep from '@/components/Information/LanguageStep';
import StepIndicator from '@/components/Information/StepIndicator';
import { useSignIn, useSignUp } from '@/hooks/api/useAuth';
//import { useSignUp } from '@/hooks/api/useAuth';
import {
  initialUserInfoRequestBody,
  Language,
  UserInfoRequestBody,
} from '@/types/api/users';
import { getTemporaryToken } from '@/utils/auth';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// funnel 패턴으로 구현한 추가정보 입력 페이지. 총 3 step으로 구성
const InformationPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userInfo, setUserInfo] = useState<UserInfoRequestBody>(
    initialUserInfoRequestBody,
  );
  const { mutate } = useSignUp();
  const { mutate: signin } = useSignIn();
  const location = useLocation();
  const { id, pw } = location.state;
  const [isAgreeModal, setIsAgreeModal] = useState(true);
  const [devIsModal, setDevIsModal] = useState(false);
  const [marketingAllowed, setMarketAllowed] = useState(false);
  const navigate = useNavigate();

  // 다음 step으로 넘어갈 때 호출되며, 각 step에서 입력한 정보를 userInfo에 저장, 다음 step으로 이동한다.
  const handleNext = (newInfo: UserInfoRequestBody) => {
    setUserInfo(newInfo);
    setCurrentStep((prev) => prev + 1);
  };
  // 최종 완료 시 호출, 서버 api 호출 및 완료 modal 표시
  const handleSubmit = (language: Language) => {
    const formData = new FormData();
    formData.append('serial_id', id);
    formData.append('password', pw);
    mutate({
      ...userInfo,
      marketing_allowed: marketingAllowed,
      notification_allowed: false,
      temporary_token: String(getTemporaryToken()),
      language: language,
    });
    signin(formData);
    setDevIsModal(true);
  };
  return (
    <div className="m-auto max-w-[500px] relative h-screen flex flex-col items-center justify-start border border-black overflow-y-scroll scrollbar-hide">
      {devIsModal ? (
        <CompleteModal
          title="Registration has been successfully completed"
          content="From now on, you can upload your resume and receive personalized job recommendations"
          onNext={() => navigate('/')}
        />
      ) : (
        <>
          <div className="w-full flex flex-row py-6 items-center justify-between">
            <div
              className="relative w-full flex items-center justify-center title-1 text-[#1e1926] text-left"
              onClick={() => setCurrentStep(currentStep + 1)}
            >
              Information
            </div>
            <StepIndicator length={3} currentStep={currentStep} />
          </div>
          <div className="w-full flex justify-center px-6">
            {currentStep === 1 && (
              <InformationStep userInfo={userInfo} onNext={handleNext} />
            )}
            {currentStep === 2 && (
              <AddressStep userInfo={userInfo} onNext={handleNext} />
            )}
            {currentStep === 3 && <LanguageStep onNext={handleSubmit} />}
          </div>
        </>
      )}
      {isAgreeModal && (
        <BottomSheetLayout
          hasHandlebar={true}
          isAvailableHidden={false}
          isShowBottomsheet={isAgreeModal}
        >
          <AgreeModalInner
            setMarketingAllowed={(value: boolean) => setMarketAllowed(value)}
            onNext={setIsAgreeModal}
          />
        </BottomSheetLayout>
      )}
    </div>
  );
};

export default InformationPage;
