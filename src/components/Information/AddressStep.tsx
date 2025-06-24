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
import Button from '@/components/Common/Button';
import InputLayout from '@/components/WorkExperience/InputLayout';
import PageTitle from '../Common/PageTitle';
import {
  documentTranslation,
  signInputTranclation,
} from '@/constants/translation';
import { useLocation } from 'react-router-dom';
import { isEmployer } from '@/utils/signup';
import DaumPostcodeEmbed, { Address } from 'react-daum-postcode';
import { processAddressData } from '@/utils/map';

type AddressStepProps = {
  userInfo: UserInfoRequestBody;
  onNext: (newInfo: UserInfoRequestBody) => void;
};

const AddressStep = ({ userInfo, onNext }: AddressStepProps) => {
  const { pathname } = useLocation();
  const [isAddressSearch, setIsAddressSearch] = useState(false);
  const [newAddress, setNewAddress] = useState<GiggleAddress>(initialAddress);
  // 검색된 주소 선택 시 state에 반영
  const handleAddressSelection = async (data: Address) => {
    const newAddress = await processAddressData(data);
    setNewAddress(newAddress);
    setIsAddressSearch(false);
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
      <div className="w-full flex flex-col gap-[1.125rem] overflow-y-scroll scrollbar-hide">
        {isAddressSearch ? (
          <DaumPostcodeEmbed
            style={{
              position: 'absolute',
              top: '50px',
              left: '0',
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
          <div className="w-full flex flex-col px-4 gap-[1.125rem] [&>*:last-child]:mb-32">
            {/* 주소 검색 입력 input */}
            <InputLayout title="Main Address" isOptional>
              <div onClick={() => setIsAddressSearch(true)}>
                <Input
                  inputType={InputType.SEARCH}
                  placeholder="Search Your Address"
                  value={newAddress.address_name}
                  onChange={() => {}}
                  canDelete={false}
                />
              </div>
            </InputLayout>
            {/* 검색한 위치를 보여주는 지도 */}
            {newAddress.address_name !== '' && (
              <>
                <div className="w-full rounded-xl">
                  <Map
                    center={{
                      lat: newAddress?.latitude ?? 0,
                      lng: newAddress?.longitude ?? 0,
                    }}
                    style={{ width: '100%', height: '200px' }}
                    className="rounded-xl"
                  >
                    <MapMarker
                      position={{
                        lat: newAddress?.latitude ?? 0,
                        lng: newAddress?.longitude ?? 0,
                      }}
                    ></MapMarker>
                  </Map>
                </div>
                <InputLayout title="Detailed Address" isOptional>
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
                  {newAddress.address_detail &&
                    newAddress.address_detail.length > 50 && (
                      <p className="text-text-error text-xs p-2">
                        {documentTranslation.detailAddressTooLong.en}
                      </p>
                    )}
                </InputLayout>
              </>
            )}
          </div>
        )}
      </div>
      {/* 다음 step 이동 버튼 포함한 Bottom Panel */}
      <BottomButtonPanel>
        <Button
          type="large"
          bgColor={
            newAddress.address_detail &&
            newAddress.address_detail?.trim().length > 50
              ? 'bg-[#F4F4F9]'
              : 'bg-[#fef387]'
          }
          fontColor={
            newAddress.address_detail &&
            newAddress.address_detail?.trim().length > 50
              ? ''
              : 'text-[#222]'
          }
          isBorder={false}
          title="Next"
          onClick={
            newAddress.address_detail &&
            newAddress.address_detail?.trim().length > 50
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
