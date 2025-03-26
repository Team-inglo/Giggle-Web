import {
  initialIntegratedApplication,
  personalInfoList,
} from '@/constants/documents';
import { IntegratedApplicationData } from '@/types/api/document';
import { useEffect, useState } from 'react';
import Input from '@/components/Common/Input';
import { InputType } from '@/types/common/input';
import Dropdown from '@/components/Common/Dropdown';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { country, gender, phone } from '@/constants/information';
import RadioButton from '@/components/Information/RadioButton';
import { Gender } from '@/types/api/users';
import {
  propertyToString,
  validateIntegratedApplication,
} from '@/utils/document';
import BottomSheetLayout from '@/components/Common/BottomSheetLayout';
import SearchSchoolBottomSheet from '@/components/Document/write/SearchSchoolBottomSheet';
import SignaturePad from '@/components/Document/write/SignaturePad';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';
import {
  usePostIntegratedApplicants,
  usePutIntegratedApplicants,
} from '@/hooks/api/useDocument';
import {
  formatCompanyRegistrationNumber,
  formatPhoneNumber,
  parsePhoneNumber,
} from '@/utils/information';
import { useCurrentPostIdEmployeeStore } from '@/store/url';
import DaumPostcodeEmbed, { Address } from 'react-daum-postcode';
import { convertToAddress, getAddressCoords } from '@/utils/map';
import InputLayout from '../WorkExperience/InputLayout';

type IntegratedApplicationFormProps = {
  document?: IntegratedApplicationData;
  isEdit: boolean;
};

const IntegratedApplicationWriteForm = ({
  document,
  isEdit,
}: IntegratedApplicationFormProps) => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [isAddressSearch, setIsAddressSearch] = useState<boolean>(false);
  const { currentPostId } = useCurrentPostIdEmployeeStore();
  const [newDocumentData, setNewDocumentData] =
    useState<IntegratedApplicationData>(initialIntegratedApplication);

  // 세 부분으로 나누어 입력받는 방식을 위해 전화번호만 별도의 state로 분리, 추후 유효성 검사 단에서 통합
  const [phoneNum, setPhoneNum] = useState({
    start: '010',
    middle: '',
    end: '',
  });
  const [cellPhoneNum, setCellPhoneNum] = useState({
    start: '010',
    middle: '',
    end: '',
  });
  const [schoolPhoneNum, setSchoolPhoneNum] = useState({
    start: '',
    middle: '',
    end: '',
  });
  const [workPlacePhoneNum, setWorkPlacePhoneNum] = useState({
    start: '',
    middle: '',
    end: '',
  });
  // 학교 선택 모달 출현 여부 관리 state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: postDocument, isPending: postPending } =
    usePostIntegratedApplicants(Number(currentPostId)); // 통합신청서 생성 훅
  const { mutate: updateDocument, isPending: updatePending } =
    usePutIntegratedApplicants(Number(currentPostId)); // 통합신청서 수정 훅
  // 문서 편집일 시 페이지 진입과 동시에 기존 내용 자동 입력
  useEffect(() => {
    if (isEdit && document) {
      setNewDocumentData(document);
      setPhoneNum({
        start: parsePhoneNumber(newDocumentData.tele_phone_number).start,
        middle: parsePhoneNumber(newDocumentData.tele_phone_number).middle,
        end: parsePhoneNumber(newDocumentData.tele_phone_number).end,
      });
      setCellPhoneNum({
        start: parsePhoneNumber(newDocumentData.cell_phone_number).start,
        middle: parsePhoneNumber(newDocumentData.cell_phone_number).middle,
        end: parsePhoneNumber(newDocumentData.cell_phone_number).end,
      });
      setSchoolPhoneNum({
        start: parsePhoneNumber(newDocumentData.school_phone_number).start,
        middle: parsePhoneNumber(newDocumentData.school_phone_number).middle,
        end: parsePhoneNumber(newDocumentData.school_phone_number).end,
      });
    }
  }, [document, isEdit]);
  // 데이터 입력 시 실시간으로 유효성 검사
  useEffect(() => {
    setIsInvalid(
      !validateIntegratedApplication({
        ...newDocumentData,
        birth: newDocumentData.birth.replace(/\//g, '-'),
        cell_phone_number: formatPhoneNumber(cellPhoneNum),
        tele_phone_number: formatPhoneNumber(phoneNum),
        school_phone_number: formatPhoneNumber(schoolPhoneNum),
        new_work_place_phone_number: formatPhoneNumber(workPlacePhoneNum),
      }),
    );
  }, [
    newDocumentData,
    phoneNum,
    cellPhoneNum,
    schoolPhoneNum,
    workPlacePhoneNum,
  ]);

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
      birth: newDocumentData.birth.replace(/\//g, '-'),
      tele_phone_number: formatPhoneNumber(phoneNum),
      cell_phone_number: formatPhoneNumber(cellPhoneNum),
      school_phone_number: formatPhoneNumber(schoolPhoneNum),
      new_work_place_phone_number: formatPhoneNumber(workPlacePhoneNum),
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
      <div
        className={`w-full flex flex-col ${postPending || updatePending ? 'overflow-hidden pointer-events-none' : ''}`}
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
            {/* 생일 입력 */}
            <InputLayout title="Date Of Birth" isEssential>
              <Dropdown
                value={newDocumentData.birth}
                placeholder="Select Date"
                options={[]}
                isCalendar={true}
                setValue={(value) =>
                  setNewDocumentData({ ...newDocumentData, birth: value })
                }
              />
            </InputLayout>
            {/* 성별 입력 */}
            <InputLayout title="Gender" isEssential>
              <div className="w-full flex flex-row gap-8">
                {gender.map((gender) => (
                  <RadioButton
                    value={gender}
                    setValue={(value: string) =>
                      setNewDocumentData({
                        ...newDocumentData,
                        gender: value.toUpperCase() as Gender,
                      })
                    }
                    isOn={gender.toUpperCase() === newDocumentData.gender}
                  />
                ))}
              </div>
            </InputLayout>
            {/* 국적 입력 */}
            <InputLayout title="Nationality" isEssential>
              <Dropdown
                value={propertyToString(newDocumentData.nationality)}
                placeholder="Select Nationality"
                options={country} // TODO: 국가명 데이터 받으면 교체해야 함.
                setValue={(value: string) =>
                  setNewDocumentData({
                    ...newDocumentData,
                    nationality: value,
                  })
                }
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
              {newDocumentData.address.address_name && (
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
            {/* 전화번호 선택, dropdown으로 앞 번호를, 중간 번호와 뒷 번호는 각각 input으로 입력 받음 */}
            <InputLayout title="Telephone No." isEssential>
              <div className="w-full flex flex-row gap-2 justify-between">
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
            </InputLayout>
            {/* 개인 휴대폰 번호 입력 */}
            <InputLayout title="Cell Phone No." isEssential>
              <div className="w-full flex flex-row gap-2 justify-between">
                <div className="w-full h-[2.75rem]">
                  <Dropdown
                    value={cellPhoneNum.start}
                    placeholder="010"
                    options={phone}
                    setValue={(value) =>
                      setCellPhoneNum({ ...cellPhoneNum, start: value })
                    }
                  />
                </div>
                <Input
                  inputType={InputType.TEXT}
                  placeholder="0000"
                  value={cellPhoneNum.middle}
                  onChange={(value) =>
                    setCellPhoneNum({ ...cellPhoneNum, middle: value })
                  }
                  canDelete={false}
                />
                <Input
                  inputType={InputType.TEXT}
                  placeholder="0000"
                  value={cellPhoneNum.end}
                  onChange={(value) =>
                    setCellPhoneNum({ ...cellPhoneNum, end: value })
                  }
                  canDelete={false}
                />
              </div>
            </InputLayout>
            {/* 대학 종류 선택 */}
            <InputLayout title="Type Of Name" isEssential>
              <div className="w-full relative body-3 text-[#bdbdbd] text-left">
                University is an education office accredited school.
              </div>
              <div className="w-full relative flex flex-col items-start justify-center px-1 py-1.5 gap-3 text-left text-[#656565]">
                <RadioButton
                  value="Accredited by Eduvation Office"
                  setValue={() =>
                    setNewDocumentData({
                      ...newDocumentData,
                      is_accredited: true,
                    })
                  }
                  isOn={newDocumentData.is_accredited}
                />
                <RadioButton
                  value="Non-accredited, Alternative School"
                  setValue={() =>
                    setNewDocumentData({
                      ...newDocumentData,
                      is_accredited: false,
                    })
                  }
                  isOn={!newDocumentData.is_accredited}
                />
              </div>
            </InputLayout>
            {/* 학교 이름 입력 */}
            <InputLayout title="Name Of School" isEssential>
              <div onClick={() => setIsModalOpen(true)}>
                <Input
                  inputType={InputType.SEARCH}
                  placeholder="Name of School"
                  value={newDocumentData.school_name}
                  onChange={() => {}}
                  canDelete={false}
                />
              </div>
            </InputLayout>
            {/* 대학 번호 입력 */}
            <InputLayout title="Phone Number of School" isEssential>
              <div className="w-full flex flex-row gap-2 justify-between">
                <div className="w-full h-[2.75rem]">
                  <Dropdown
                    value={schoolPhoneNum.start}
                    placeholder="+82"
                    options={phone}
                    setValue={(value) =>
                      setSchoolPhoneNum({ ...schoolPhoneNum, start: value })
                    }
                  />
                </div>
                <Input
                  inputType={InputType.TEXT}
                  placeholder="0000"
                  value={schoolPhoneNum.middle}
                  onChange={(value) =>
                    setSchoolPhoneNum({ ...schoolPhoneNum, middle: value })
                  }
                  canDelete={false}
                />
                <Input
                  inputType={InputType.TEXT}
                  placeholder="0000"
                  value={schoolPhoneNum.end}
                  onChange={(value) =>
                    setSchoolPhoneNum({ ...schoolPhoneNum, end: value })
                  }
                  canDelete={false}
                />
              </div>
            </InputLayout>
            {/* 근무 장소 이름 입력 */}
            <InputLayout title="New Workplace" isEssential>
              <Input
                inputType={InputType.TEXT}
                placeholder="New Workplace Name"
                value={newDocumentData.new_work_place_name}
                onChange={(value) =>
                  setNewDocumentData({
                    ...newDocumentData,
                    new_work_place_name: value,
                  })
                }
                canDelete={false}
              />
            </InputLayout>
            {/* 사업자등록번호 입력 */}
            <InputLayout
              title="Business Registration No. Of New Workplace"
              isEssential
            >
              <Input
                inputType={InputType.TEXT}
                placeholder="X X X / X X / X X X X X"
                value={newDocumentData.new_work_place_registration_number}
                onChange={(value) =>
                  setNewDocumentData({
                    ...newDocumentData,
                    new_work_place_registration_number:
                      formatCompanyRegistrationNumber(value),
                  })
                }
                canDelete={false}
              />
            </InputLayout>
            {/* 근무 장소 전화번호 입력 */}
            <InputLayout title="Phone Number Of New Workplace" isEssential>
              <div className="w-full flex flex-row gap-2 justify-between">
                <div className="w-full h-[2.75rem]">
                  <Dropdown
                    value={workPlacePhoneNum.start}
                    placeholder="+82"
                    options={phone}
                    setValue={(value) =>
                      setWorkPlacePhoneNum({
                        ...workPlacePhoneNum,
                        start: value,
                      })
                    }
                  />
                </div>
                <Input
                  inputType={InputType.TEXT}
                  placeholder="0000"
                  value={workPlacePhoneNum.middle}
                  onChange={(value) =>
                    setWorkPlacePhoneNum({
                      ...workPlacePhoneNum,
                      middle: value,
                    })
                  }
                  canDelete={false}
                />
                <Input
                  inputType={InputType.TEXT}
                  placeholder="0000"
                  value={workPlacePhoneNum.end}
                  onChange={(value) =>
                    setWorkPlacePhoneNum({ ...workPlacePhoneNum, end: value })
                  }
                  canDelete={false}
                />
              </div>
            </InputLayout>
            {/* 연봉 입력 */}
            <InputLayout title="Annual Income Amount" isEssential>
              <Input
                inputType={InputType.TEXT}
                placeholder="0"
                value={String(newDocumentData.annual_income_amount)}
                onChange={(value) => {
                  if (typeof value === 'string' && !isNaN(Number(value))) {
                    setNewDocumentData({
                      ...newDocumentData,
                      annual_income_amount: Number(value),
                    });
                  }
                }}
                canDelete={false}
              />
            </InputLayout>
            {/* 직업 입력 */}
            <InputLayout title="Occupation" isEssential>
              <div className="w-full relative body-3 text-[#bdbdbd] text-left">
                If you are a college student, please write 'student'.
              </div>
              <Input
                inputType={InputType.TEXT}
                placeholder="Occupation"
                value={newDocumentData.occupation}
                onChange={(value) =>
                  setNewDocumentData({
                    ...newDocumentData,
                    occupation: value,
                  })
                }
                canDelete={false}
              />
            </InputLayout>
            {/* 이메일 입력 */}
            <InputLayout title="Email" isEssential>
              <Input
                inputType={InputType.TEXT}
                placeholder="Email"
                value={newDocumentData.email}
                onChange={(value) =>
                  setNewDocumentData({ ...newDocumentData, email: value })
                }
                canDelete={false}
              />
            </InputLayout>
            {/* 서명 입력 */}
            <InputLayout title="Applicant Signature" isEssential>
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
            </InputLayout>
            {/* 서류 출력 후 작성 정보 입력 안내 */}
            <div className="mt-4 p-4 rounded-md bg-surface-secondary">
              <section className="flex flex-col gap-1 pb-4 border-b border-border-disabled">
                <p className="button-1">
                  Keep it safe! You'll need this later 👀
                </p>
                <p className="caption text-text-alternative">
                  Since it contains personal information, we won't ask for it
                  now. Just print it out and complete it when required.
                </p>
              </section>
              <section className="pt-4 flex flex-col gap-4 button-2">
                {personalInfoList.map((info, index) => (
                  <div key={index}>{'📌 ' + info}</div>
                ))}
              </section>
            </div>
          </div>
        )}
        {isModalOpen && (
          <BottomSheetLayout
            hasHandlebar
            isAvailableHidden={true}
            isShowBottomsheet={isModalOpen}
            setIsShowBottomSheet={setIsModalOpen}
          >
            <SearchSchoolBottomSheet
              newDocumentData={newDocumentData}
              setNewDocumentData={setNewDocumentData}
              onClose={() => setIsModalOpen(false)}
            />
          </BottomSheetLayout>
        )}
        <BottomButtonPanel>
          {/* 입력된 정보들이 유효성 검사를 통과했다면 활성화 */}
          {isInvalid ? (
            <Button
              type="large"
              bgColor="bg-[#F4F4F9]"
              fontColor=""
              isBorder={false}
              title={isEdit ? 'Modify' : 'Create'}
            />
          ) : (
            <Button
              type="large"
              bgColor="bg-[#fef387]"
              fontColor="text-[#222]"
              isBorder={false}
              title={isEdit ? 'Modify' : 'Create'}
              onClick={handleNext}
            />
          )}
        </BottomButtonPanel>
      </div>
    </>
  );
};

export default IntegratedApplicationWriteForm;
