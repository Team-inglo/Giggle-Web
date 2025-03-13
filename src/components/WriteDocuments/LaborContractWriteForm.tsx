import { initialLaborContractEmployeeInfo } from '@/constants/documents';
import {
  DocumentType,
  LaborContractDataResponse,
  LaborContractEmployeeInfo,
} from '@/types/api/document';
import { formatPhoneNumber, parsePhoneNumber } from '@/utils/information';
import { useEffect, useState } from 'react';
import Input from '@/components/Common/Input';
import { InputType } from '@/types/common/input';
import Dropdown from '@/components/Common/Dropdown';
import { phone } from '@/constants/information';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { isNotEmpty } from '@/utils/document';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';
import SignaturePad from '@/components/Document/write/SignaturePad';
import EmployerInfoSection from '@/components/Document/write/EmployerInfoSection';
import {
  usePostStandardLaborContracts,
  usePutStandardLaborContracts,
} from '@/hooks/api/useDocument';
import { useCurrentPostIdEmployeeStore } from '@/store/url';
import LoadingItem from '../Common/LoadingItem';
import DaumPostcodeEmbed, { Address } from 'react-daum-postcode';
import { convertToAddress, getAddressCoords } from '@/utils/map';
import InputLayout from '../WorkExperience/InputLayout';

type LaborContractFormProps = {
  document?: LaborContractDataResponse;
  isEdit: boolean;
};

const LaborContractWriteForm = ({
  document,
  isEdit,
}: LaborContractFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAddressSearch, setIsAddressSearch] = useState<boolean>(false);
  const [newDocumentData, setNewDocumentData] =
    useState<LaborContractEmployeeInfo>(initialLaborContractEmployeeInfo);
  const { currentPostId } = useCurrentPostIdEmployeeStore();
  // 세 부분으로 나누어 입력받는 방식을 위해 전화번호만 별도의 state로 분리, 추후 유효성 검사 단에서 통합
  const [phoneNum, setPhoneNum] = useState({
    start: '010',
    middle: '',
    end: '',
  });
  const { mutate: postDocument } = usePostStandardLaborContracts(
    Number(currentPostId),
    {
      onMutate: () => {
        setIsLoading(true);
      },
      onSettled: () => {
        setIsLoading(false);
      },
    },
  ); // 작성된 근로계약서 제출 훅
  const { mutate: updateDocument } = usePutStandardLaborContracts(
    Number(currentPostId),
    {
      onMutate: () => {
        setIsLoading(true);
      },
      onSettled: () => {
        setIsLoading(false);
      },
    },
  ); // 수정된 근로계약서 제출 훅
  // 문서 편집일 시 페이지 진입과 동시에 기존 내용 자동 입력
  useEffect(() => {
    if (isEdit && document) {
      setNewDocumentData({
        first_name: document.employee_information.first_name,
        last_name: document.employee_information.last_name,
        address: document.employee_information.address,
        phone_number: document.employee_information.phone_number,
        signature_base64: document.employee_information.signature_base64,
      });
      setPhoneNum({
        start: parsePhoneNumber(newDocumentData.phone_number).start,
        middle: parsePhoneNumber(newDocumentData.phone_number).middle,
        end: parsePhoneNumber(newDocumentData.phone_number).end,
      });
    }
  }, [document, isEdit]);

  // 검색된 주소 선택 시 state에 반영
  const handleAddressSelection = async (data: Address) => {
    const convertedAddress = convertToAddress(data);
    const coords = await getAddressCoords(
      convertedAddress.address_name as string,
    );
    const x = coords.getLng();
    const y = coords.getLat();

    setNewDocumentData({
      ...newDocumentData,
      address: {
        ...convertedAddress,
        longitude: y,
        latitude: x,
      },
    });
    setIsAddressSearch(false);
  };

  // 문서 작성 완료 핸들러 함수
  const handleNext = () => {
    const finalDocument = {
      ...newDocumentData,
      phone_number: formatPhoneNumber(phoneNum),
    };
    const payload = {
      id: Number(currentPostId),
      document: finalDocument, // TODO: 로그인 연결 후 userId를 넣어야 하는 것으로 추정
    };

    if (isEdit) {
      updateDocument(payload);
      return;
    }
    postDocument(payload);
  };
  return (
    <>
      {isLoading && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50 overflow-hidden"
          style={{ touchAction: 'none' }}
          onClick={(e) => e.preventDefault()}
        >
          <LoadingItem />
        </div>
      )}

      <div
        className={`w-full flex flex-col ${isLoading ? 'overflow-hidden pointer-events-none' : ''}`}
      >
        {isAddressSearch ? (
          <div className="w-full h-screen fixed inset-0 bg-white">
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
          </div>
        ) : (
          <div className="p-4 [&>*:last-child]:mb-40 flex flex-col gap-4">
            {/* 이름 입력 */}
            <InputLayout title="First Name" isEssential>
              <Input
                inputType={InputType.TEXT}
                placeholder="First Name"
                value={newDocumentData.first_name}
                onChange={(value) =>
                  setNewDocumentData({ ...newDocumentData, first_name: value })
                }
                canDelete={false}
              />
            </InputLayout>
            {/* 성 입력 */}
            <InputLayout title="Last Name" isEssential>
              <Input
                inputType={InputType.TEXT}
                placeholder="Last Name"
                value={newDocumentData.last_name}
                onChange={(value) =>
                  setNewDocumentData({ ...newDocumentData, last_name: value })
                }
                canDelete={false}
              />
            </InputLayout>

            <div className="w-full flex flex-col gap-[1.125rem]">
              {/* 주소 검색 입력 input */}
              <InputLayout title="Address in Korea" isEssential>
                <div onClick={() => setIsAddressSearch(true)}>
                  <Input
                    inputType={InputType.SEARCH}
                    placeholder="Search Your Address"
                    value={newDocumentData.address.address_name}
                    onChange={() => {}}
                    canDelete={false}
                  />
                </div>
              </InputLayout>
              {/* 검색한 위치를 보여주는 지도 */}
              {newDocumentData.address.address_detail !== '' && (
                <>
                  <div className="w-full rounded-xl">
                    <Map
                      center={{
                        lat: newDocumentData.address?.latitude ?? 0,
                        lng: newDocumentData.address?.longitude ?? 0,
                      }}
                      style={{ width: '100%', height: '200px' }}
                      className="rounded-xl"
                    >
                      <MapMarker
                        position={{
                          lat: newDocumentData.address?.latitude ?? 0,
                          lng: newDocumentData.address?.longitude ?? 0,
                        }}
                      ></MapMarker>
                    </Map>
                  </div>
                  <InputLayout title="Detailed Address" isEssential>
                    <Input
                      inputType={InputType.TEXT}
                      placeholder="ex) 101-dong"
                      value={newDocumentData.address.address_detail}
                      onChange={(value) =>
                        value &&
                        value.trim().length < 100 &&
                        setNewDocumentData({
                          ...newDocumentData,
                          address: {
                            ...newDocumentData.address,
                            address_detail: value,
                          },
                        })
                      }
                      canDelete={false}
                    />
                  </InputLayout>
                </>
              )}
            </div>
            {/* 전화번호 입력 */}
            <InputLayout title="Cell phone No." isEssential>
              <div className="w-full flex flex-row gap-2 justify-between mb-[0rem]">
                <div className="w-full h-[2.75rem]">
                  <Dropdown
                    value={phoneNum.start}
                    placeholder="010"
                    options={phone}
                    setValue={(value) =>
                      setPhoneNum({ ...phoneNum, start: value })
                    }
                  />
                </div>
                <Input
                  inputType={InputType.TEXT}
                  placeholder="0000"
                  value={phoneNum.middle}
                  onChange={(value) =>
                    setPhoneNum({ ...phoneNum, middle: value })
                  }
                  canDelete={false}
                />
                <Input
                  inputType={InputType.TEXT}
                  placeholder="0000"
                  value={phoneNum.end}
                  onChange={(value) => setPhoneNum({ ...phoneNum, end: value })}
                  canDelete={false}
                />
              </div>
            </InputLayout>
            {/* 서명 입력 */}
            <InputLayout title="Applicant Signature" isEssential>
              <div className="w-full relative shadow rounded-xl box-border h-[120px] mb-16">
                <SignaturePad
                  onSave={(signature: string) =>
                    setNewDocumentData({
                      ...newDocumentData,
                      signature_base64: signature,
                    })
                  }
                  onReset={() =>
                    setNewDocumentData({
                      ...newDocumentData,
                      signature_base64: '',
                    })
                  }
                  previewImg={newDocumentData.signature_base64}
                />
              </div>
            </InputLayout>
            {/* 고용주 정보가 있다면 표시 */}
            {document?.employer_information && (
              <EmployerInfoSection
                employ={document.employer_information}
                type={DocumentType.LABOR_CONTRACT}
              />
            )}
          </div>
        )}

        <BottomButtonPanel>
          {/* 입력된 정보 중 빈 칸이 없다면 활성화 */}
          {isNotEmpty(newDocumentData) && isNotEmpty(phoneNum) ? (
            <Button
              type="large"
              bgColor="bg-[#fef387]"
              fontColor="text-[#222]"
              isBorder={false}
              title={isEdit ? 'Modify' : 'Create'}
              onClick={handleNext}
            />
          ) : (
            <Button
              type="large"
              bgColor="bg-[#F4F4F9]"
              fontColor=""
              isBorder={false}
              title={isEdit ? 'Modify' : 'Create'}
            />
          )}
        </BottomButtonPanel>
      </div>
    </>
  );
};

export default LaborContractWriteForm;
