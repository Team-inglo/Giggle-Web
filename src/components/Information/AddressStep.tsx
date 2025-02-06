import { InputType } from '@/types/common/input';
import Input from '@/components/Common/Input';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import {
  Address,
  initialAddress,
  UserInfoRequestBody,
} from '@/types/api/users';
import { useEffect, useState } from 'react';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import { useGetGeoInfo } from '@/hooks/api/useKaKaoMap';
import { DropdownModal } from '@/components/Common/Dropdown';
import Button from '@/components/Common/Button';
import { useAddressSearch } from '@/hooks/api/useAddressSearch';

type AddressStepProps = {
  userInfo: UserInfoRequestBody;
  onNext: (newInfo: UserInfoRequestBody) => void;
};

const AddressStep = ({ userInfo, onNext }: AddressStepProps) => {
  const [newAddress, setNewAddress] = useState<Address>(initialAddress);
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

  // 첫 로딩 시 현재 사용자의 위치 파악 해 지도에 표기
  useEffect(() => {
    setNewAddress({
      ...newAddress,
      address_name:
        data?.address.address_name === undefined
          ? null
          : data.address.address_name,
    });
  }, [isSuccess]);

  // 검색된 주소 선택 시 state에 반영
  const handleAddressSelection = (selectedAddressName: string) => {
    const result = handleAddressSelect(selectedAddressName);
    if (!result) return;
    setNewAddress({ ...newAddress, ...result.addressData });
    setAddressInput(result.selectedAddressName);
  };

  return (
    <div className="w-full mx-auto">
      <div className="w-full flex flex-col gap-[1.125rem]">
        {/* 주소 검색 입력 input */}
        <div className="w-full">
          <div className="w-full flex items-center justify-start body-3 color-[#222] px-[0.25rem] py-[0.375rem]">
            Main Address
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
              value={
                newAddress.address_name === null ? '' : newAddress.address_name
              }
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
              position={{ lat: currentGeoInfo.lat, lng: currentGeoInfo.lon }}
            ></MapMarker>
          </Map>
        </div>
        <div className="w-full">
          <div className="w-full flex items-center justify-start body-3 color-[#222] px-[0.25rem] py-[0.375rem]">
            Detailed Address
          </div>
          <Input
            inputType={InputType.TEXT}
            placeholder="ex) 101-dong"
            value={newAddress.address_detail}
            onChange={(value) =>
              newAddress.address_detail &&
              newAddress.address_detail.trim().length < 100 &&
              setNewAddress({ ...newAddress, address_detail: value })
            }
            canDelete={false}
          />
        </div>
      </div>
      {/* 다음 step 이동 버튼 포함한 Bottom Panel */}
      <BottomButtonPanel>
        <Button
          type="large"
          bgColor={
            newAddress.region_1depth_name === ''
              ? 'bg-[#F4F4F9]'
              : 'bg-[#fef387]'
          }
          fontColor={newAddress.region_1depth_name === '' ? '' : 'text-[#222]'}
          isBorder={false}
          title="Next"
          onClick={
            newAddress.region_1depth_name === ''
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
