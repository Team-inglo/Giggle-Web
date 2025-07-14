import Button from '@/components/Common/Button';
import { useState } from 'react';
import TimePicker from '@/components/Common/TimePicker';
import { DayOfWeek, WorkDayTime } from '@/types/api/document';
import Chip from '@/components/Common/Chip';
import { ChipState } from '@/types/common/chip';
import Icon from '@/components/Common/Icon';
import CheckIcon from '@/assets/icons/BottomSheetCheckIcon.svg?react';
import { BottomSheet } from '@/components/Common/BottomSheet';

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
    <BottomSheet
      isAvailableHidden={true}
      isShowBottomsheet={isShowBottomsheet}
      setIsShowBottomSheet={setIsShowBottomSheet}
    >
      <BottomSheet.Header title="근로일 및 근로일별 근로시간" />
      <BottomSheet.Content>
        <div className="w-full mb-[1rem] flex flex-col gap-[0.5rem]">
          <div>
            <div className="w-full flex justify-between items-center">
              <h5 className="px-[0.25rem] py-[0.375rem] text-text-strong body-14-medium">
                근무일자
              </h5>
              <div
                className="flex gap-[0.5rem] items-center py-[0.25rem]"
                onClick={onClickCheckAllWeek}
              >
                <button
                  className={`flex items-center justify-center w-5 h-5 rounded-full ${isCheckAllWeek ? 'bg-surface-invert' : 'bg-surface-disabled'}`}
                >
                  <div className="w-3.5 h-3.5 flex items-center justify-center">
                    <Icon icon={CheckIcon} fillColor="text-surface-base" />
                  </div>
                </button>
                <p className="body-14-regular text-text-assistive">요일무관</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-[0.5rem] w-full">
              {Object.keys(DAYS).map((value, index) => (
                <Chip
                  text={value}
                  key={`${value}_${index}`}
                  onClick={() => onClickDayOfWeek(value as DayType)}
                  state={
                    dayOfWeek.includes(value as DayType)
                      ? ChipState.ACTIVE
                      : ChipState.DEFAULT
                  }
                />
              ))}
            </div>
          </div>
          <div>
            <div className="w-full flex justify-between items-center">
              <h5 className="px-[0.25rem] py-[0.375rem] text-text-strong body-14-medium">
                근무시간
              </h5>
              <div
                className="flex gap-[0.5rem] items-center py-[0.25rem] cursor-pointer"
                onClick={() => setIsCheckAllTime(!isCheckAllTime)}
              >
                <button
                  className={`flex items-center justify-center w-5 h-5 rounded-full ${isCheckAllTime ? 'bg-surface-invert' : 'bg-surface-disabled'}`}
                >
                  <div className="w-3.5 h-3.5 flex items-center justify-center">
                    <Icon icon={CheckIcon} fillColor="text-surface-base" />
                  </div>
                </button>
                <p className="body-14-regular text-text-assistive">시간무관</p>
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
      </BottomSheet.Content>
      <BottomSheet.ButtonGroup>
        <Button
          type={
            isAvailableSubmit() ? Button.Type.PRIMARY : Button.Type.DISABLED
          }
          size={Button.Size.LG}
          isFullWidth
          title={'추가하기'}
          onClick={() => returnResult()}
        />
      </BottomSheet.ButtonGroup>
    </BottomSheet>
  );
};

export default WorkDayTimeBottomSheet;
