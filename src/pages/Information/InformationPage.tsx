import BottomSheetLayout from '@/components/Common/BottomSheetLayout';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import AgreeModalInner from '@/components/Employer/Signup/AgreeModalInner';
import AddressStep from '@/components/Information/AddressStep';
import InformationStep from '@/components/Information/InformationStep';
import LanguageStep from '@/components/Information/LanguageStep';
import PolicyViewer from '@/components/Information/PolicyViewer';
import VerificationSuccessful from '@/components/Signup/VerificationSuccessful';
import { signInputTranclation } from '@/constants/translation';
import { useGetPolicy, useSignUp } from '@/hooks/api/useAuth';
import {
  initialUserInfoRequestBody,
  Language,
  TermType,
  UserInfoRequestBody,
} from '@/types/api/users';
import { getTemporaryToken } from '@/utils/auth';
import { isEmployer } from '@/utils/signup';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// funnel 패턴으로 구현한 추가정보 입력 페이지. 총 3 step으로 구성
const InformationPage = () => {
  const { pathname } = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [userInfo, setUserInfo] = useState<UserInfoRequestBody>(
    initialUserInfoRequestBody,
  );
  const [isAgreeModal, setIsAgreeModal] = useState(true);
  const [isPolicyPreview, setIsPolicyPreview] = useState(false);
  const [policy, setPolicy] = useState('');
  const [devIsModal, setDevIsModal] = useState(false);
  const marketingAllowed = false;
  const { mutate } = useSignUp(() => setDevIsModal(true));
  const { mutate: getPolicy } = useGetPolicy({
    onSuccess: (data) => {
      setPolicy(data.data.content);
      setIsPolicyPreview(true);
    },
  });
  const navigate = useNavigate();

  // 다음 step으로 넘어갈 때 호출되며, 각 step에서 입력한 정보를 userInfo에 저장, 다음 step으로 이동한다.
  const handleNext = (newInfo: UserInfoRequestBody) => {
    setUserInfo(newInfo);
    setCurrentStep((prev) => prev + 1);
  };
  // 최종 완료 시 호출, 서버 api 호출 및 완료 modal 표시
  const handleSubmit = (language: Language) => {
    const termTypes = [
      TermType.PERSONAL_SERVICE_TERMS,
      TermType.LOCATION_BASED_TERMS,
      TermType.PRIVACY_POLICY,
    ];

    mutate({
      ...userInfo,
      address: userInfo.address.address_name ? userInfo.address : null,
      marketing_allowed: marketingAllowed,
      notification_allowed: true,
      temporary_token: String(getTemporaryToken()),
      language: language,
      term_types: termTypes,
    });
  };
  return (
    <div className="m-auto max-w-[500px] relative h-screen flex flex-col items-center justify-start overflow-y-scroll scrollbar-hide">
      {devIsModal ? (
        <VerificationSuccessful
          title={signInputTranclation.signupComplete[isEmployer(pathname)]}
          content={
            signInputTranclation.signupCompleteContent[isEmployer(pathname)]
          }
          buttonText={
            signInputTranclation.signupCompleteBtn[isEmployer(pathname)]
          }
          onNext={() => navigate('/splash')}
        />
      ) : (
        <>
          <BaseHeader
            hasBackButton={true}
            hasMenuButton={false}
            title="Information"
            onClickBackButton={() =>
              currentStep === 1
                ? navigate('/signup')
                : setCurrentStep((prev) => prev - 1)
            }
          />
          <div className="w-screen flex justify-center items-center sticky top-[3.75rem]">
            <hr
              className={`w-[33%] h-1 border-0 ${
                currentStep >= 1 ? 'bg-[#FEF387]' : 'bg-[#F4F4F9]'
              }`}
            />
            <hr
              className={`w-[33%] h-1 border-0 ${
                currentStep >= 2 ? 'bg-[#FEF387]' : 'bg-[#F4F4F9]'
              }`}
            />
            <hr
              className={`w-[34%] h-1 border-0 ${
                currentStep >= 3 ? 'bg-[#FEF387]' : 'bg-[#F4F4F9]'
              }`}
            />
          </div>
          <div className="w-full flex justify-center px-4 pt-4">
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
            onPolicyPreview={(policy: TermType) => {
              getPolicy(policy);
            }}
            onNext={setIsAgreeModal}
            accountType="USER"
          />
        </BottomSheetLayout>
      )}
      {isPolicyPreview === true && (
        <PolicyViewer
          content={policy}
          onBack={() => setIsPolicyPreview(false)}
        />
      )}
    </div>
  );
};

export default InformationPage;
