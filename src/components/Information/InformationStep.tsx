import Input from '@/components/Common/Input';
import { initialUserInfo, UserInfoRequestBody } from '@/types/api/users';
import { UserInfo } from '@/types/api/users';
import { useEffect, useState } from 'react';
import {
  formatDateInput,
  formatPhoneNumber,
  isValidName,
  isValidPhoneNumber,
} from '@/utils/information';
import Dropdown from '@/components/Common/Dropdown';
import { gender, phone, visa } from '@/constants/information';
import RadioButton from '@/components/Information/RadioButton';
import { InputType } from '@/types/common/input';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';
import { formatDateToDash } from '@/utils/editResume';
import InputLayout from '../WorkExperience/InputLayout';
import PageTitle from '../Common/PageTitle';
import { signInputTranclation } from '@/constants/translation';
import { isEmployer } from '@/utils/signup';
import { useLocation } from 'react-router-dom';
import { Nationalities } from '@/constants/manageResume';
import {
  getNationalityEnFromEnum,
  getNationalityEnumFromEn,
} from '@/utils/resume';
const InformationStep = ({
  userInfo,
  onNext,
}: {
  userInfo: UserInfoRequestBody;
  onNext: (newInfo: UserInfoRequestBody) => void;
}) => {
  const { pathname } = useLocation();
  // 현재 step내에서 입력받는 정보를 따로 관리할 state, 추후 다음 step으로 넘어갈 때 funnel 관리 페이지의 state로 통합된다.
  const [newUserInfo, setNewUserInfo] = useState<UserInfo>(initialUserInfo);
  // 버튼 활성화 여부를 위한 플래그
  const [isInvalid, setIsInvalid] = useState(true);
  // 세 부분으로 나누어 입력받는 방식을 위해 전화번호만 별도의 state로 분리, 추후 유효성 검사 단에서 통합
  const [phoneNum, setPhoneNum] = useState({
    start: '010',
    middle: '',
    end: '',
  });

  /* 정보 입력 시마다 유효성을 검사해 모든 값이 유효하면 버튼이 활성화 */
  useEffect(() => {
    const { first_name, last_name, visa, birth } = newUserInfo;

    // 1. 필수 요소들 검증
    const isEssentialValid =
      isValidName(String(first_name)) &&
      isValidName(String(last_name)) &&
      visa !== '' &&
      isValidPhoneNumber(phoneNum);

    // 필수 요소가 하나라도 유효하지 않으면 여기서 종료
    if (!isEssentialValid) {
      setIsInvalid(true);
      return;
    }

    // 2. 선택 요소들 검증
    const isOptionalValid =
      // 빈칸이거나 유효한 값인 경우 true
      birth === '' || Date.parse(birth as string) < Date.now();

    if (!isOptionalValid) {
      setIsInvalid(false);
      return;
    }

    // 3. 모든 검증을 통과했을 때만 state 업데이트
    setIsInvalid(false);
  }, [newUserInfo, phoneNum]);

  // 사용자 정보 포맷팅을 위한 별도 함수
  const formatUserInfoForSubmission = (
    newUserInfo: UserInfo,
    phoneNum: string,
  ): UserInfo => {
    return {
      ...newUserInfo,
      first_name: newUserInfo.first_name?.replace(/\s+/g, ' ').trim() ?? null,
      last_name: newUserInfo.last_name?.replace(/\s+/g, ' ').trim() ?? null,
      nationality:
        newUserInfo.nationality?.toUpperCase().replace(/\s/g, '_') ?? null,
      birth: newUserInfo.birth
        ? formatDateToDash(newUserInfo.birth as string)
        : null,
      phone_number: phoneNum,
      visa: newUserInfo.visa?.replace(/-/g, '_') ?? '',
    };
  };

  const handleNextClick = () => {
    if (isInvalid) return;

    const formattedUserInfo = formatUserInfoForSubmission(
      newUserInfo,
      formatPhoneNumber(phoneNum),
    );

    onNext({
      ...userInfo,
      user_info: formattedUserInfo,
    });
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-row items-center justify-between">
        <PageTitle
          title={signInputTranclation.infoStepTitle[isEmployer(pathname)]}
          content={signInputTranclation.infoStepContent[isEmployer(pathname)]}
        />
      </div>
      <div className="w-full mx-auto mb-[7rem]">
        <div className="w-full flex flex-col gap-[1rem]">
          {/* 이름 작성 */}
          <InputLayout title="First Name" isEssential={true}>
            <Input
              inputType={InputType.TEXT}
              placeholder="First Name"
              value={newUserInfo.first_name}
              onChange={(value) =>
                setNewUserInfo({ ...newUserInfo, first_name: value })
              }
              canDelete={false}
            />
          </InputLayout>
          {/* 성 작성 */}
          <InputLayout title="Last Name" isEssential={true}>
            <Input
              inputType={InputType.TEXT}
              placeholder="Last Name"
              value={newUserInfo.last_name}
              onChange={(value) =>
                setNewUserInfo({ ...newUserInfo, last_name: value })
              }
              canDelete={false}
            />
          </InputLayout>
          {/* 전화번호 선택, dropdown으로 앞 번호를, 중간 번호와 뒷 번호는 각각 input으로 입력 받음 */}
          <InputLayout title="Cell phone No." isEssential={true}>
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
          {/* 성별 선택 */}
          <InputLayout title="Gender" isEssential={true}>
            <div className="w-full flex flex-row gap-8">
              {gender.map((gender) => (
                <RadioButton
                  value={gender}
                  setValue={(value: string) =>
                    setNewUserInfo({
                      ...newUserInfo,
                      gender: value.toUpperCase(),
                    })
                  }
                  isOn={gender.toUpperCase() === newUserInfo.gender}
                />
              ))}
            </div>
          </InputLayout>
          {/* 생년월일 선택 */}
          <InputLayout title="Date of birth" isEssential={false} isOptional>
            <Input
              inputType={InputType.TEXT}
              placeholder="YYYY-MM-DD"
              value={newUserInfo.birth || ''}
              onChange={(value) =>
                setNewUserInfo({
                  ...newUserInfo,
                  birth: formatDateInput(value),
                })
              }
              canDelete={false}
            />
          </InputLayout>
          {/* 국적 선택 */}
          <InputLayout title="Nationality" isEssential={false} isOptional>
            <Dropdown
              value={
                getNationalityEnFromEnum(newUserInfo.nationality || '') || ''
              }
              placeholder="Select Nationality"
              options={Nationalities.map((nationality) => nationality.en)} // TODO: 국가명 데이터 받으면 교체해야 함.
              setValue={(value: string) =>
                setNewUserInfo({
                  ...newUserInfo,
                  nationality: getNationalityEnumFromEn(value) as string,
                })
              }
            />
          </InputLayout>
          {/* 비자 선택 */}
          <InputLayout title="Visa Status" isEssential>
            <Dropdown
              value={newUserInfo.visa}
              placeholder="Select Visa Status"
              options={visa} // TODO: 비자 데이터 받으면 교체해야
              setValue={(value: string) =>
                setNewUserInfo({ ...newUserInfo, visa: value })
              }
            />
          </InputLayout>
        </div>
        {/* 정보 입력 시마다 유효성을 검사해 모든 값이 유효하면 버튼이 활성화 */}
        <BottomButtonPanel>
          <Button
            type="large"
            bgColor={isInvalid ? 'bg-[#F4F4F9]' : 'bg-[#fef387]'}
            fontColor={isInvalid ? '' : 'text-[#222]'}
            isBorder={false}
            title="Next"
            onClick={handleNextClick}
          />
        </BottomButtonPanel>
      </div>
    </div>
  );
};

export default InformationStep;
