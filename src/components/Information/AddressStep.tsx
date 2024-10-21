import { InputType } from '@/types/common/input';
import Input from '@/components/Common/Input';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import {
  Address,
  initialAddress,
  UserInfoRequestBody,
} from '@/types/api/users';
import { useCallback, useEffect, useState } from 'react';
import BottomButtonPanel from '../Common/BottomButtonPanel';
import { useGetGeoInfo, useSearchAddress } from '@/hooks/api/useKaKaoMap';
import { Document } from '@/types/api/map';
import { DropdownModal } from '../Common/Dropdown';
import { AddressType } from '@/types/api/map';
import { pick } from '../../utils/map';
import Button from '../Common/Button';

type AddressStepProps = {
  userInfo: UserInfoRequestBody;
  onNext: (newInfo: UserInfoRequestBody) => void;
};

const AddressStep = ({ userInfo, onNext }: AddressStepProps) => {
  const [newAddress, setNewAddress] = useState<Address>(initialAddress);
  const [addressInput, setAddressInput] = useState('');
  const [addressSearchResult, setAddressSearchResult] = useState<Document[]>(
    [],
  );
  const [currentGeoInfo, setCurrentGeoInfo] = useState({
    lat: 0,
    lon: 0,
  });
  const { data, isSuccess } = useGetGeoInfo(setCurrentGeoInfo); // 현재 좌표 기준 주소 획득
  // 키워드로 주소 검색
  const { mutate } = useSearchAddress({
    onSuccess: (data) => setAddressSearchResult(data),
  });

  // 첫 로딩 시 현재 사용자의 위치 파악 해 지도에 표기
  useEffect(() => {
    setNewAddress({
      ...newAddress,
      address_name: data?.address.address_name,
    });
  }, [isSuccess]);

  // 검색할 주소 입력 시 실시간 검색
  const handleAddressSearch = useCallback(
    (address: string) => {
      setAddressInput(address);
      if (address !== '') {
        mutate(address);
      } else {
        setAddressSearchResult([]);
      }
    },
    [mutate],
  );

  // 검색 결과 중 원하는 주소를 선택할 시 state에 입력
  const handleAddressSelect = (selectedAddressName: string) => {
    const selectedAddress = addressSearchResult.find(
      (address) => address.address_name === selectedAddressName,
    ) as Document | undefined;

    if (!selectedAddress) return;

    const isRegionAddr =
      selectedAddress.address_type === AddressType.REGION_ADDR;
    const addressData = isRegionAddr
      ? selectedAddress.address
      : selectedAddress.road_address;

    const selectedProperties = pick(addressData, [
      'address_name',
      'region_1depth_name',
      'region_2depth_name',
      'region_3depth_name',
    ]);

    let region4DepthName = '';
    if (isRegionAddr) {
      region4DepthName = selectedAddress.address.region_3depth_h_name || '';
    } else {
      region4DepthName = selectedAddress.road_address.road_name || '';
    }

    setNewAddress({
      ...newAddress,
      ...selectedProperties,
      region_4depth_name: region4DepthName,
      longitude: Number(addressData.x),
      latitude: Number(addressData.y),
    });
    setAddressInput(selectedAddress.address_name);
    setCurrentGeoInfo({
      lon: Number(selectedAddress.x),
      lat: Number(selectedAddress.y),
    });
    setAddressSearchResult([]);
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
              value={newAddress.address_name}
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
            Detailed Address
          </div>
          <Input
            inputType={InputType.TEXT}
            placeholder="ex) 101-dong"
            value={newAddress.address_detail}
            onChange={(value) =>
              setNewAddress({ ...newAddress, address_detail: value })
            }
            canDelete={false}
          />
        </div>
      </div>
      {/* 다음 step 이동 버튼 포함한 Bottom Panel */}
      <BottomButtonPanel>
        {newAddress.region_1depth_name === '' ? (
          <Button
            type="large"
            bgColor="bg-[#F4F4F9]"
            fontColor=""
            isBorder={false}
            title="Next"
          />
        ) : (
          <Button
            type="large"
            bgColor="bg-[#fef387]"
            fontColor=""
            isBorder={false}
            title="Next"
            onClick={() =>
              onNext({
                ...userInfo,
                address: newAddress,
              })
            }
          />
        )}
      </BottomButtonPanel>
    </div>
  );
};

export default AddressStep;
