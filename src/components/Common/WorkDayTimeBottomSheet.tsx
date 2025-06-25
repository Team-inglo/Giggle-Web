import BottomSheetLayout from '@/components/Common/BottomSheetLayout';
import Button from '@/components/Common/Button';
import { buttonTypeKeys } from '@/constants/components';
import { useState } from 'react';
import TimePicker from '@/components/Common/TimePicker';
import { DayOfWeek, WorkDayTime } from '@/types/api/document';

// TODO: 나중에 constant로 분리해주세요!
const DAYS = {
  ['월요일']: 'MONDAY',
  ['화요일']: 'TUESDAY',
  ['수요일']: 'WEDNESDAY',
  ['목요일']: 'THURSDAY',
  ['금요일']: 'FRIDAY',
  ['토요일']: 'SATURDAY',
  ['일요일']: 'SUNDAY',
} as const;

type DayType = (typeof DAYS)[keyof typeof DAYS];

// api에게 보낼 데이터 형식

const WorkDayTimeBottomSheet = ({
  onClose,
  isShowBottomsheet,
  setIsShowBottomSheet,
}: {
  onClose: (value: WorkDayTime[]) => void;
  isShowBottomsheet: boolean;
  setIsShowBottomSheet: (isShowBottomsheet: boolean) => void;
}) => {
  const [isCheckAllWeek, setIsCheckAllWeek] = useState<boolean>(false);
  const [isCheckAllTime, setIsCheckAllTime] = useState<boolean>(false);

  const [dayOfWeek, setDayOfWeek] = useState<DayType[]>([]);
  const [workStartTime, setWorkStartTime] = useState<string | null>(null);
  const [workEndTime, setWorkEndTime] = useState<string | null>(null);

  const onClickDayOfWeek = (day: DayType) => {
    if (dayOfWeek.includes(day)) {
      setDayOfWeek([...dayOfWeek.filter((value) => value !== day)]);
    } else {
      setDayOfWeek([...dayOfWeek, day]);
      setIsCheckAllWeek(false);
    }
  };

  const onClickCheckAllWeek = () => {
    if (!isCheckAllWeek) setDayOfWeek([]);
    setIsCheckAllWeek(!isCheckAllWeek);
  };

  const isAvailableSubmit = () => {
    if (
      (dayOfWeek.length || isCheckAllWeek) &&
      ((workStartTime && workEndTime) || isCheckAllTime)
    )
      return true;
    return false;
  };

  const returnResult = () => {
    if (!isAvailableSubmit()) return;

    if (isCheckAllWeek) {
      const result: WorkDayTime[] = [
        {
          day_of_week: DayOfWeek.NEGOTIABLE,
          work_start_time: isCheckAllTime ? null : workStartTime,
          work_end_time: isCheckAllTime ? null : workEndTime,
        },
      ];
      onClose(result);
    } else {
      const result: WorkDayTime[] = dayOfWeek.map((day) => {
        return {
          day_of_week: DAYS[day as keyof typeof DAYS] as DayOfWeek,
          work_start_time: isCheckAllTime ? null : workStartTime,
          work_end_time: isCheckAllTime ? null : workEndTime,
        };
      });
      onClose(result);
    }
  };

  return (
    <BottomSheetLayout
      isAvailableHidden={true}
      isShowBottomsheet={isShowBottomsheet}
      setIsShowBottomSheet={setIsShowBottomSheet}
    >
      <div className="w-full">
        <div className="w-full py-[0.75rem] px-[3.125rem] flex flex-col items-center gap-[0.75rem]">
          <h3 className="heading-20-semibold text-[#1E1926]">
            근로일 및 근로일별 근로시간
          </h3>
          <p className="caption-12-regular text-[#656565]">
            원하는 근무 시간을 추가해주세요.
          </p>
        </div>
        <div className="w-full mb-[1rem] px-[1.5rem] flex flex-col gap-[0.5rem]">
          <div>
            <div className="w-full flex justify-between items-center">
              <h5 className="px-[0.25rem] py-[0.375rem] text-[#1E1926] caption-12-regular">
                근무일자 <span className="text-[#EE4700]">*</span>
              </h5>
              <div className="flex gap-[0.5rem] items-center py-[0.25rem]">
                <button
                  className={`w-[1rem] h-[1rem] border  border-[#F4F4F9] ${isCheckAllWeek && 'bg-[#FEF387]'}`}
                  onClick={onClickCheckAllWeek}
                ></button>
                <p className="caption-12-regular text-[#656565]">요일무관</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-[0.5rem] w-full">
              {Object.keys(DAYS).map((value, index) => (
                <button
                  className={`py-[0.375rem] px-[0.875rem] caption-12-regular border border-border-alternative rounded-[1.125rem] ${isCheckAllWeek ? 'bg-[#F4F4F9] text-[#BDBDBD]' : dayOfWeek.includes(value as DayType) ? 'bg-[#FEF387] text-[#1E1926]' : 'bg-white text-[#656565]'}`}
                  key={`${value}_${index}`}
                  onClick={() => onClickDayOfWeek(value as DayType)}
                  disabled={isCheckAllWeek}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="w-full flex justify-between items-center">
              <h5 className="px-[0.25rem] py-[0.375rem] text-[#1E1926] caption-12-regular">
                근무시간 <span className="text-[#EE4700]">*</span>
              </h5>
              <div className="flex gap-[0.5rem] items-center py-[0.25rem]">
                <button
                  className={`w-[1rem] h-[1rem] border  border-[#F4F4F9] ${isCheckAllTime && 'bg-[#FEF387]'}`}
                  onClick={() => setIsCheckAllTime(!isCheckAllTime)}
                ></button>
                <p className="caption-12-regular text-[#656565]">시간무관</p>
              </div>
            </div>
            <div className="flex gap-[0.25rem] w-full ">
              <TimePicker
                isDisabled={!dayOfWeek.length && isCheckAllTime}
                onChangeTime={setWorkStartTime}
              />
              <TimePicker
                isDisabled={!dayOfWeek.length && isCheckAllTime}
                onChangeTime={setWorkEndTime}
              />
            </div>
          </div>
        </div>
        <Button
          type={buttonTypeKeys.LARGE}
          bgColor={isAvailableSubmit() ? `bg-[#FEF387]` : `bg-[#F4F4F9]`}
          fontColor={isAvailableSubmit() ? `text-[#1E1926]` : `text-[#BDBDBD]`}
          title={'추가하기'}
          onClick={() => returnResult()}
        />
      </div>
    </BottomSheetLayout>
  );
};

export default WorkDayTimeBottomSheet;
