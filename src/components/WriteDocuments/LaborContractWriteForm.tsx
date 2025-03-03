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
import Dropdown, { DropdownModal } from '@/components/Common/Dropdown';
import { phone } from '@/constants/information';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useGetGeoInfo } from '@/hooks/api/useKaKaoMap';
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
import { useAddressSearch } from '@/hooks/api/useAddressSearch';

type LaborContractFormProps = {
  document?: LaborContractDataResponse;
  isEdit: boolean;
};

const LaborContractWriteForm = ({
  document,
  isEdit,
}: LaborContractFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [newDocumentData, setNewDocumentData] =
    useState<LaborContractEmployeeInfo>(initialLaborContractEmployeeInfo);
  const { currentPostId } = useCurrentPostIdEmployeeStore();
  // 세 부분으로 나누어 입력받는 방식을 위해 전화번호만 별도의 state로 분리, 추후 유효성 검사 단에서 통합
  const [phoneNum, setPhoneNum] = useState({
    start: '',
    middle: '',
    end: '',
  });
  const {
    addressInput, // 주소 검색용 input 저장하는 state
    addressSearchResult, // 주소 검색 결과를 저장하는 array
    currentGeoInfo, // 지도에 표시할 핀에 사용되는 위/경도 좌표
    setCurrentGeoInfo,
    handleAddressSearch, // 검색할 주소 입력 시 실시간 검색
    handleAddressSelect, // 검색 결과 중 원하는 주소를 선택할 시 state에 입력
    setAddressInput,
  } = useAddressSearch();
  const { data, isSuccess } = useGetGeoInfo(setCurrentGeoInfo); // 현재 좌표 기준 주소 획득
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
      setAddressInput(newDocumentData.address.address_name as string);
      setCurrentGeoInfo({
        lat: newDocumentData.address.latitude ?? 0,
        lon: newDocumentData.address.longitude ?? 0,
      });
    }
  }, [document, isEdit]);

  // 첫 로딩 시 현재 사용자의 위치 파악 해 지도에 표기
  useEffect(() => {
    setNewDocumentData({
      ...newDocumentData,
      address: {
        ...newDocumentData.address,
        address_name: String(data?.address.address_name),
      },
    });
  }, [isSuccess]);

  // 검색된 주소 선택 시 state에 반영
  const handleAddressSelection = (selectedAddressName: string) => {
    const result = handleAddressSelect(selectedAddressName);
    if (!result) return;

    setNewDocumentData({
      ...newDocumentData,
      address: {
        ...newDocumentData.address,
        ...result.addressData,
      },
    });
    setAddressInput(result.selectedAddressName);
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
        className={`w-full p-6 flex flex-col ${isLoading ? 'overflow-hidden pointer-events-none' : ''}`}
      >
        <div className="[&>*:last-child]:mb-40 flex flex-col gap-4">
          {/* 이름 입력 */}
          <div className="w-full">
            <div className="w-full flex items-center justify-start body-3 color-[#222] px-[0.25rem] py-[0.375rem]">
              <div className="relative">
                First Name
                <div className="w-1.5 absolute !m-0 top-[0rem] right-[-0.5rem] rounded-full text-[#ff6f61] h-1.5 z-[1]">
                  *
                </div>
              </div>
            </div>
            <Input
              inputType={InputType.TEXT}
              placeholder="First Name"
              value={newDocumentData.first_name}
              onChange={(value) =>
                setNewDocumentData({ ...newDocumentData, first_name: value })
              }
              canDelete={false}
            />
          </div>
          {/* 성 입력 */}
          <div className="w-full">
            <div className="w-full flex items-center justify-start body-3 color-[#222] px-[0.25rem] py-[0.375rem]">
              <div className="relative">
                Last Name
                <div className="w-1.5 absolute !m-0 top-[0rem] right-[-0.5rem] rounded-full text-[#ff6f61] h-1.5 z-[1]">
                  *
                </div>
              </div>
            </div>
            <Input
              inputType={InputType.TEXT}
              placeholder="Last Name"
              value={newDocumentData.last_name}
              onChange={(value) =>
                setNewDocumentData({ ...newDocumentData, last_name: value })
              }
              canDelete={false}
            />
          </div>
          <div className="w-full flex flex-col gap-[1.125rem]">
            {/* 주소 검색 입력 input */}
            <div className="w-full">
              <div className="w-full flex items-center justify-start body-3 color-[#222] px-[0.25rem] py-[0.375rem]">
                <div className="relative">
                  Address in Korea
                  <div className="w-1.5 absolute !m-0 top-[0rem] right-[-0.5rem] rounded-full text-[#ff6f61] h-1.5 z-[1]">
                    *
                  </div>
                </div>
              </div>
              <Input
                inputType={InputType.SEARCH}
                placeholder="Search Your Address"
                value={addressInput}
                onChange={(value) => handleAddressSearch(value)}
                canDelete={false}
              />
              {/* 주소 검색 결과 보여주는 dropdown modal */}
              {addressSearchResult && addressSearchResult.length !== 0 && (
                <DropdownModal
                  value={newDocumentData.address.address_name}
                  options={Array.from(
                    addressSearchResult.map((address) => address.address_name),
                  )}
                  onSelect={handleAddressSelection}
                />
              )}
            </div>
            {/* 검색한 위치를 보여주는 지도 */}
            <div className="w-full rounded-xl">
              <Map
                center={{ lat: currentGeoInfo.lat, lng: currentGeoInfo.lon }}
                style={{ width: '100%', height: '200px' }}
                className="rounded-xl"
              >
                <MapMarker
                  position={{
                    lat: currentGeoInfo.lat,
                    lng: currentGeoInfo.lon,
                  }}
                ></MapMarker>
              </Map>
            </div>
            <div className="w-full">
              <div className="w-full flex items-center justify-start body-3 color-[#222] px-[0.25rem] py-[0.375rem]">
                <div className="relative">
                  Detailed Address
                  <div className="w-1.5 absolute !m-0 top-[0rem] right-[-0.5rem] rounded-full text-[#ff6f61] h-1.5 z-[1]">
                    *
                  </div>
                </div>
              </div>
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
            </div>
          </div>
          {/* 전화번호 입력 */}
          <div className="w-full">
            <div className="w-full flex flex-row items-center justify-start body-3 color-[#222] px-[0.25rem] py-[0.375rem]">
              <div className="relative">
                Telephone No.
                <div className="w-1.5 absolute !m-0 top-[0rem] right-[-0.5rem] rounded-full text-[#ff6f61] h-1.5 z-[1]">
                  *
                </div>
              </div>
            </div>
            <div className="w-full flex flex-row gap-2 justify-between mb-[0rem]">
              <div className="w-full h-[2.75rem]">
                <Dropdown
                  value={phoneNum.start}
                  placeholder="+82"
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
          </div>
          {/* 서명 입력 */}
          <div className="w-full">
            <div className="w-full flex flex-row items-center justify-start body-3 color-[#222] px-[0.25rem] py-[0.375rem]">
              <div className="relative">
                Applicant Signature
                <div className="w-1.5 absolute !m-0 top-[0rem] right-[-0.5rem] rounded-full text-[#ff6f61] h-1.5 z-[1]">
                  *
                </div>
              </div>
            </div>
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
          </div>
          {/* 고용주 정보가 있다면 표시 */}
          {document?.employer_information && (
            <EmployerInfoSection
              employ={document.employer_information}
              type={DocumentType.LABOR_CONTRACT}
            />
          )}
        </div>
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
