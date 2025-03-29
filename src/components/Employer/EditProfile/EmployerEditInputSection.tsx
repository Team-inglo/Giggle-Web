import Dropdown from '@/components/Common/Dropdown';
import Input from '@/components/Common/Input';
import InputLayout from '@/components/WorkExperience/InputLayout';
import { phone } from '@/constants/information';
import { InputType } from '@/types/common/input';
import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import FileAddIcon from '@/assets/icons/FileAddIcon.svg?react';
import CheckIcon from '@/assets/icons/CheckOfBoxIcon.svg?react';
import GiggleLogo from '@/assets/icons/GiggleLogo.svg?react';
import giggleLogoPng from '@/assets/images/GiggleLogo.png';
import {
  formatCompanyRegistrationNumber,
  formatPhoneNumber,
} from '@/utils/information';
import { EmployerProfileRequestBody } from '@/types/api/profile';
import { convertToAddress, getAddressCoords } from '@/utils/map';
import DaumPostcodeEmbed, { Address } from 'react-daum-postcode';
import { documentTranslation } from '@/constants/translation';

type EmployerEditInputSectionProps = {
  newEmployData: EmployerProfileRequestBody;
  setNewEmployData: (newData: EmployerProfileRequestBody) => void;
  logo?: string;
  setLogoFile: (file: File | undefined) => void;
  initialPhonNum: string;
};

const enum LogoType {
  DEFAULT = 'default',
  NONE = 'none',
  EXISTING = 'existing',
  SELECTED = 'selected',
}

const EmployerEditInputSection = ({
  newEmployData,
  setNewEmployData,
  logo,
  setLogoFile,
  initialPhonNum,
}: EmployerEditInputSectionProps) => {
  const [isAddressSearch, setIsAddressSearch] = useState<boolean>(false);
  // 세 부분으로 나누어 입력받는 방식을 위해 전화번호만 별도의 state로 분리, 추후 유효성 검사 단에서 통합
  const [phoneNum, setPhoneNum] = useState({
    start: '',
    middle: '',
    end: '',
  });
  const [logoStatus, setLogoStatus] = useState<LogoType>(LogoType.EXISTING);
  const [selectedImage, setSelectedImage] = useState<string>();

  useEffect(() => {
    if (initialPhonNum) {
      const splitPhoneNum = initialPhonNum.split('-');
      setPhoneNum({
        start: splitPhoneNum[0] || '',
        middle: splitPhoneNum[1] || '',
        end: splitPhoneNum[2] || '',
      });
    }
  }, [initialPhonNum]);

  useEffect(() => {
    setNewEmployData({
      ...newEmployData,
      owner_info: {
        ...newEmployData.owner_info,
        phone_number: formatPhoneNumber(phoneNum),
      },
    });
  }, [phoneNum]);

  // 검색된 주소 선택 시 state에 반영
  const handleAddressSelection = async (data: Address) => {
    const convertedAddress = convertToAddress(data);
    const coords = await getAddressCoords(
      convertedAddress.address_name as string,
    );
    const x = coords.getLng();
    const y = coords.getLat();

    setNewEmployData({
      ...newEmployData,
      address: {
        ...newEmployData.address,
        ...convertedAddress,
        longitude: y,
        latitude: x,
      },
    });
    setIsAddressSearch(false);
  };

  // 로고 선택
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setLogoFile(file);
        setLogoStatus(LogoType.SELECTED);
      };
      reader.readAsDataURL(file);
    }
  };
  // Giggle 기본로고 선택 handler
  const handleDefaultLogo = async (type: LogoType) => {
    if (type === LogoType.NONE) {
      setLogoStatus(LogoType.NONE);
      setSelectedImage(undefined);
      setLogoFile(undefined);
    }
    if (type === LogoType.DEFAULT) {
      setLogoStatus(LogoType.DEFAULT);
      try {
        // 이미지 URL에서 Blob 생성
        const response = await fetch(giggleLogoPng);
        const blob = await response.blob();
        // Blob을 File 객체로 변환
        const file = new File([blob], 'giggle-logo.png', { type: 'image/png' });
        setLogoFile(file);
      } catch (error) {
        console.error('Error converting image to File:', error);
      }
    }
  };
  return (
    <>
      <div className="w-full flex flex-col p-6 items-center justify-between">
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
          <div className="flex flex-col gap-4 [&>*:last-child]:mb-40">
            <div className="w-full py-6 flex items-center justify-start title-1 text-[#1e1926] text-left">
              회사/점포 정보 수정
            </div>
            {/* 이름 입력 */}
            <InputLayout title="회사/점포명" isEssential>
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
            <InputLayout title="대표자명" isEssential>
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
            {/* 주소 입력 */}
            <div className="w-full flex flex-col gap-[1.125rem]">
              {/* 주소 검색 입력 input */}
              <InputLayout title="회사/점포주소" isEssential>
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
              {/* 검색한 위치를 보여주는 지도 */}
              <div className="w-full rounded-xl">
                <Map
                  center={{
                    lat: newEmployData.address?.latitude ?? 0,
                    lng: newEmployData.address?.longitude ?? 0,
                  }}
                  style={{ width: '100%', height: '200px' }}
                  className="rounded-xl"
                >
                  <MapMarker
                    position={{
                      lat: newEmployData.address?.latitude ?? 0,
                      lng: newEmployData.address?.longitude ?? 0,
                    }}
                  ></MapMarker>
                </Map>
              </div>
              <InputLayout title="상세 주소" isEssential>
                <Input
                  inputType={InputType.TEXT}
                  placeholder="ex) 101-dong"
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
                    <p className="text-[#FF6F61] text-xs p-2">
                      {documentTranslation.detailAddressTooLong.ko}
                    </p>
                  )}
              </InputLayout>
            </div>
            {/* 사업자 등록번호 입력 */}
            <InputLayout title="사업자 등록번호" isEssential>
              <Input
                inputType={InputType.TEXT}
                placeholder="X X X / X X / X X X X X"
                value={newEmployData.owner_info.company_registration_number}
                onChange={(value) =>
                  setNewEmployData({
                    ...newEmployData,
                    owner_info: {
                      ...newEmployData.owner_info,
                      company_registration_number:
                        formatCompanyRegistrationNumber(value),
                    },
                  })
                }
                canDelete={false}
              />
            </InputLayout>
            {/* 개인 휴대폰 번호 입력 */}
            <InputLayout title="대표자 전화번호" isEssential>
              <div className="w-full flex flex-row gap-2 justify-between">
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
            {/* 회사 로고 입력 */}
            <InputLayout title="회사 로고" isEssential={false}>
              <div className="w-full flex flex-col items-center justify-start">
                <div className="w-full flex items-center justify-start">
                  <label
                    className="cursor-pointer"
                    htmlFor="logo-upload"
                    aria-label={
                      logoStatus === LogoType.SELECTED
                        ? 'Change logo image'
                        : 'Upload logo image'
                    }
                  >
                    <div className="w-11 shadow-[0_1px_2px_rgba(107,110,116,0.04)] rounded-lg bg-white border-[0.5px] border-[#eae9f6] h-11 flex items-center justify-center">
                      {logoStatus === LogoType.NONE && <FileAddIcon />}
                      {logoStatus === LogoType.DEFAULT && <GiggleLogo />}
                      {logoStatus === LogoType.SELECTED && selectedImage && (
                        <div className="relative w-full h-full group">
                          <img
                            src={selectedImage}
                            alt="Selected logo"
                            className="w-full h-full object-cover rounded-lg"
                          />
                          {/* Hover overlay */}
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity rounded-lg flex items-center justify-center">
                            <FileAddIcon className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      )}
                      {logoStatus === LogoType.EXISTING && logo && (
                        <div className="relative w-full h-full group">
                          <img
                            src={logo}
                            alt="Selected logo"
                            className="w-full h-full object-cover rounded-lg"
                          />
                          {/* Hover overlay */}
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity rounded-lg flex items-center justify-center">
                            <FileAddIcon className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      )}
                    </div>
                    <input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      // input을 재선택할 수 있도록 key를 추가
                      key={selectedImage}
                    />
                  </label>
                </div>
                <div className="w-full relative flex items-center justify-start py-2 gap-3 text-left body-3 text-[#656565]">
                  <div className="w-6 h-6 relative">
                    <div
                      className={`w-full h-full border border-[#f4f4f9] flex items-center justify-center ${logoStatus === LogoType.DEFAULT ? 'bg-[#1E1926]' : 'bg-white'}`}
                      onClick={
                        logoStatus === LogoType.DEFAULT
                          ? () => handleDefaultLogo(LogoType.NONE)
                          : () => handleDefaultLogo(LogoType.DEFAULT)
                      }
                    >
                      <CheckIcon />
                    </div>
                  </div>
                  <div className="flex items-start justify-start">
                    Giggle 기본로고를 사용 할게요
                  </div>
                </div>
              </div>
            </InputLayout>
          </div>
        )}
      </div>
    </>
  );
};

export default EmployerEditInputSection;
