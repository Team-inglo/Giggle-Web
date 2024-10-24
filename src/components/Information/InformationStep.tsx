import Input from '@/components/Common/Input';
import { initialUserInfo, UserInfoRequestBody } from '@/types/api/users';
import { UserInfo } from '@/types/api/users';
import { useEffect, useState } from 'react';
import {
  formatPhoneNumber,
  isValidName,
  isValidPhoneNumber,
} from '@/utils/information';
import Dropdown from '@/components/Common/Dropdown';
import { country, gender, phone, visa } from '@/constants/information';
import RadioButton from '@/components/Information/RadioButton';
import { InputType } from '@/types/common/input';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';

const InformationStep = ({
  userInfo,
  onNext,
}: {
  userInfo: UserInfoRequestBody;
  onNext: (newInfo: UserInfoRequestBody) => void;
}) => {
  // 현재 step내에서 입력받는 정보를 따로 관리할 state, 추후 다음 step으로 넘어갈 때 funnel 관리 페이지의 state로 통합된다.
  const [newUserInfo, setNewUserInfo] = useState<UserInfo>(initialUserInfo);
  // 버튼 활성화 여부를 위한 플래그
  const [isInvalid, setIsInvalid] = useState(true);
  // 세 부분으로 나누어 입력받는 방식을 위해 전화번호만 별도의 state로 분리, 추후 유효성 검사 단에서 통합
  const [phoneNum, setPhoneNum] = useState({
    start: '',
    middle: '',
    end: '',
  });

  /* 정보 입력 시마다 유효성을 검사해 모든 값이 유효하면 버튼이 활성화 */
  useEffect(() => {
    const { first_name, last_name, birth, nationality, visa } = newUserInfo;

    const isFormValid =
      isValidName(String(first_name)) &&
      isValidName(String(last_name)) &&
      birth !== '' &&
      nationality !== '' &&
      visa !== '' &&
      isValidPhoneNumber(phoneNum);

    if (isFormValid) {
      setNewUserInfo((prevInfo) => ({
        ...prevInfo,
        phone_number: formatPhoneNumber(phoneNum),
      }));
    }

    setIsInvalid(!isFormValid);
  }, [newUserInfo, phoneNum]);

  return (
    <div className="w-full mx-auto">
      <div className="w-full flex flex-col gap-[1.125rem]">
        {/* 이름 작성 */}
        <div className="w-full">
          <div className="w-full flex items-center justify-start body-3 color-[#222] px-[0.25rem] py-[0.375rem]">
            First Name
          </div>
          <Input
            inputType={InputType.TEXT}
            placeholder="First Name"
            value={newUserInfo.first_name}
            onChange={(value) =>
              setNewUserInfo({ ...newUserInfo, first_name: value })
            }
            canDelete={false}
          />
        </div>
        {/* 성 작성 */}
        <div className="w-full">
          <div className="w-full flex items-center justify-start body-3 color-[#222] px-[0.25rem] py-[0.375rem]">
            Last Name
          </div>
          <Input
            inputType={InputType.TEXT}
            placeholder="Last Name"
            value={newUserInfo.last_name}
            onChange={(value) =>
              setNewUserInfo({ ...newUserInfo, last_name: value })
            }
            canDelete={false}
          />
        </div>
        <div className="w-full">
          <div className="w-full flex items-center justify-start body-3 color-[#222] px-[0.25rem] py-[0.375rem]">
            Gender
          </div>
          <div className="w-full flex flex-row gap-[1.75rem]">
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
        </div>
        {/* 생년월일 선택 */}
        <div className="w-full">
          <div className="w-full flex items-center justify-start body-3 color-[#222] px-[0.25rem] py-[0.375rem]">
            Date of birth
          </div>
          <Dropdown
            value={newUserInfo.birth}
            placeholder="Select Date"
            options={[]}
            isCalendar={true}
            setValue={(value) =>
              setNewUserInfo({ ...newUserInfo, birth: value })
            }
          />
        </div>
        {/* 국적 선택 */}
        <div className="w-full">
          <div className="w-full flex items-center justify-start body-3 color-[#222] px-[0.25rem] py-[0.375rem]">
            Nationality
          </div>
          <Dropdown
            value={newUserInfo.nationality}
            placeholder="Select Nationality"
            options={country} // TODO: 국가명 데이터 받으면 교체해야 함.
            setValue={(value: string) =>
              setNewUserInfo({ ...newUserInfo, nationality: value })
            }
          />
        </div>
        {/* 비자 선택 */}
        <div className="w-full">
          <div className="w-full flex items-center justify-start body-3 color-[#222] px-[0.25rem] py-[0.375rem]">
            Visa Status
          </div>
          <Dropdown
            value={newUserInfo.visa}
            placeholder="Select Visa Status"
            options={visa} // TODO: 비자 데이터 받으면 교체해야
            setValue={(value: string) =>
              setNewUserInfo({ ...newUserInfo, visa: value })
            }
          />
        </div>
        {/* 전화번호 선택, dropdown으로 앞 번호를, 중간 번호와 뒷 번호는 각각 input으로 입력 받음 */}
        <div className="w-full">
          <div className="w-full flex flex-row items-center justify-start body-3 color-[#222] px-[0.25rem] py-[0.375rem]">
            Telephone No.
          </div>
          <div className="w-full flex flex-row gap-2 justify-between mb-[30rem]">
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
      </div>
      {/* 정보 입력 시마다 유효성을 검사해 모든 값이 유효하면 버튼이 활성화 */}
      <BottomButtonPanel>
        {isInvalid ? (
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
            fontColor="text-[#222]"
            isBorder={false}
            title="Next"
            onClick={() =>
              onNext({
                ...userInfo,
                user_info: {
                  ...newUserInfo,
                  nationality: newUserInfo.nationality
                    ?.toUpperCase()
                    .replace(/\s/g, '_'),
                },
              })
            }
          />
        )}
      </BottomButtonPanel>
    </div>
  );
};

export default InformationStep;
