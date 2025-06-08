import Button from '@/components/Common/Button';
import Dropdown from '@/components/Common/Dropdown';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import Input from '@/components/Common/Input';
import RadioButton from '@/components/Information/RadioButton';
import EditProfilePicture from '@/components/Profile/EditProfilePicture';
import { buttonTypeKeys } from '@/constants/components';
import { GenderType } from '@/constants/profile';
import {
  InitialUserProfileDetail,
  UserEditRequestBody,
} from '@/types/api/profile';
import { InputType } from '@/types/common/input';
import {
  changeValidData,
  transformToProfileRequest,
  validateFieldValues,
} from '@/utils/editProfileData';
import { useEffect, useState } from 'react';
import { phone, visa } from '@/constants/information';
import useNavigateBack from '@/hooks/useNavigateBack';
import { useGetUserProfile, usePatchUserProfile } from '@/hooks/api/useProfile';
import InputLayout from '@/components/WorkExperience/InputLayout';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import DaumPostcodeEmbed, { Address } from 'react-daum-postcode';
import { processAddressData } from '@/utils/map';
import { documentTranslation } from '@/constants/translation';
import { formatDateInput } from '@/utils/information';
import { Nationalities } from '@/constants/manageResume';
import {
  getNationalityEnFromEnum,
  getNationalityEnumFromEn,
} from '@/utils/resume';

const EditProfilePage = () => {
  const { data: userProfile } = useGetUserProfile();
  const { mutate } = usePatchUserProfile();

  const [isValid, setIsValid] = useState(false);
  const [isAddressSearch, setIsAddressSearch] = useState<boolean>(false);
  const [originalData, setOriginalData] = useState<UserEditRequestBody>();
  const [userData, setUserData] = useState<UserEditRequestBody>(
    InitialUserProfileDetail,
  );
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [phoneNum, setPhoneNum] = useState({
    start: '',
    middle: '',
    end: '',
  });

  const handleBackButtonClick = useNavigateBack();

  // 검색된 주소 선택 시 state에 반영
  const handleAddressSelection = async (data: Address) => {
    const newAddress = await processAddressData(data);
    setUserData({
      ...userData,
      address: newAddress,
    });
    setIsAddressSearch(false);
  };

  const handleSubmit = () => {
    // API - 3.5 (유학생) 프로필 수정
    if (!originalData || !userData) return;

    // api 요청 형식과 일치시키는 함수(유효성 검증)
    const transformedData = changeValidData(
      userData as UserEditRequestBody,
      phoneNum,
      Boolean(profileImage), // 이미지 변경 여부 확인
    );

    const formData = new FormData();
    // 이미지가 있을 경우 FormData에 추가
    if (profileImage) {
      formData.append('image', profileImage);
    }
    // JSON 데이터를 Blob으로 변환 후 FormData에 추가
    formData.append(
      'body',
      new Blob([JSON.stringify(transformedData)], {
        type: 'application/json',
      }),
    );
    // mutate 호출
    mutate(formData);
  };

  // 전화번호를 3개의 파트로 구분
  useEffect(() => {
    if (userData?.phone_number) {
      const [start, middle, end] = userData.phone_number.split('-');
      setPhoneNum({ start, middle, end });
    }
  }, [userData]);

  // 수정을 위한 초기 데이터 세팅
  useEffect(() => {
    if (userProfile) {
      const initailData = transformToProfileRequest(userProfile.data);
      setOriginalData(initailData);
      setUserData(initailData);
    }
  }, [userProfile]);

  // 수정 여부를 확인(프로필 사진만 변경했을 경우 포함)
  useEffect(() => {
    const isValidNewData =
      !!originalData && validateFieldValues(userData, phoneNum);
    setIsValid(isValidNewData);
  }, [userData, originalData, phoneNum]);

  return (
    <>
      {userProfile && (
        <div className="w-full h-full">
          <BaseHeader
            hasBackButton={true}
            onClickBackButton={handleBackButtonClick}
            hasMenuButton={false}
            title="Edit Profile"
          />
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
            <div className="flex flex-col px-6 gap-4 mb-32">
              <EditProfilePicture
                profileImgUrl={userProfile.data.profile_img_url}
                onImageUpdate={setProfileImage}
              />
              {/* 이름 작성 */}
              <InputLayout title="First Name" isEssential={true}>
                <Input
                  inputType={InputType.TEXT}
                  placeholder="First Name"
                  value={userData.first_name}
                  onChange={(value) =>
                    setUserData({
                      ...userData,
                      first_name: value,
                    })
                  }
                  canDelete={false}
                />
              </InputLayout>
              {/* 성 작성 */}
              <InputLayout title="Last Name" isEssential={true}>
                <Input
                  inputType={InputType.TEXT}
                  placeholder="Last Name"
                  value={userData.last_name}
                  onChange={(value) =>
                    setUserData({
                      ...userData,
                      last_name: value,
                    })
                  }
                  canDelete={false}
                />
              </InputLayout>
              <InputLayout title="Gender" isEssential={true}>
                <div className="w-full flex flex-row gap-8">
                  <RadioButton
                    value={GenderType.MALE as string}
                    setValue={(value: string) =>
                      setUserData({
                        ...userData,
                        gender: value as GenderType,
                      })
                    }
                    isOn={userData.gender === GenderType.MALE}
                  />
                  <RadioButton
                    value={GenderType.FEMALE as string}
                    setValue={(value: string) =>
                      setUserData({
                        ...userData,
                        gender: value as GenderType,
                      })
                    }
                    isOn={userData.gender === GenderType.FEMALE}
                  />
                  <RadioButton
                    value={GenderType.NONE as string}
                    setValue={(value: string) =>
                      setUserData({
                        ...userData,
                        gender: value as GenderType,
                      })
                    }
                    isOn={userData.gender === GenderType.NONE}
                  />
                </div>
              </InputLayout>
              {/* 생년월일 선택 */}
              <InputLayout title="Date of birth" isEssential={false} isOptional>
                <Input
                  inputType={InputType.TEXT}
                  placeholder="YYYY-MM-DD"
                  value={userData.birth || ''}
                  onChange={(value) =>
                    setUserData({ ...userData, birth: formatDateInput(value) })
                  }
                  canDelete={false}
                />
              </InputLayout>
              {/* 국적 선택 */}
              <InputLayout title="Nationality" isEssential={false} isOptional>
                <Dropdown
                  value={
                    getNationalityEnFromEnum(userData.nationality || '') || ''
                  }
                  placeholder="Select Nationality"
                  options={Nationalities.map((nationality) => nationality.en)}
                  setValue={(value: string) =>
                    setUserData({
                      ...userData,
                      nationality: getNationalityEnumFromEn(value) as string,
                    })
                  }
                />
              </InputLayout>
              <div className="w-full flex flex-col gap-[1.125rem]">
                {/* 주소 검색 입력 input */}
                <InputLayout title="Address" isEssential={false} isOptional>
                  <div onClick={() => setIsAddressSearch(true)}>
                    <Input
                      inputType={InputType.SEARCH}
                      placeholder="Search Your Address"
                      value={userData.address.address_name}
                      onChange={() => {}}
                      canDelete={false}
                    />
                  </div>
                </InputLayout>
                {/* 검색한 위치를 보여주는 지도 */}
                {userData.address.address_name !== '' && (
                  <>
                    <div className="w-full rounded-xl z-0">
                      <Map
                        center={{
                          lat: userData.address?.latitude ?? 0,
                          lng: userData.address?.longitude ?? 0,
                        }}
                        style={{ width: '100%', height: '200px' }}
                        className="rounded-xl"
                      >
                        <MapMarker
                          position={{
                            lat: userData.address?.latitude ?? 0,
                            lng: userData.address?.longitude ?? 0,
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
                        placeholder="ex) 101dong"
                        value={userData.address.address_detail}
                        onChange={(value) =>
                          setUserData({
                            ...userData,
                            address: {
                              ...userData.address,
                              address_detail: value,
                            },
                          })
                        }
                        canDelete={false}
                      />
                      {userData.address.address_detail &&
                        userData.address.address_detail.length > 50 && (
                          <p className="text-text-error text-xs p-2">
                            {documentTranslation.detailAddressTooLong.en}
                          </p>
                        )}
                    </InputLayout>
                  </>
                )}
              </div>
              {/* 비자 선택 */}
              <InputLayout title="Visa Status" isEssential={true}>
                <Dropdown
                  value={userData.visa}
                  placeholder="Select Visa Status"
                  options={visa}
                  setValue={(value: string) =>
                    setUserData({ ...userData, visa: value })
                  }
                />
              </InputLayout>
              {/* 전화번호 선택, dropdown으로 앞 번호를, 중간 번호와 뒷 번호는 각각 input으로 입력 받음 */}
              <InputLayout title="Telephone No." isEssential={true}>
                <div className="w-full flex gap-2 justify-between items-start">
                  <div className="w-full">
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
                    onChange={(value) =>
                      setPhoneNum({ ...phoneNum, end: value })
                    }
                    canDelete={false}
                  />
                </div>
              </InputLayout>
            </div>
          )}

          <BottomButtonPanel>
            <Button
              type={buttonTypeKeys.LARGE}
              title="Save"
              bgColor={isValid ? 'bg-[#FEF387]' : 'bg-[#F4F4F9]'}
              fontColor={isValid ? 'text-[#1E1926]' : 'text-[#BDBDBD]'}
              onClick={isValid ? handleSubmit : undefined}
              isBorder={false}
            />
          </BottomButtonPanel>
        </div>
      )}
    </>
  );
};

export default EditProfilePage;
