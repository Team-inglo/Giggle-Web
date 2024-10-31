import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';
import Dropdown from '@/components/Common/Dropdown';
import Input from '@/components/Common/Input';
import RadioButton from '@/components/Information/RadioButton';
import InputLayout from '@/components/WorkExperience/InputLayout';
import { buttonTypeKeys } from '@/constants/components';
import {
  EducationLevelInfo,
  EducationList,
  GenderList,
  VisaInfo,
  VisaList,
} from '@/constants/post';
import { Gender } from '@/types/api/users';
import { InputType } from '@/types/common/input';
import {
  EducationLevel,
  JobPostingForm,
  VisaGroup,
} from '@/types/postCreate/postCreate';
import {
  EducationCategoryNames,
  extractNumbersAsNumber,
  findEducationLevelByNameStrict,
  findGenderByNameStrict,
  findVisaByNameStrict,
  GenderCategoryNames,
  VisaCategoryNames,
} from '@/utils/post';
import { useEffect, useState } from 'react';
import CheckIcon from '@/assets/icons/CheckOfBoxIcon.svg?react';

const Step3 = ({
  postInfo,
  onNext,
  onPrev,
}: {
  postInfo: JobPostingForm;
  onNext: (postInfo: JobPostingForm) => void;
  onPrev: () => void;
}) => {
  // 현재 step내에서 입력받는 정보를 따로 관리할 state, 추후 다음 step으로 넘어갈 때 funnel 관리 페이지의 state로 통합된다.
  const [newPostInfo, setNewPostInfo] = useState<JobPostingForm>(postInfo);
  const [recruitmentNum, setRecruitmentNum] = useState(
    String(newPostInfo.body.recruitment_number) + ' 명',
  );
  const [ageRestrict, setAgeRestrict] = useState(
    newPostInfo.body.age_restriction === null
      ? ''
      : String(newPostInfo.body.age_restriction) + '살 이상',
  );
  // 버튼 활성화 여부를 위한 플래그
  const [isInvalid, setIsInvalid] = useState(true);

  /* 정보 입력 시마다 유효성을 검사해 모든 값이 유효하면 버튼이 활성화 */
  useEffect(() => {
    const { education_level } = newPostInfo.body;

    const isFormValid =
      extractNumbersAsNumber(recruitmentNum) !== 0 &&
      extractNumbersAsNumber(ageRestrict) !== 0 &&
      education_level !== '' &&
      newPostInfo.body.visa !== '';
    setIsInvalid(!isFormValid);
  }, [newPostInfo, ageRestrict, recruitmentNum]);

  return (
    <div className="w-full py-6 flex flex-col">
      <div className="[&>*:last-child]:mb-40 flex flex-col gap-4">
        {/* 모집인원 입력 */}
        <InputLayout title="모집인원" isEssential>
          <Input
            inputType={InputType.TEXT}
            placeholder="모집 인원을 입력해주세요"
            value={recruitmentNum}
            onChange={(value) => setRecruitmentNum(value)}
            canDelete={false}
          />
        </InputLayout>
        {/* 성별 입력 */}
        <InputLayout title="성별" isEssential>
          <div className="w-full flex flex-row gap-[1.75rem]">
            {GenderList.map((gender) => (
              <RadioButton
                value={gender}
                setValue={(value: string) =>
                  setNewPostInfo({
                    ...newPostInfo,
                    body: {
                      ...newPostInfo.body,
                      gender: findGenderByNameStrict(
                        value as GenderCategoryNames,
                      ) as Gender,
                    },
                  })
                }
                isOn={
                  (findGenderByNameStrict(
                    gender as GenderCategoryNames,
                  ) as Gender) === newPostInfo.body.gender
                }
              />
            ))}
          </div>
        </InputLayout>
        {/* 연령제한 입력 */}
        <InputLayout title="연령제한" isEssential>
          <Input
            inputType={InputType.TEXT}
            placeholder="연령제한을 입력해주세요"
            value={ageRestrict}
            onChange={(value) => setAgeRestrict(value)}
            canDelete={false}
          />
          <div className="w-full relative flex items-center justify-start py-2 gap-3 text-left body-3 text-[#656565]">
            <div className="w-6 h-6 relative">
              <div
                className={`w-full h-full border border-[#f4f4f9] flex items-center justify-center ${ageRestrict === '' ? 'bg-[#1E1926]' : 'bg-white'}`}
                onClick={
                  ageRestrict === ''
                    ? () => {
                        setAgeRestrict('살 이상');
                      }
                    : () => {
                        setAgeRestrict('');
                      }
                }
              >
                <CheckIcon />
              </div>
            </div>
            <div className="flex items-start justify-start">무관</div>
          </div>
        </InputLayout>
        {/* 학력 입력 */}
        <InputLayout title="학력" isEssential>
          <Dropdown
            value={
              newPostInfo.body.education_level === ''
                ? newPostInfo.body.education_level
                : EducationLevelInfo[
                    newPostInfo.body.education_level as EducationLevel
                  ].name
            }
            placeholder="학력을 선택해주세요"
            options={EducationList}
            setValue={(value) => {
              setNewPostInfo({
                ...newPostInfo,
                body: {
                  ...newPostInfo.body,
                  education_level: findEducationLevelByNameStrict(
                    value as EducationCategoryNames,
                  ) as string,
                },
              });
            }}
          />
        </InputLayout>
        {/* 비자 입력 */}
        <InputLayout title="비자" isEssential>
          <Dropdown
            value={
              newPostInfo.body.visa === ''
                ? newPostInfo.body.visa
                : VisaInfo[newPostInfo.body.visa as VisaGroup].name
            }
            placeholder="비자를 선택해 주세요"
            options={VisaList}
            setValue={(value) => {
              setNewPostInfo({
                ...newPostInfo,
                body: {
                  ...newPostInfo.body,
                  visa: findVisaByNameStrict(
                    value as VisaCategoryNames,
                  ) as string,
                },
              });
            }}
          />
        </InputLayout>
      </div>
      <BottomButtonPanel>
        {/* 정보 입력 시마다 유효성을 검사해 모든 값이 유효하면 버튼이 활성화 */}
        <div className="w-full flex gap-2">
          <Button
            type={buttonTypeKeys.BACK}
            bgColor="bg-[#F4F4F9]"
            fontColor="text-[#BDBDBD]"
            isBorder={false}
            title="이전"
            onClick={() => onPrev()}
          />
          <Button
            type="large"
            bgColor={isInvalid ? 'bg-[#F4F4F9]' : 'bg-[#fef387]'}
            fontColor={isInvalid ? 'text-[#BDBDBD]' : 'text-[#222]'}
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
                        recruitment_number:
                          extractNumbersAsNumber(recruitmentNum),
                        age_restriction: extractNumbersAsNumber(ageRestrict),
                      },
                    })
            }
          />
        </div>
      </BottomButtonPanel>
    </div>
  );
};

export default Step3;