import Input from '@/components/Common/Input';
import InputLayout from '@/components/WorkExperience/InputLayout';
import { EmployerRegistrationRequestBody } from '@/types/api/employ';
import { InputType } from '@/types/common/input';
import { useEffect, useState } from 'react';
import {
  formatCompanyRegistrationNumber,
  formatPhoneNumber,
} from '@/utils/information';
import PageTitle from '@/components/Common/PageTitle';
import {
  documentTranslation,
  signInputTranslation,
} from '@/constants/translation';
import { isEmployer } from '@/utils/signup';
import { useLocation } from 'react-router-dom';
import DaumPostcodeEmbed, { Address } from 'react-daum-postcode';
import { processAddressData } from '@/utils/map';
import PhoneNumberInput from '@/components/Common/PhoneNumberInput';
import Button from '@/components/Common/Button';
import CompanyLogoUploader from '@/components/Employer/Signup/CompanyLogoUploader';

type InformationInputSectionProps = {
  newEmployData: EmployerRegistrationRequestBody;
  setNewEmployData: (newData: EmployerRegistrationRequestBody) => void;
  setLogoFile: (file: File | undefined) => void;
  registrationNumberValidStatus: string | null;
  setRegistrationNumberValidStatus: (status: string | null) => void;
  validateRegistrationNumber: (registrationNumber: string) => void;
};

const InformationInputSection = ({
  newEmployData,
  setNewEmployData,
  setLogoFile,
  registrationNumberValidStatus,
  setRegistrationNumberValidStatus,
  validateRegistrationNumber,
}: InformationInputSectionProps) => {
  const { pathname } = useLocation();
  const [isAddressSearch, setIsAddressSearch] = useState<boolean>(false);
  // 두 부분으로 나누어 입력받는 방식을 위해 전화번호만 별도의 state로 분리, 추후 유효성 검사 단에서 통합
  const [phoneNum, setPhoneNum] = useState({
    start: '010',
    rest: '',
  });

  // 검색된 주소 선택 시 state에 반영
  const handleAddressSelection = async (data: Address) => {
    const newAddress = await processAddressData(data);

    setNewEmployData({
      ...newEmployData,
      address: {
        ...newEmployData.address,
        ...newAddress,
      },
    });
    setIsAddressSearch(false);
  };

  useEffect(() => {
    setNewEmployData({
      ...newEmployData,
      owner_info: {
        ...newEmployData.owner_info,
        phone_number: formatPhoneNumber(phoneNum),
      },
    });
  }, [phoneNum]);

  const handleRegistrationNumberChange = (value: string) => {
    setRegistrationNumberValidStatus(null);
    setNewEmployData({
      ...newEmployData,
      owner_info: {
        ...newEmployData.owner_info,
        company_registration_number: formatCompanyRegistrationNumber(value),
      },
    });
  };
  return (
    <>
      <div className="w-full flex flex-col items-center justify-between ">
        {isAddressSearch ? (
          <DaumPostcodeEmbed
            style={{
              position: 'fixed',
              top: '50px',
              width: '100%',
              height: 'calc(100vh - 100px)',
              marginTop: '3.125rem',
              paddingBottom: '6.25rem',
            }}
            theme={{ pageBgColor: '#ffffff', bgColor: '#ffffff' }}
            onComplete={handleAddressSelection}
            onClose={() => setIsAddressSearch(false)}
          />
        ) : (
          <>
            <PageTitle
              title={signInputTranslation.infoStepTitle[isEmployer(pathname)]}
              content={
                signInputTranslation.infoStepContent[isEmployer(pathname)]
              }
            />

            <div className="flex flex-col px-4 gap-6 [&>*:last-child]:mb-40">
              {/* 이름 입력 */}
              <InputLayout title="회사/점포명">
                <Input
                  inputType={InputType.TEXT}
                  placeholder="회사/점포명을 입력해주세요"
                  value={newEmployData.owner_info.company_name}
                  onChange={(value) =>
                    setNewEmployData({
                      ...newEmployData,
                      owner_info: {
                        ...newEmployData.owner_info,
                        company_name: value,
                      },
                    })
                  }
                  canDelete={false}
                />
              </InputLayout>
              {/* 대표자명 입력 */}
              <InputLayout title="대표자명">
                <Input
                  inputType={InputType.TEXT}
                  placeholder="대표자명을 입력해주세요"
                  value={newEmployData.owner_info.owner_name}
                  onChange={(value) =>
                    setNewEmployData({
                      ...newEmployData,
                      owner_info: {
                        ...newEmployData.owner_info,
                        owner_name: value,
                      },
                    })
                  }
                  canDelete={false}
                />
              </InputLayout>
              {/* 개인 휴대폰 번호 입력 */}
              <InputLayout title="대표자 전화번호">
                <PhoneNumberInput value={phoneNum} onChange={setPhoneNum} />
              </InputLayout>
              {/* 주소 입력 */}
              <div className="w-full h-full flex flex-col gap-[1.125rem]">
                {/* 주소 검색 입력 input */}
                <InputLayout title="회사/점포주소">
                  <div onClick={() => setIsAddressSearch(true)}>
                    <Input
                      inputType={InputType.SEARCH}
                      placeholder="주소 검색"
                      value={newEmployData.address.address_name}
                      onChange={() => {}}
                      canDelete={false}
                    />
                  </div>
                </InputLayout>
                <InputLayout title="상세 주소">
                  <Input
                    inputType={InputType.TEXT}
                    placeholder="예) 101동 101호"
                    value={newEmployData.address.address_detail}
                    onChange={(value) =>
                      setNewEmployData({
                        ...newEmployData,
                        address: {
                          ...newEmployData.address,
                          address_detail: value,
                        },
                      })
                    }
                    canDelete={false}
                  />
                  {newEmployData.address.address_detail &&
                    newEmployData.address.address_detail.length > 50 && (
                      <p className="text-text-error caption-12-semibold px-1 py-2">
                        {documentTranslation.detailAddressTooLong.ko}
                      </p>
                    )}
                </InputLayout>
              </div>
              {/* 사업자 등록번호 입력 */}
              <InputLayout title="사업자 등록번호">
                <div className="flex gap-2">
                  <div className="relative w-full">
                    <Input
                      inputType={InputType.TEXT}
                      placeholder="X X X / X X / X X X X X"
                      value={
                        newEmployData.owner_info.company_registration_number
                      }
                      onChange={(value) =>
                        handleRegistrationNumberChange(value)
                      }
                      canDelete={false}
                    />
                  </div>
                  <Button
                    type={
                      registrationNumberValidStatus === 'verified'
                        ? Button.Type.DISABLED
                        : Button.Type.PRIMARY
                    }
                    size={Button.Size.LG}
                    title="인증"
                    onClick={
                      registrationNumberValidStatus === 'verified'
                        ? undefined
                        : () =>
                            validateRegistrationNumber(
                              newEmployData.owner_info
                                .company_registration_number,
                            )
                    }
                  />
                </div>
                {registrationNumberValidStatus === 'verified' && (
                  <p className="text-status-blue-300 caption-12-semibold px-1 py-2">
                    사업자 인증이 완료되었습니다.
                  </p>
                )}
                {registrationNumberValidStatus === 'error' && (
                  <p className="text-status-red-300 caption-12-semibold px-1 py-2">
                    존재하지 않는 사업자 등록번호입니다.
                  </p>
                )}
              </InputLayout>

              {/* 회사 로고 입력 */}
              <CompanyLogoUploader onLogoFileChange={setLogoFile} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default InformationInputSection;
