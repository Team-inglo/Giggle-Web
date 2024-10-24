import { initialLaborContractEmployeeInfo } from '@/constants/documents';
import {
  DocumentType,
  LaborContractDataResponse,
  LaborContractEmployeeInfo,
} from '@/types/api/document';
import { formatPhoneNumber } from '@/utils/information';
import { useCallback, useEffect, useState } from 'react';
import Input from '@/components/Common/Input';
import { InputType } from '@/types/common/input';
import Dropdown, { DropdownModal } from '@/components/Common/Dropdown';
import { phone } from '@/constants/information';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useGetGeoInfo, useSearchAddress } from '@/hooks/api/useKaKaoMap';
import { AddressType, Document } from '@/types/api/map';
import { pick } from '@/utils/map';
import { isNotEmpty } from '@/utils/document';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';
import SignaturePad from '@/components/Document/write/SignaturePad';
import EmployerInfoSection from '@/components/Document/write/EmployerInfoSection';
import { usePostStandardLaborContracts } from '@/hooks/api/useDocument';

type LaborContractFormProps = {
  document?: LaborContractDataResponse;
  isEdit: boolean;
};

const LaborContractWriteForm = ({
  document,
  isEdit,
}: LaborContractFormProps) => {
  const [newDocumentData, setNewDocumentData] =
    useState<LaborContractEmployeeInfo>(initialLaborContractEmployeeInfo);

  // 세 부분으로 나누어 입력받는 방식을 위해 전화번호만 별도의 state로 분리, 추후 유효성 검사 단에서 통합
  const [phoneNum, setPhoneNum] = useState({
    start: '',
    middle: '',
    end: '',
  });
  // 주소 검색용 input 저장하는 state
  const [addressInput, setAddressInput] = useState('');
  // 주소 검색 결과를 저장하는 array
  const [addressSearchResult, setAddressSearchResult] = useState<Document[]>(
    [],
  );
  // 지도에 표시할 핀에 사용되는 위/경도 좌표
  const [currentGeoInfo, setCurrentGeoInfo] = useState({
    lat: 0,
    lon: 0,
  });
  const { data, isSuccess } = useGetGeoInfo(setCurrentGeoInfo); // 현재 좌표 기준 주소 획득
  // 키워드로 주소 검색
  const { searchAddress } = useSearchAddress({
    onSuccess: (data) => setAddressSearchResult(data),
  });
  // 작성된 근로계약서 제출 훅
  const { mutate } = usePostStandardLaborContracts();
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

  // 검색할 주소 입력 시 실시간 검색
  const handleAddressSearch = useCallback(
    (address: string) => {
      setAddressInput(address);
      if (address !== '') {
        searchAddress(address);
      } else {
        setAddressSearchResult([]);
      }
    },
    [searchAddress],
  );

  // 검색 결과 중 원하는 주소를 선택할 시 state에 입력
  const handleAddressSelect = (selectedAddressName: string) => {
    // 사용자가 선택한 주소와 일치하는 결과를 검색 결과를 저장하는 array에서 탐색
    const selectedAddress = addressSearchResult.find(
      (address) => address.address_name === selectedAddressName,
    ) as Document | undefined;

    if (!selectedAddress) return;

    // 구 주소와 도로명 주소를 구분하기 위한 플래그(카카오에서 반환하는 속성 명이 달라짐)
    const isRegionAddr =
      selectedAddress.address_type === AddressType.REGION_ADDR;
    const addressData = isRegionAddr
      ? selectedAddress.address
      : selectedAddress.road_address;

    // 카카오에서 반환하는 데이터 중 필요한 속성들만 선택
    const selectedProperties = pick(addressData, [
      'address_name',
      'region_1depth_name',
      'region_2depth_name',
      'region_3depth_name',
    ]);

    let region4DepthName = ''; // optional property인 region4DeptName
    if (isRegionAddr) {
      region4DepthName = selectedAddress.address.region_3depth_h_name || '';
    } else {
      region4DepthName = selectedAddress.road_address.road_name || '';
    }

    // 선택한 데이터들을 state에 update
    setNewDocumentData({
      ...newDocumentData,
      address: {
        ...newDocumentData.address,
        ...selectedProperties,
        region_4depth_name: region4DepthName,
        longitude: Number(addressData.x),
        latitude: Number(addressData.y),
      },
    });
    setAddressInput(selectedAddress.address_name);
    setCurrentGeoInfo({
      lon: Number(selectedAddress.x),
      lat: Number(selectedAddress.y),
    });
    // 검색 결과 초기화
    setAddressSearchResult([]);
  };

  // 문서 작성 완료 핸들러 함수
  const handleNext = () => {
    mutate({
      id: 1,
      document: {
        ...newDocumentData,
        phone_number: formatPhoneNumber(phoneNum),
      },
    }); // TODO: 로그인 연결 후 userId를 넣어야 하는 것으로 추정
  };
  return (
    <div className="w-full p-6 flex flex-col">
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
                  addressSearchResult.filter(
                    (address) =>
                      address.address_type !==
                      (AddressType.REGION_ADDR || AddressType.ROAD_ADDR),
                  ),
                  (address) => address.address_name,
                )}
                onSelect={handleAddressSelect}
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
                position={{ lat: currentGeoInfo.lat, lng: currentGeoInfo.lon }}
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
                setValue={(value) => setPhoneNum({ ...phoneNum, start: value })}
              />
            </div>
            <Input
              inputType={InputType.TEXT}
              placeholder="0000"
              value={phoneNum.middle}
              onChange={(value) => setPhoneNum({ ...phoneNum, middle: value })}
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
            title="Next"
            onClick={handleNext}
          />
        ) : (
          <Button
            type="large"
            bgColor="bg-[#F4F4F9]"
            fontColor=""
            isBorder={false}
            title="Next"
          />
        )}
      </BottomButtonPanel>
    </div>
  );
};

export default LaborContractWriteForm;
