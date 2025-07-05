// WorkDayTimeInput.tsx
import {
  Controller,
  FieldValues,
  FieldPath,
  useFormContext,
} from 'react-hook-form';
import { useState } from 'react';
import WorkDayTimeBottomSheet from '@/components/Common/WorkDayTimeBottomSheet';
import { WorkDayTime } from '@/types/api/document';
import { workDayTimeToString } from '@/utils/post';
import AddIcon from '@/assets/icons/PlusIcon.svg?react';
import AddTrigger from '@/components/Common/AddTrigger';
import Chip from '@/components/Common/Chip';

interface WorkDayTimeInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  placeholder?: string;
  description?: string;
}

const WorkDayTimeInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  description,
}: WorkDayTimeInputProps<TFieldValues, TName>) => {
  const [isModal, setIsModal] = useState(false);
  const { control } = useFormContext<TFieldValues>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <>
          <div className="w-full flex flex-col gap-3">
            {description && (
              <p className="caption-12-regular text-text-alternative px-1 pb-2">
                {description}
              </p>
            )}

            {/* 근무 시간 추가 버튼 */}
            <div className="relative">
              <AddTrigger
                icon={AddIcon}
                type={AddTrigger.Type.OUTLINED}
                color={AddTrigger.ColorType.GRAY}
                title="추가하기"
                handleClick={() => setIsModal(true)}
              />
            </div>

            {/* 선택된 근무 시간 표시 */}
            <div className="w-full">
              <div className="w-full h-full overflow-x-auto no-scrollbar flex items-center gap-2">
                {(value as WorkDayTime[])?.map((workdaytime, index) => (
                  <div key={index} className="flex-shrink-0">
                    <Chip
                      text={workDayTimeToString(workdaytime)}
                      onClick={() => {
                        onChange(
                          (value as WorkDayTime[]).filter(
                            (_, i) => i !== index,
                          ),
                        );
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* 근무 시간 선택 모달 */}
            {isModal && (
              <WorkDayTimeBottomSheet
                isShowBottomsheet={isModal}
                setIsShowBottomSheet={setIsModal}
                onClose={(selected: WorkDayTime[]) => {
                  onChange(selected);
                  setIsModal(false);
                }}
              />
            )}
          </div>
        </>
      )}
    />
  );
};

export default WorkDayTimeInput;
