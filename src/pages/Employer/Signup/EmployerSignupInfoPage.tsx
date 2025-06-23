import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import BottomSheetLayout from '@/components/Common/BottomSheetLayout';
import Button from '@/components/Common/Button';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import AgreeModalInner from '@/components/Employer/Signup/AgreeModalInner';
import InformationInputSection from '@/components/Employer/Signup/InformationInputSection';
import PolicyViewer from '@/components/Information/PolicyViewer';
import VerificationSuccessful from '@/components/Signup/VerificationSuccessful';
import { signInputTranclation } from '@/constants/translation';
import {
  useGetPolicy,
  usePostRegistrationNumberValidation,
  useSignupEmployer,
} from '@/hooks/api/useAuth';
import {
  EmployerRegistrationRequestBody,
  initialEmployerRegistration,
} from '@/types/api/employ';
import { TermType } from '@/types/api/users';
import { getTemporaryToken } from '@/utils/auth';
import { isEmployer, isValidEmployerRegistration } from '@/utils/signup';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EmployerSignupInfoPage = () => {
  const { pathname } = useLocation();
  const [newEmployData, setNewEmployData] =
    useState<EmployerRegistrationRequestBody>(initialEmployerRegistration);
  const [logoFile, setLogoFile] = useState<File | undefined>(undefined);
  const [devIsModal, setDevIsModal] = useState(false);
  const [isAgreeModal, setIsAgreeModal] = useState(true);
  const [isPolicyPreview, setIsPolicyPreview] = useState(false);
  const [policy, setPolicy] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [registrationNumberValidStatus, setRegistrationNumberValidStatus] =
    useState<string | null>(null);
  const { mutate: getPolicy } = useGetPolicy({
    onSuccess: (data) => {
      setPolicy(data.data.content);
      setIsPolicyPreview(true);
    },
  });
  const { mutate } = useSignupEmployer(() => setDevIsModal(true));
  const { mutate: validateRegistrationNumber } =
    usePostRegistrationNumberValidation({
      onSuccess: (data) => {
        if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
          // tax_type이 존재하고 에러 메시지가 아닌지 확인
          if (
            data.data[0].tax_type &&
            data.data[0].tax_type !==
              '국세청에 등록되지 않은 사업자등록번호입니다.'
          ) {
            setRegistrationNumberValidStatus('verified');
          }
          // 에러 메시지인 경우
          else {
            setRegistrationNumberValidStatus('error');
          }
        }
      },
    });
  const navigate = useNavigate();

  useEffect(() => {
    setIsValid(
      isValidEmployerRegistration(newEmployData) &&
        registrationNumberValidStatus === 'verified' &&
        logoFile !== undefined,
    );
  }, [newEmployData, registrationNumberValidStatus, logoFile]);

  // 최종 완료 시 호출, 서버 api 호출 및 완료 modal 표시
  const handleSubmit = () => {
    if (isValidEmployerRegistration(newEmployData)) {
      const formData = new FormData();

      // temporary_token을 포함한 요청 데이터 생성
      const requestData = {
        ...newEmployData,
        temporary_token: String(getTemporaryToken()), // temporary_token 추가
        term_types: [
          TermType.ENTERPRISE_SERVICE_TERMS,
          TermType.LOCATION_BASED_TERMS,
          TermType.PRIVACY_POLICY,
        ],
      };

      // 이미지 파일이 있는 경우에만 추가
      if (logoFile) {
        formData.append('image', logoFile);
      }

      // JSON 데이터를 Blob으로 변환하여 추가
      formData.append(
        'body',
        new Blob([JSON.stringify(requestData)], {
          type: 'application/json',
        }),
      );

      // mutate 호출
      mutate(formData);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
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
        <div className="w-full m-auto max-w-[500px] relative h-screen flex flex-col items-center justify-start overflow-y-scroll scrollbar-hide">
          <BaseHeader
            title="추가정보"
            hasBackButton={true}
            hasMenuButton={false}
            onClickBackButton={() => navigate('/signup')}
          />
          <div className="flex justify-center items-center sticky top-[3.75rem]">
            <div className={`h-1 w-full bg-[#fef387]`} />
          </div>
          <InformationInputSection
            newEmployData={newEmployData}
            setNewEmployData={setNewEmployData}
            setLogoFile={(file: File | undefined) => setLogoFile(file)}
            registrationNumberValidStatus={registrationNumberValidStatus}
            setRegistrationNumberValidStatus={(status: string | null) =>
              setRegistrationNumberValidStatus(status)
            }
            validateRegistrationNumber={(value: string) =>
              validateRegistrationNumber(value.replace(/\D/g, '').slice(0, 10))
            }
          />
          <BottomButtonPanel>
            {isValid ? (
              <Button
                type="large"
                bgColor="bg-surface-primary"
                fontColor="text-text-normal"
                title="완료"
                onClick={() => {
                  handleSubmit();
                }}
              />
            ) : (
              <Button
                type="large"
                bgColor="bg-surface-secondary"
                fontColor="text-text-disabled"
                title="완료"
              />
            )}
          </BottomButtonPanel>
        </div>
      )}

      {isAgreeModal && (
        <BottomSheetLayout
          isAvailableHidden={false}
          isShowBottomsheet={isAgreeModal}
        >
          <AgreeModalInner
            onPolicyPreview={(policy: TermType) => {
              getPolicy(policy);
            }}
            onNext={setIsAgreeModal}
            accountType="EMPLOYER"
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
export default EmployerSignupInfoPage;
