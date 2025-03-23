import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';
import Dropdown from '@/components/Common/Dropdown';
import Input from '@/components/Common/Input';
import InputLayout from '@/components/WorkExperience/InputLayout';
import { InputType } from '@/types/common/input';
import { JobPostingForm } from '@/types/postCreate/postCreate';
import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import CheckIcon from '@/assets/icons/CheckOfBoxIcon.svg?react';
import { buttonTypeKeys } from '@/constants/components';
import { formatDateToDash } from '@/utils/editResume';
import DaumPostcodeEmbed, { Address } from 'react-daum-postcode';
import { convertToAddress, getAddressCoords } from '@/utils/map';

const Step2 = ({
  postInfo,
  isAddressSearch,
  setIsAddressSearch,
  onNext,
  onPrev,
}: {
  postInfo: JobPostingForm;
  isAddressSearch: boolean;
  setIsAddressSearch: (value: boolean) => void;
  onNext: (postInfo: JobPostingForm) => void;
  onPrev: () => void;
}) => {
  // 현재 step내에서 입력받는 정보를 따로 관리할 state, 추후 다음 step으로 넘어갈 때 funnel 관리 페이지의 state로 통합된다.
  const [newPostInfo, setNewPostInfo] = useState<JobPostingForm>(postInfo);
  // 버튼 활성화 여부를 위한 플래그
  const [isInvalid, setIsInvalid] = useState(true);
  const handleAddressSelection = async (data: Address) => {
    const convertedAddress = convertToAddress(data);
    const coords = await getAddressCoords(
      convertedAddress.address_name as string,
    );
    const x = coords.getLng();
    const y = coords.getLat();

    setNewPostInfo({
      ...newPostInfo,
      body: {
        ...newPostInfo.body,
        address: {
          ...newPostInfo.body.address,
          ...convertedAddress,
          longitude: y,
          latitude: x,
        },
      },
    });
    setIsAddressSearch(false);
  };

  // 첫 로딩 시 현재 사용자의 위치 파악 해 지도에 표기
  useEffect(() => {
    if (navigator.geolocation && !newPostInfo.body.address?.address_name) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        setNewPostInfo({
          ...newPostInfo,
          body: {
            ...newPostInfo.body,
            address: {
              ...newPostInfo.body.address,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          },
        });
      });
    }
  }, []);

  /* 정보 입력 시마다 유효성을 검사해 모든 값이 유효하면 버튼이 활성화 */
  useEffect(() => {
    const { address } = newPostInfo.body;

    const isFormValid =
      address.address_name !== '' &&
      address.address_detail &&
      address.address_detail !== '';
    // work_day_times.length &&
    setIsInvalid(!isFormValid);
  }, [newPostInfo]);
  return (
    <div className="w-full h-full py-6 flex flex-col">
      {isAddressSearch ? (
        <div className="w-full h-screen fixed top-0 bg-surface-base">
          <DaumPostcodeEmbed
            style={{
              position: 'fixed',
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
        </div>
      ) : (
        <>
          <div className="[&>*:last-child]:mb-40 flex flex-col gap-4">
            <div className="w-full flex flex-col gap-[1.125rem]">
              {/* 주소 검색 입력 input */}
              <div onClick={() => setIsAddressSearch(true)}>
                <InputLayout title="근무지 주소" isEssential>
                  <Input
                    inputType={InputType.SEARCH}
                    placeholder="주소 검색"
                    value={newPostInfo.body.address.address_name}
                    onChange={() => {}}
                    canDelete={false}
                  />
                </InputLayout>
              </div>
              {/* 검색한 위치를 보여주는 지도 */}
              <div className="w-full rounded-xl">
                <Map
                  center={{
                    lat: newPostInfo.body.address?.latitude ?? 0,
                    lng: newPostInfo.body.address?.longitude ?? 0,
                  }}
                  style={{ width: '100%', height: '200px' }}
                  className="rounded-xl"
                >
                  <MapMarker
                    position={{
                      lat: newPostInfo.body.address?.latitude ?? 0,
                      lng: newPostInfo.body.address?.longitude ?? 0,
                    }}
                  ></MapMarker>
                </Map>
              </div>
              <InputLayout title="상세주소" isEssential>
                <Input
                  inputType={InputType.TEXT}
                  placeholder="ex) 101동"
                  value={newPostInfo.body.address.address_detail}
                  onChange={(value) =>
                    setNewPostInfo({
                      ...newPostInfo,
                      body: {
                        ...newPostInfo.body,
                        address: {
                          ...newPostInfo.body.address,
                          address_detail: value,
                        },
                      },
                    })
                  }
                  canDelete={false}
                />
              </InputLayout>
            </div>
            {/* 날짜 선택 입력 */}
            <InputLayout title="공고 종료일" isEssential>
              <Dropdown
                value={
                  newPostInfo.body.recruitment_dead_line === null
                    ? ''
                    : newPostInfo.body.recruitment_dead_line
                }
                placeholder="날짜 선택"
                options={[]}
                isCalendar={true}
                setValue={(value) =>
                  setNewPostInfo({
                    ...newPostInfo,
                    body: {
                      ...newPostInfo.body,
                      recruitment_dead_line: formatDateToDash(value),
                    },
                  })
                }
              />
            </InputLayout>
            <div className="w-full relative flex items-center justify-start py-2 gap-3 text-left body-3 text-text-alternative">
              <div className="w-6 h-6 relative">
                <div
                  className={`w-full h-full border border-border-alternative rounded-sm flex items-center justify-center ${newPostInfo.body.recruitment_dead_line === null ? 'bg-primary-dark' : 'bg-white'}`}
                  onClick={
                    newPostInfo.body.recruitment_dead_line !== null
                      ? () =>
                          setNewPostInfo({
                            ...newPostInfo,
                            body: {
                              ...newPostInfo.body,
                              recruitment_dead_line: null,
                            },
                          })
                      : () =>
                          setNewPostInfo({
                            ...newPostInfo,
                            body: {
                              ...newPostInfo.body,
                              recruitment_dead_line: '',
                            },
                          })
                  }
                >
                  <CheckIcon />
                </div>
              </div>
              <div className="flex items-start justify-start">
                상시모집 할래요
              </div>
            </div>
          </div>
          <BottomButtonPanel>
            {/* 정보 입력 시마다 유효성을 검사해 모든 값이 유효하면 버튼이 활성화 */}
            <div className="w-full flex gap-2">
              <Button
                type={buttonTypeKeys.BACK}
                bgColor="bg-surface-secondary"
                fontColor="text-text-normal"
                isBorder={false}
                title="이전"
                onClick={() => onPrev()}
              />
              <Button
                type="large"
                bgColor={
                  isInvalid ? 'bg-surface-secondary' : 'bg-surface-primary'
                }
                fontColor={
                  isInvalid ? 'text-text-disabled' : 'text-text-normal'
                }
                isBorder={false}
                title="다음"
                onClick={
                  isInvalid
                    ? undefined
                    : () =>
                        onNext({
                          ...postInfo,
                          body: {
                            ...newPostInfo.body,
                            recruitment_dead_line:
                              newPostInfo.body.recruitment_dead_line &&
                              formatDateToDash(
                                newPostInfo.body.recruitment_dead_line,
                              ),
                          },
                        })
                }
              />
            </div>
          </BottomButtonPanel>
        </>
      )}
    </div>
  );
};

export default Step2;
