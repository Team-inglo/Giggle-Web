import Dropdown from '@/components/Common/Dropdown';
import Input from '@/components/Common/Input';
import RadioButton from '@/components/Information/RadioButton';
import InputLayout from '@/components/WorkExperience/InputLayout';
import { InputType } from '@/types/common/input';
import {
  EmploymentType,
  JobCategory,
  JobPostingForm,
} from '@/types/postCreate/postCreate';
import { useEffect, useState } from 'react';
import AddTimeIcon from '@/assets/icons/FileAddIcon.svg?react';
import { JobCategoryInfo, JobCategoryList } from '@/constants/post';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';
import {
  findJobCategoryByNameStrict,
  getWorkPeriodKeyByName,
  JobCategoryNames,
  workDayTimeToString,
} from '@/utils/post';
import WorkDayTimeBottomSheet from '@/components/Common/WorkDayTimeBottomSheet';
import { WorkDayTime, WorkPeriod } from '@/types/api/document';
import {
  handleHourlyRateBlur,
  MINIMUM_HOURLY_RATE,
  parseStringToSafeNumber,
} from '@/utils/document';
import { WorkPeriodInfo, WorkPeriodNames } from '@/constants/documents';

const Step1 = ({
  postInfo,
  onNext,
}: {
  postInfo: JobPostingForm;
  onNext: (postInfo: JobPostingForm) => void;
}) => {
  // 현재 step내에서 입력받는 정보를 따로 관리할 state, 추후 다음 step으로 넘어갈 때 funnel 관리 페이지의 state로 통합된다.
  const [newPostInfo, setNewPostInfo] = useState<JobPostingForm>(postInfo);
  // 버튼 활성화 여부를 위한 플래그
  const [isInvalid, setIsInvalid] = useState(true);
  // 근무 시간 모달 활성화 여부 위한 플래그
  const [isModal, setIsModal] = useState(false);

  /* 정보 입력 시마다 유효성을 검사해 모든 값이 유효하면 버튼이 활성화 */
  useEffect(() => {
    const { title, job_category, work_day_times, hourly_rate, work_period } =
      newPostInfo.body;

    const isFormValid =
      title !== '' &&
      job_category !== '' &&
      work_day_times.length &&
      work_period !== '' &&
      hourly_rate >= MINIMUM_HOURLY_RATE;
    setIsInvalid(!isFormValid);
  }, [newPostInfo]);

  return (
    <div className="w-full py-6 flex flex-col">
      <div className="[&>*:last-child]:mb-40 flex flex-col gap-4">
        {/* 공고 제목 입력 */}
        <InputLayout title="공고 제목" isEssential>
          <Input
            inputType={InputType.TEXT}
            placeholder="제목을 입력해주세요"
            value={newPostInfo.body.title}
            onChange={(value) =>
              setNewPostInfo({
                ...newPostInfo,
                body: { ...newPostInfo.body, title: value },
              })
            }
            canDelete={false}
          />
        </InputLayout>
        {/* 업직종 입력 */}
        <InputLayout title="업직종" isEssential>
          <Dropdown
            value={
              newPostInfo.body.job_category === ''
                ? newPostInfo.body.job_category
                : JobCategoryInfo[newPostInfo.body.job_category as JobCategory]
                    .name
            }
            placeholder="업직종을 선택해주세요"
            options={JobCategoryList}
            setValue={(value) =>
              setNewPostInfo({
                ...newPostInfo,
                body: {
                  ...newPostInfo.body,
                  job_category: String(
                    findJobCategoryByNameStrict(value as JobCategoryNames),
                  ),
                },
              })
            }
          />
        </InputLayout>
        {/* 근무 시간 선택 */}
        <InputLayout title="근무 시간" isEssential>
          <div className="w-full relative body-3 px-1 pb-1.5 text-[#222] text-left">
            원하는 근무 시간을 추가해주세요.
          </div>
          <div className="w-full h-8">
            <div className="w-full h-full overflow-x-auto flex items-center gap-2">
              {newPostInfo.body.work_day_times.length > 0 &&
                newPostInfo.body.work_day_times.map((workdaytime, index) => (
                  <div key={index} className="flex-shrink-0">
                    <div className="w-full h-6 flex items-center justify-center px-3 py-1 bg-[#FEF387] button-2 rounded-[1.125rem] whitespace-nowrap">
                      {workDayTimeToString(workdaytime)}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div
            className="w-full flex gap-2 items-center justify-center text-left body-2 border rounded-xl shadow-sm border-[#eae9f6] [--input-color:#bdbdbd] bg-white py-[10px] pl-4 pr-[14px]"
            onClick={() => setIsModal(true)}
          >
            <AddTimeIcon />
          </div>
        </InputLayout>
        {/* 시급 입력 */}
        <InputLayout title="시급" isEssential>
          <Input
            inputType={InputType.TEXT}
            placeholder="시급을 입력해주세요"
            value={String(newPostInfo.body.hourly_rate)}
            onChange={(value) =>
              setNewPostInfo({
                ...newPostInfo,
                body: {
                  ...newPostInfo.body,
                  hourly_rate: parseStringToSafeNumber(value),
                },
              })
            }
            onBlur={() =>
              handleHourlyRateBlur(String(newPostInfo.body.hourly_rate))
            }
            canDelete={false}
            isUnit
            unit="원"
          />
          <div className="w-full relative body-3 px-1 py-1.5 text-[#222] text-left">
            2025년 기준 최저시급은 10,030원입니다.
          </div>
        </InputLayout>
        {/* 타입 선택 */}
        <InputLayout title="타입" isEssential>
          <div className="w-full relative flex items-start justify-center px-1 py-1.5 gap-3 text-left text-[#656565]">
            <RadioButton
              value="아르바이트"
              setValue={() =>
                setNewPostInfo({
                  ...newPostInfo,
                  body: {
                    ...newPostInfo.body,
                    employment_type: EmploymentType.PARTTIME,
                  },
                })
              }
              isOn={
                newPostInfo.body.employment_type === EmploymentType.PARTTIME
              }
            />
            <RadioButton
              value="인턴십"
              setValue={() =>
                setNewPostInfo({
                  ...newPostInfo,
                  body: {
                    ...newPostInfo.body,
                    employment_type: EmploymentType.INTERNSHIP,
                  },
                })
              }
              isOn={
                newPostInfo.body.employment_type !== EmploymentType.PARTTIME
              }
            />
          </div>
        </InputLayout>
        {/* 근무 기간 입력 */}
        <InputLayout title="근무기간" isEssential>
          <Dropdown
            value={
              newPostInfo.body.work_period === ''
                ? ''
                : WorkPeriodInfo[newPostInfo.body.work_period as WorkPeriod]
                    .name
            }
            placeholder="근무 기간을 선택해주세요"
            options={WorkPeriodNames}
            setValue={(value) => {
              setNewPostInfo({
                ...newPostInfo,
                body: {
                  ...newPostInfo.body,
                  work_period: getWorkPeriodKeyByName(value as string) ?? '',
                },
              });
            }}
          />
        </InputLayout>
      </div>
      <BottomButtonPanel>
        {/* 정보 입력 시마다 유효성을 검사해 모든 값이 유효하면 버튼이 활성화 */}
        <Button
          type="large"
          bgColor={isInvalid ? 'bg-surface-secondary' : 'bg-surface-primary'}
          fontColor={isInvalid ? 'text-text-disabled' : 'text-text-normal'}
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
                    },
                  })
          }
        />
      </BottomButtonPanel>
      {isModal && (
        <WorkDayTimeBottomSheet
          onClose={(value: WorkDayTime[]) => {
            setNewPostInfo({
              ...newPostInfo,
              body: { ...newPostInfo.body, work_day_times: value },
            });
            setIsModal(false);
          }}
          isShowBottomsheet={isModal}
          setIsShowBottomSheet={setIsModal}
        />
      )}
    </div>
  );
};

export default Step1;
