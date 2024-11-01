import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import BottomSheetLayout from '@/components/Common/BottomSheetLayout';
import Button from '@/components/Common/Button';
import CompleteModal from '@/components/Common/CompleteModal';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import AgreeModalInner from '@/components/Employer/Signup/AgreeModalInner';
import InformationInputSection from '@/components/Employer/Signup/InformationInputSection';
import { useSignIn, useSignupEmployer } from '@/hooks/api/useAuth';
import {
  EmployerRegistrationRequestBody,
  initialEmployerRegistration,
} from '@/types/api/employ';
import { isValidEmployerRegistration } from '@/utils/signup';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EmployerSignupInfoPage = () => {
  const [newEmployData, setNewEmployData] =
    useState<EmployerRegistrationRequestBody>(initialEmployerRegistration);
  const [logoFile, setLogoFile] = useState<File | undefined>(undefined);
  const [devIsModal, setDevIsModal] = useState(false);
  const [isAgreeModal, setIsAgreeModal] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const { mutate } = useSignupEmployer(() => setDevIsModal(true));
  const { mutate: signin } = useSignIn();
  const location = useLocation();
  const { id, pw } = location.state;
  const navigate = useNavigate();

  useEffect(() => {
    setIsValid(isValidEmployerRegistration(newEmployData));
  }, [newEmployData]);

  // 최종 완료 시 호출, 서버 api 호출 및 완료 modal 표시
  const handleSubmit = () => {
    if (isValidEmployerRegistration(newEmployData)) {
      const formData = new FormData();
      formData.append('serial_id', id);
      formData.append('password', pw);
      signin(formData);
      mutate({
        image: logoFile,
        body: {
          ...newEmployData,
        },
      });
    }
  };
  return (
    <div className="last:pb-[10rem]">
      <BaseHeader
        hasBackButton={true}
        hasMenuButton={false}
        onClickBackButton={() => navigate('/signup')}
      />
      {devIsModal ? (
        <CompleteModal
          title="가입이 성공적으로 완료되었습니다"
          onNext={() => navigate('/')}
        />
      ) : (
        <InformationInputSection
          newEmployData={newEmployData}
          setNewEmployData={setNewEmployData}
          setLogoFile={(file: File | undefined) => setLogoFile(file)}
        />
      )}
      <BottomButtonPanel>
        {isValid ? (
          <Button
            type="large"
            isBorder={false}
            bgColor="bg-[#FEF387]"
            fontColor="text-[#1E1926]"
            title="완료"
            onClick={() => {
              handleSubmit();
            }}
          />
        ) : (
          <Button
            type="large"
            isBorder={false}
            bgColor="bg-[#F4F4F9]"
            fontColor="text-[#1E1926]"
            title="완료"
          />
        )}
      </BottomButtonPanel>
      {isAgreeModal && (
        <BottomSheetLayout
          hasHandlebar={true}
          isAvailableHidden={false}
          isShowBottomsheet={isAgreeModal}
        >
          <AgreeModalInner
            setMarketingAllowed={(value: boolean) =>
              setNewEmployData({
                ...newEmployData,
                marketing_allowed: value,
              })
            }
            onNext={setIsAgreeModal}
          />
        </BottomSheetLayout>
      )}
    </div>
  );
};
export default EmployerSignupInfoPage;
