import InformationStep from '@/components/Information/InformationStep';
import StepIndicator from '@/components/Information/StepIndicator';
import {
  initialUserInfoRequestBody,
  UserInfoRequestBody,
} from '@/types/api/users';
import { useState } from 'react';

// funnel 패턴으로 구현한 추가정보 입력 페이지. 총 3 step으로 구성
const InformationPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userInfo, setUserInfo] = useState<UserInfoRequestBody>(
    initialUserInfoRequestBody,
  );

  // 다음 step으로 넘어갈 때 호출되며, 각 step에서 입력한 정보를 userInfo에 저장, 다음 step으로 이동한다.
  const handleNext = (newInfo: UserInfoRequestBody) => {
    setUserInfo(newInfo);
    setCurrentStep((prev) => prev + 1);
  };
  return (
    <div className="m-auto max-w-[500px] relative h-screen flex flex-col items-center justify-start border border-black overflow-y-scroll scrollbar-hide">
      <div className="w-full flex flex-row py-6 items-center justify-between">
        <div
          className="relative w-full flex items-center justify-center text-[1.75rem] tracking-[-0.01em] leading-9 font-semibold font-[Pretendard] text-[#1e1926] text-left"
          onClick={() => setCurrentStep(currentStep + 1)}
        >
          Information
        </div>
        <StepIndicator currentStep={currentStep} />
      </div>
      <div className="w-full flex justify-center px-6">
        {currentStep === 1 && (
          <InformationStep userInfo={userInfo} onNext={handleNext} />
        )}
      </div>
    </div>
  );
};

export default InformationPage;
