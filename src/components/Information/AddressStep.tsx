import { InputType } from '@/types/common/input';
import Input from '@/components/Common/Input';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import {
  GiggleAddress,
  initialAddress,
  UserInfoRequestBody,
} from '@/types/api/users';
import { useState } from 'react';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import { DropdownModal } from '@/components/Common/Dropdown';
import Button from '@/components/Common/Button';
import { useAddressSearch } from '@/hooks/api/useAddressSearch';
import InputLayout from '@/components/WorkExperience/InputLayout';
import PageTitle from '../Common/PageTitle';
import { signInputTranclation } from '@/constants/translation';
import { useLocation } from 'react-router-dom';
import { isEmployer } from '@/utils/signup';

type AddressStepProps = {
  userInfo: UserInfoRequestBody;
  onNext: (newInfo: UserInfoRequestBody) => void;
};

const AddressStep = ({ userInfo, onNext }: AddressStepProps) => {
  const { pathname } = useLocation();
  const [newAddress, setNewAddress] = useState<GiggleAddress>(initialAddress);
  const {
    addressInput, // 주소 검색용 input 저장하는 state
    addressSearchResult, // 주소 검색 결과를 저장하는 array
    currentGeoInfo, // 지도에 표시할 핀에 사용되는 위/경도 좌표
    handleAddressSearch, // 검색할 주소 입력 시 실시간 검색
    handleAddressSelect, // 검색 결과 중 원하는 주소를 선택할 시 state에 입력
    setAddressInput,
  } = useAddressSearch();

  // 검색된 주소 선택 시 state에 반영
  const handleAddressSelection = (selectedAddressName: string) => {
    const result = handleAddressSelect(selectedAddressName);
    if (!result) return;
    setNewAddress({ ...newAddress, ...result.addressData });
    setAddressInput(result.selectedAddressName);
  };

  return (
    <div className="w-full mx-auto">
      <div className="w-full flex flex-row items-center justify-between">
        <PageTitle
          title={signInputTranclation.addressStepTitle[isEmployer(pathname)]}
          content={
            signInputTranclation.addressStepContent[isEmployer(pathname)]
          }
        />
      </div>
      <div className="w-full flex flex-col gap-[1.125rem]">
        {/* 주소 검색 입력 input */}
        <InputLayout title="Main Address" isEssential={false} isOptional>
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
              value={
                newAddress.address_name === null ? '' : newAddress.address_name
              }
              options={Array.from(
                addressSearchResult.map((address) => address.address_name),
              )}
              onSelect={handleAddressSelection}
            />
          )}
        </InputLayout>
        {/* 검색한 위치를 보여주는 지도 */}
        {newAddress.address_name !== '' && (
          <>
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
            <InputLayout
              title="Detailed Address"
              isEssential={false}
              isOptional
            >
              <Input
                inputType={InputType.TEXT}
                placeholder="ex) 101-dong"
                value={newAddress.address_detail}
                onChange={(value) => {
                  if (value.trim().length <= 100) {
                    // 100자 이하일 때만 업데이트
                    setNewAddress({ ...newAddress, address_detail: value });
                  }
                }}
                canDelete={false}
              />
            </InputLayout>
          </>
        )}
      </div>
      {/* 다음 step 이동 버튼 포함한 Bottom Panel */}
      <BottomButtonPanel>
        <Button
          type="large"
          bgColor={
            newAddress.address_detail &&
            newAddress.address_detail?.trim().length > 100
              ? 'bg-[#F4F4F9]'
              : 'bg-[#fef387]'
          }
          fontColor={
            newAddress.address_detail &&
            newAddress.address_detail?.trim().length > 100
              ? ''
              : 'text-[#222]'
          }
          isBorder={false}
          title="Next"
          onClick={
            newAddress.address_detail &&
            newAddress.address_detail?.trim().length > 100
              ? undefined
              : () =>
                  onNext({
                    ...userInfo,
                    address: newAddress,
                  })
          }
        />
      </BottomButtonPanel>
    </div>
  );
};

export default AddressStep;
