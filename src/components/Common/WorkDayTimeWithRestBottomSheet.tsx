import Button from '@/components/Common/Button';
import { useState } from 'react';
import TimePicker from '@/components/Common/TimePicker';
import { DayOfWeek, WorkDayTimeWithRest } from '@/types/api/document';
import { DAYS } from '@/constants/documents';
import { BottomSheet } from '@/components/Common/BottomSheet';

// TODO: 나중에 constant로 분리해주세요!

type DayType = (typeof DAYS)[keyof typeof DAYS];

const WorkDayTimeWithRestBottomSheet = ({
  onClose,
  isShowBottomsheet,
  setIsShowBottomSheet,
}: {
  onClose: (value: WorkDayTimeWithRest[]) => void;
  isShowBottomsheet: boolean;
  setIsShowBottomSheet: (isShowBottomsheet: boolean) => void;
}) => {
  const [dayOfWeek, setDayOfWeek] = useState<DayType[]>([]);
  const [workStartTime, setWorkStartTime] = useState<string | null>(null);
  const [workEndTime, setWorkEndTime] = useState<string | null>(null);
  const [breakStartTime, setBreakStartTime] = useState<string | null>(null);
  const [breakEndTime, setBreakEndTime] = useState<string | null>(null);

  const onClickDayOfWeek = (day: DayType) => {
    if (dayOfWeek.includes(day)) {
      setDayOfWeek([...dayOfWeek.filter((value) => value !== day)]);
    } else {
      setDayOfWeek([...dayOfWeek, day]);
    }
  };

  const isAvailableSubmit = () => {
    if (
      dayOfWeek.length &&
      workStartTime &&
      workEndTime &&
      breakStartTime &&
      breakEndTime
    )
      return true;
    return false;
  };

  const returnResult = () => {
    if (!isAvailableSubmit()) return;
    const result: WorkDayTimeWithRest[] = dayOfWeek.map((day) => {
      return {
        day_of_week: DAYS[day as keyof typeof DAYS] as DayOfWeek,
        work_start_time: workStartTime!,
        work_end_time: workEndTime!,
        break_start_time: breakStartTime!,
        break_end_time: breakEndTime!,
      };
    });
    onClose(result);
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
            <h5 className="py-[0.375rem] text-text-strong caption-12-regular">
              근무일자
            </h5>
            <div className="flex flex-wrap gap-[0.5rem] w-full">
              {Object.keys(DAYS).map((value, index) => (
                <button
                  className={`py-[0.375rem] px-[0.875rem] caption-12-regular border border-border-alternative rounded-[1.125rem] ${dayOfWeek.includes(value as DayType) ? 'bg-[#FEF387]' : 'bg-white'}`}
                  key={`${value}_${index}`}
                  onClick={() => onClickDayOfWeek(value as DayType)}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h5 className="py-[0.375rem] text-text-strong caption-12-regular">
              근무시간
            </h5>
            <div className="flex gap-[0.25rem] w-full ">
              <TimePicker
                isDisabled={!dayOfWeek.length}
                onChangeTime={setWorkStartTime}
              />
              <TimePicker
                isDisabled={!dayOfWeek.length}
                onChangeTime={setWorkEndTime}
              />
            </div>
          </div>
          <div>
            <h5 className="py-[0.375rem] text-text-strong caption-12-regular">
              휴게시간
            </h5>
            <div className="flex gap-[0.25rem] w-full ">
              <TimePicker
                isDisabled={!dayOfWeek.length}
                onChangeTime={setBreakStartTime}
              />
              <TimePicker
                isDisabled={!dayOfWeek.length}
                onChangeTime={setBreakEndTime}
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
          onClick={returnResult}
        />
      </BottomSheet.ButtonGroup>
    </BottomSheet>
  );
};

export default WorkDayTimeWithRestBottomSheet;
